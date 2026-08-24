export interface LeadPayload {
  nome: string;
  whatsapp: string;
  email?: string;
  perfil: "PF" | "PJ";
  interesse: string;
  contexto?: string;
  mensagem?: string;
  consentimento: boolean;
  origem?: string;
}

export async function submitLead(data: LeadPayload): Promise<{ ok: true }> {
  // Entrega pelo mesmo endpoint do formulário de contato (envio por e-mail).
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.nome,
      phone: data.whatsapp,
      email: data.email || "",
      subject: data.interesse,
      message: data.mensagem || "",
      consent: data.consentimento,
      source: data.origem || "solucao",
      perfil: data.perfil,
      contexto: data.contexto,
    }),
  });
  if (!res.ok) {
    let msg = "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.";
    try {
      const body = (await res.json()) as { error?: string };
      if (body?.error) msg = body.error;
    } catch {
      /* mantém a mensagem padrão */
    }
    throw new Error(msg);
  }
  return { ok: true };
}
