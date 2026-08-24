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
        const result = await sendLeadEmail(parsed.data);
        if (result === "failed") {
          return Response.json(
            { error: "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp." },
            { status: 502 },
          );
        }

        return Response.json({ ok: true });
      },
    },
  },
});
