import { useState } from "react";
import { submitLead } from "@/lib/leads";
import { FONTS } from "@/lib/plan10";

interface Props {
  interesse: string;
  perfilInicial?: "PF" | "PJ";
  accent: string;
  primary: string;
  origem?: string;
}

export function LeadForm({ interesse, perfilInicial = "PF", accent, primary, origem }: Props) {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [perfil, setPerfil] = useState<"PF" | "PJ">(perfilInicial);
  const [mensagem, setMensagem] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 8,
    background: "rgba(246,241,231,0.05)",
    border: "1px solid rgba(246,241,231,0.15)",
    color: "#F6F1E7",
    fontFamily: FONTS.body,
    fontSize: "0.95rem",
    outline: "none",
  };

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
      await submitLead({
        nome,
        whatsapp,
        email,
        perfil,
        interesse,
        mensagem,
        consentimento: consent,
        origem,
      });
      setState("ok");
    } catch (err) {
      setState("err");
      setErrMsg(err instanceof Error ? err.message : "Erro ao enviar.");
    }
  }

  if (state === "ok") {
    return (
      <div
        style={{
          padding: 32,
          borderRadius: 8,
          border: `1px solid ${accent}`,
          fontFamily: FONTS.body,
          color: "#F6F1E7",
          background: "rgba(246,241,231,0.03)",
        }}
      >
        Recebemos seu interesse. Um consultor Plan10 vai retornar com o próximo passo.
      </div>
    );
  }

  const eyebrow: React.CSSProperties = {
    fontFamily: FONTS.eyebrow,
    fontSize: "0.72rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "rgba(246,241,231,0.7)",
    margin: "0 0 6px",
    display: "block",
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "grid", gap: 16, color: "#F6F1E7", maxWidth: 640 }}
      noValidate
    >
      <label>
        <span style={eyebrow}>Nome</span>
        <input style={inputStyle} value={nome} onChange={(e) => setNome(e.target.value)} required />
      </label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <label>
          <span style={eyebrow}>WhatsApp</span>
          <input
            style={inputStyle}
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
            inputMode="tel"
          />
        </label>
        <label>
          <span style={eyebrow}>E-mail</span>
          <input
            style={inputStyle}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <span style={eyebrow}>Perfil</span>
        <div style={{ display: "flex", gap: 8 }}>
          {(["PF", "PJ"] as const).map((k) => (
            <button
              type="button"
              key={k}
              onClick={() => setPerfil(k)}
              style={{
                padding: "10px 16px",
                borderRadius: 6,
                border: `1px solid ${perfil === k ? accent : "rgba(246,241,231,0.2)"}`,
                background: perfil === k ? accent : "transparent",
                color: perfil === k ? "#10141A" : "#F6F1E7",
                fontFamily: FONTS.eyebrow,
                fontSize: "0.78rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {k === "PF" ? "Para você" : "Para empresa"}
            </button>
          ))}
        </div>
      </div>
      <label>
        <span style={eyebrow}>Interesse</span>
        <input style={inputStyle} value={interesse} readOnly />
      </label>
      <label>
        <span style={eyebrow}>Mensagem (opcional)</span>
        <textarea
          style={{ ...inputStyle, minHeight: 96, resize: "vertical" }}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
        />
      </label>
      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontFamily: FONTS.body, fontSize: "0.88rem", lineHeight: 1.5 }}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          style={{ marginTop: 4 }}
        />
        <span style={{ opacity: 0.85 }}>
          Concordo com o tratamento dos meus dados conforme a Política de Privacidade da Plan10, para o retorno de um consultor.
        </span>
      </label>
      {errMsg && (
        <p style={{ fontFamily: FONTS.body, fontSize: "0.88rem", color: "#E07840", margin: 0 }}>
          {errMsg}
        </p>
      )}
      <button
        type="submit"
        disabled={state === "sending"}
        style={{
          justifySelf: "start",
          padding: "14px 26px",
          borderRadius: 8,
          background: primary,
          color: "#F6F1E7",
          fontFamily: FONTS.eyebrow,
          fontSize: "0.85rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 600,
          border: "none",
          cursor: state === "sending" ? "wait" : "pointer",
          opacity: state === "sending" ? 0.7 : 1,
        }}
      >
        {state === "sending" ? "Enviando..." : "Falar com um consultor"}
      </button>
    </form>
  );
}
