import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(8).max(20),
  subject: z.string().trim().min(1).max(50),
  message: z.string().trim().min(10).max(2000),
  consent: z.literal(true),
  source: z.string().max(50).optional(),
});

// Simple in-memory IP rate limit (5 req/hour per IP).
// Note: per-instance memory only, for stricter limits, use a KV/database.
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

        const data = parsed.data;

        // TODO: enviar via Lovable Emails (queue transacional) assim que o
        // domínio estiver configurado. Habilite Lovable Cloud → Emails e
        // crie templates 'contact-form-confirmation' (para o remetente) e
        // 'contact-form-internal' (para contato@plan10.com.br). Em seguida,
        // substitua o bloco abaixo por chamadas a sendTransactionalEmail.
        // Por LGPD, não persistimos os dados além do necessário para envio.
        console.log(`[contact] ${data.source || "site"}, ${data.subject}, ${data.email}`);

        return Response.json({ ok: true });
      },
    },
  },
});
