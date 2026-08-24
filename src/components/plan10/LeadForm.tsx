import { useMemo, useState } from "react";
import { buildLeadWhatsAppUrl, maskPhoneBR } from "@/lib/utils";

interface Props {
  interesse: string;
  perfilInicial?: "PF" | "PJ";
  origem?: string;
  /** Caminho legível do que a pessoa está vendo, ex: "Assistência › Emergência empresarial" */
  contexto?: string;
  /** Produtos do núcleo, para o campo "produto de interesse". */
  produtos?: string[];
}

const WA = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.5-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5 0-.2 0-.4-.1-.5-.1-.1-.6-1.5-.9-2.1-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.2-.3-.3-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
  </svg>
);

export function LeadForm({ interesse, perfilInicial = "PF", origem, contexto, produtos }: Props) {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [perfil] = useState<"PF" | "PJ">(perfilInicial);
  const [produto, setProduto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [consent, setConsent] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showMensagem, setShowMensagem] = useState(false);
  const [state, setState] = useState<"idle" | "ok">("idle");
  const [errMsg, setErrMsg] = useState("");
  const [waUrl, setWaUrl] = useState("");

  const opcoes = useMemo(() => Array.from(new Set(produtos ?? [])), [produtos]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrMsg("");
    if (nome.trim().length < 2 || whatsapp.trim().length < 8) {
      setErrMsg("Confira o nome e o WhatsApp.");
      return;
    }
    if (email.trim() && !email.includes("@")) {
      setErrMsg("O e-mail informado parece inválido.");
      return;
    }
    if (!consent) {
      setErrMsg("É necessário concordar com a política de privacidade.");
      return;
    }
    const url = buildLeadWhatsAppUrl({
      nome: nome.trim(),
      telefone: whatsapp.trim(),
      email: email.trim() || undefined,
      solucao: contexto || interesse,
      produto: produto || undefined,
      perfil,
      mensagem: mensagem.trim() || undefined,
      origem,
    });
    setWaUrl(url);
    if (typeof window !== "undefined") window.open(url, "_blank", "noopener,noreferrer");
    setState("ok");
  }

  if (state === "ok") {
    return (
      <div className="p10-form" style={{ textAlign: "center" }}>
        <p style={{ color: "#fff", fontFamily: "var(--fb)", fontSize: "1rem", margin: "0 0 16px" }}>
          Abrimos o WhatsApp da Plan10 com os seus dados{contexto ? ` sobre ${contexto}` : ""}. É só enviar a mensagem que um consultor retorna com o próximo passo.
        </p>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
          {WA} Não abriu? Enviar pelo WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="p10-form" noValidate>
      {contexto && (
        <div className="p10-form-ctx">
          <span className="eyebrow">Sobre</span>
          <p>{contexto}</p>
        </div>
      )}
      <div className="row">
        <label>
          <span className="eyebrow">Nome</span>
          <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome completo" required />
        </label>
        <label>
          <span className="eyebrow">WhatsApp</span>
          <input value={whatsapp} onChange={(e) => setWhatsapp(maskPhoneBR(e.target.value))} inputMode="tel" placeholder="(11) 90000-0000" required />
        </label>
      </div>
      {opcoes.length > 0 && (
        <label>
          <span className="eyebrow">Produto de interesse</span>
          <select value={produto} onChange={(e) => setProduto(e.target.value)}>
            <option value="">Não sei ainda, quero orientação</option>
            {opcoes.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>
      )}
      {showEmail ? (
        <label>
          <span className="eyebrow">E-mail</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" />
        </label>
      ) : (
        <button type="button" className="p10-form-add" onClick={() => setShowEmail(true)}>+ Prefiro que falem por e-mail</button>
      )}
      {showMensagem ? (
        <label>
          <span className="eyebrow">Mensagem (opcional)</span>
          <textarea value={mensagem} onChange={(e) => setMensagem(e.target.value)} rows={3} placeholder="Conte um pouco sobre o seu momento" />
        </label>
      ) : (
        <button type="button" className="p10-form-add" onClick={() => setShowMensagem(true)}>+ Adicionar mensagem</button>
      )}
      <label className="check">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>Concordo com o tratamento dos meus dados conforme a Política de Privacidade da Plan10.</span>
      </label>
      {errMsg && (
        <p style={{ fontFamily: "var(--fb)", fontSize: ".88rem", color: "#E07840", margin: 0 }}>{errMsg}</p>
      )}
      <div className="actions">
        <button type="submit" className="btn btn-wa" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          {WA} Enviar pelo WhatsApp
        </button>
      </div>
      <p style={{ fontFamily: "var(--fb)", fontSize: ".8rem", color: "rgba(255,255,255,.6)", margin: 0, textAlign: "center" }}>
        Suas respostas abrem uma conversa direta com um consultor. Sem compromisso.
      </p>
    </form>
  );
}
