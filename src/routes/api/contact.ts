import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

// Aceita tanto o formulário de contato (home/fale-conosco) quanto os
// formulários de lead das páginas de solução e núcleo. E-mail e mensagem são
// opcionais; nome, telefone/WhatsApp, assunto e consentimento são obrigatórios.
const schema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(8).max(30),
  email: z.union([z.string().trim().email().max(255), z.literal("")]).optional(),
  subject: z.string().trim().min(1).max(120),
  message: z.string().trim().max(3000).optional().default(""),
  consent: z.literal(true),
  source: z.string().max(120).optional(),
  perfil: z.string().max(10).optional(),
  contexto: z.string().max(300).optional(),
});
type LeadData = z.infer<typeof schema>;

// Rate limit simples por IP (5 req/hora). Memória por instância.
const ipHits = new Map<string, { count: number; reset: number }>();
const HOUR = 60 * 60 * 1000;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now > entry.reset) {
    ipHits.set(ip, { count: 1, reset: now + HOUR });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

function envVar(name: string): string | undefined {
  const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  return proc?.env?.[name];
}

/**
 * Envia o lead por e-mail (Resend). Retorna:
 *  "sent"         e-mail enviado
 *  "unconfigured" sem RESEND_API_KEY (lead só registrado; forms seguem funcionando)
 *  "failed"       chave presente mas o envio falhou
 */
async function sendLeadEmail(data: LeadData): Promise<"sent" | "unconfigured" | "failed"> {
  const key = envVar("RESEND_API_KEY");
  const to = envVar("LEAD_TO_EMAIL") || "contato@plan10.com.br";
  const from = envVar("LEAD_FROM_EMAIL") || "Plan10 Site <onboarding@resend.dev>";

  if (!key) {
    console.log(`[lead] RESEND_API_KEY ausente. Lead registrado: ${data.subject} | ${data.email || data.phone}`);
    return "unconfigured";
  }

  const lines = [
    `Nome: ${data.name}`,
    `WhatsApp / telefone: ${data.phone}`,
    data.email ? `E-mail: ${data.email}` : null,
    `Assunto: ${data.subject}`,
    data.perfil ? `Perfil: ${data.perfil}` : null,
    data.contexto ? `Contexto: ${data.contexto}` : null,
    data.source ? `Origem: ${data.source}` : null,
    data.message ? `\nMensagem:\n${data.message}` : null,
  ].filter(Boolean);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: data.email || undefined,
        subject: `Novo lead Plan10: ${data.subject}`,
        text: lines.join("\n"),
      }),
    });
    if (!res.ok) {
      console.error(`[lead] Resend falhou (${res.status}): ${await res.text().catch(() => "")}`);
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error("[lead] Erro ao chamar Resend:", err);
    return "failed";
  }
}

/**
 * Envia o lead para o CRM MegaZap.
 *
 * A API é `POST /v2/contacts` (cria ou atualiza), autenticada pelo header
 * `client-token`. Duas coisas obrigam a chamada a sair daqui, do servidor, e
 * não do navegador: o preflight de CORS da MegaZap não libera o header
 * `client-token`, e o token dá acesso à conta inteira, então ele não pode
 * viver no JavaScript do site.
 *
 * O contato só tem nome e telefone como campos nativos. E-mail, origem,
 * interesse e mensagem entram como campos customizados, e o `name` de cada um
 * precisa bater exatamente com o "Nome de Integração" cadastrado no painel da
 * Plan10, em Configurações > Campos Customizados. Os nomes esperados estão em
 * CAMPOS abaixo.
 *
 * Sem MEGAZAP_TOKEN e MEGAZAP_CHANNEL_ID a função não faz nada e o formulário
 * segue funcionando normalmente, igual ao caminho do e-mail.
 */
const CAMPOS = { email: "email", origem: "origem", interesse: "interesse", mensagem: "mensagem" };

/** A MegaZap espera o telefone como 55 + DDD + número, só dígitos. */
function telefoneMegazap(bruto: string): string | null {
  const digitos = bruto.replace(/\D/g, "");
  if (digitos.length < 10) return null;
  return digitos.startsWith("55") ? digitos : `55${digitos}`;
}

async function enviarParaMegazap(data: LeadData): Promise<"sent" | "unconfigured" | "failed"> {
  const token = envVar("MEGAZAP_TOKEN");
  const canal = envVar("MEGAZAP_CHANNEL_ID");
  if (!token || !canal) return "unconfigured";

  const telefone = telefoneMegazap(data.phone);
  if (!telefone) {
    console.error("[lead] telefone fora do formato esperado pela MegaZap:", data.phone);
    return "failed";
  }

  const campos = [
    { name: CAMPOS.email, value: data.email || "" },
    { name: CAMPOS.origem, value: data.source || "Site Plan10" },
    { name: CAMPOS.interesse, value: data.contexto || data.subject },
    { name: CAMPOS.mensagem, value: data.message || "" },
  ].filter((c) => c.value);

  try {
    const res = await fetch("https://api.mzworkspace.com/v2/contacts", {
      method: "POST",
      headers: { "client-token": token, "Content-Type": "application/json" },
      body: JSON.stringify({
        channel: { id: canal, type: envVar("MEGAZAP_CHANNEL_TYPE") || "WHATSAPP" },
        contact: { id: telefone, name: data.name, lead: true, fields: campos },
      }),
    });
    if (!res.ok) {
      console.error(`[lead] MegaZap recusou (${res.status}): ${await res.text().catch(() => "")}`);
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error("[lead] Erro ao chamar a MegaZap:", err);
    return "failed";
  }
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip =
          request.headers.get("cf-connecting-ip") ||
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          "unknown";

        if (!rateLimit(ip)) {
          return Response.json(
            { error: "Muitas solicitações. Tente novamente em 1 hora." },
            { status: 429 },
          );
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Payload inválido" }, { status: 400 });
        }

        const parsed = schema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Dados inválidos" }, { status: 400 });
        }

        // Por LGPD, não persistimos os dados além do necessário para o envio.
        // Os dois destinos são independentes: se um falhar, o outro segue.
        const [crm, email] = await Promise.all([
          enviarParaMegazap(parsed.data),
          sendLeadEmail(parsed.data),
        ]);

        // A resposta nunca trava o visitante: o formulário dele continua no
        // WhatsApp de qualquer jeito, então erro de destino é problema nosso,
        // registrado no log, não dele.
        if (crm === "failed" && email !== "sent") {
          console.error("[lead] nenhum destino aceitou o lead:", parsed.data.phone);
        }

        return Response.json({ ok: true, crm, email });
      },
    },
  },
});
