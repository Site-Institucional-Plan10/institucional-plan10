export interface LeadPayload {
  nome: string;
  whatsapp: string;
  email: string;
  perfil: "PF" | "PJ";
  interesse: string;
  mensagem?: string;
  consentimento: boolean;
  origem?: string;
}

export async function submitLead(data: LeadPayload): Promise<{ ok: true }> {
  // TODO: integrar com Resend (endpoint /api/leads).
  // Ex.: await fetch("/api/leads", { method: "POST", body: JSON.stringify(data) });
  if (typeof console !== "undefined") console.info("[Plan10 lead]", data);
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true };
}
