import { useState } from "react";
import { submitLead } from "@/lib/leads";

interface Props {
  interesse: string;
  perfilInicial?: "PF" | "PJ";
  origem?: string;
}

const WA = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.5-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5 0-.2 0-.4-.1-.5-.1-.1-.6-1.5-.9-2.1-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.2-.3-.3-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
  </svg>
);

export function LeadForm({ interesse, perfilInicial = "PF", origem }: Props) {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [perfil] = useState<"PF" | "PJ">(perfilInicial);
  const [mensagem, setMensagem] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrMsg("");
    if (!consent) {
      setErrMsg("É necessário concordar com a política de privacidade.");
      return;
    }
    if (nome.trim().length < 2 || whatsapp.trim().length < 8 || !email.includes("@")) {
      setErrMsg("Confira nome, WhatsApp e e-mail.");
      return;
    }
    setState("sending");
    try {
      await submitLead({ nome, whatsapp, email, perfil, interesse, mensagem, consentimento: consent, origem });
      setState("ok");
    } catch (err) {
      setState("err");
      setErrMsg(err instanceof Error ? err.message : "Erro ao enviar.");
    }
  }

  if (state === "ok") {
    return (
      <div className="p10-form" style={{ textAlign: "center" }}>
        <p style={{ color: "#fff", fontFamily: "var(--fb)", fontSize: "1rem", margin: 0 }}>
          Recebemos seu interesse. Um consultor Plan10 vai retornar com o próximo passo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="p10-form" noValidate>
      <label>
        <span className="eyebrow">Nome</span>
        <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome completo" required />
      </label>
      <div className="row">
        <label>
          <span className="eyebrow">WhatsApp</span>
          <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} inputMode="tel" placeholder="(11) 90000-0000" required />
        </label>
        <label>
          <span className="eyebrow">E-mail</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" required />
        </label>
      </div>
      <label>
        <span className="eyebrow">Mensagem (opcional)</span>
        <textarea value={mensagem} onChange={(e) => setMensagem(e.target.value)} rows={3} placeholder="Conte um pouco sobre o seu momento" />
      </label>
      <label className="check">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>Concordo com o tratamento dos meus dados conforme a Política de Privacidade da Plan10.</span>
      </label>
      {errMsg && (
        <p style={{ fontFamily: "var(--fb)", fontSize: ".88rem", color: "#E07840", margin: 0 }}>{errMsg}</p>
      )}
      <div className="actions">
        <button type="submit" disabled={state === "sending"} className="btn btn-primary" style={{ opacity: state === "sending" ? 0.7 : 1 }}>
          {state === "sending" ? "Enviando..." : "Solicitar consultoria"}
        </button>
        <a
          href={`https://wa.me/5511938012222?text=${encodeURIComponent(`Olá! Tenho interesse em ${interesse}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-wa"
        >
          {WA} WhatsApp
        </a>
      </div>
    </form>
  );
}
