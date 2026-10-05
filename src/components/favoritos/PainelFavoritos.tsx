import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, X } from "lucide-react";
import { usarFavoritos } from "@/lib/favoritos";
import { usarPerfil } from "@/lib/perfilPublico";
import { VERTICAIS } from "@/lib/verticais";
import { whatsappUrl } from "@/lib/plan10";

/**
 * O resumo dos favoritos e o pedido de cotação.
 *
 * Fica no root, acima do Outlet, porque o botão do cabeçalho existe em todas as
 * páginas: assim há um resumo só, e não uma cópia por tela que poderia divergir
 * da outra.
 *
 * O formulário é por etapas, como combinado: contato primeiro, detalhe e
 * autorização depois. Quem desiste na segunda etapa já deixou o essencial
 * preenchido, e a pessoa vê de quanto é o caminho antes de começar.
 *
 * Nada do que se digita aqui é guardado no navegador. As chaves dos favoritos
 * são, porque são identificadores de produto; nome, celular, e-mail e o texto
 * livre existem só enquanto este painel está aberto.
 *
 * Abrir o WhatsApp não é envio. O botão prepara a mensagem e entrega o link; a
 * tela diz isso com todas as letras, em vez de exibir uma confirmação que o
 * site não tem como garantir.
 */
type Canal = "site" | "whatsapp";
type Estado = "parado" | "enviando" | "enviado" | "erro";

const rotuloPerfil = (p: string) => (p === "empresa" ? "Sua empresa" : "Você e família");

export function PainelFavoritos() {
  const { aberto, fechar, itens, remover, quantidade } = usarFavoritos();
  const { perfil } = usarPerfil();

  const [canal, setCanal] = useState<Canal>("site");
  const [etapa, setEtapa] = useState<1 | 2>(1);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [detalhe, setDetalhe] = useState("");
  const [consentimento, setConsentimento] = useState(false);
  const [estado, setEstado] = useState<Estado>("parado");
  const [recado, setRecado] = useState("");
  const [linkWhats, setLinkWhats] = useState("");
  const [copiado, setCopiado] = useState("");

  const caixa = useRef<HTMLDivElement>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const focoAnterior = useRef<HTMLElement | null>(null);

  /* Teclado e foco: Esc fecha, o Tab circula dentro do painel e, ao fechar, o
     foco volta para o botão que abriu, em vez de cair no começo da página. */
  useEffect(() => {
    if (!aberto) return;
    focoAnterior.current = document.activeElement as HTMLElement | null;
    fecharRef.current?.focus();

    const travaAntes = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function aoTeclar(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        fechar();
        return;
      }
      if (e.key !== "Tab" || !caixa.current) return;
      const focaveis = caixa.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
      );
      if (focaveis.length === 0) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    }

    document.addEventListener("keydown", aoTeclar, true);
    return () => {
      document.removeEventListener("keydown", aoTeclar, true);
      document.body.style.overflow = travaAntes;
      focoAnterior.current?.focus?.();
    };
  }, [aberto, fechar]);

  // esvaziar a seleção enquanto o painel está aberto devolve a pessoa à etapa 1
  useEffect(() => {
    if (quantidade === 0) setEtapa(1);
  }, [quantidade]);

  const resumo = useMemo(() => {
    const linhas = itens.map((i, n) => {
      const area = VERTICAIS.find((v) => v.id === i.vertical)?.label ?? "";
      return `${n + 1}. ${i.nome} (${area} · ${rotuloPerfil(i.perfil)})`;
    });
    const partes = ["Pedido de cotação pelo site da Plan10.", "", "Soluções de interesse:", ...linhas];
    if (detalhe.trim()) partes.push("", `Detalhes: ${detalhe.trim()}`);
    return partes.join("\n");
  }, [itens, detalhe]);

  if (!aberto) return null;

  const contatoCompleto = nome.trim().length >= 2 && telefone.trim().length >= 8 && /\S+@\S+\.\S+/.test(email);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (estado === "enviando") return;
    setEstado("enviando");
    setRecado("");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: nome.trim(),
          phone: telefone.trim(),
          email: email.trim(),
          subject: `Pedido de cotação: ${quantidade} ${quantidade === 1 ? "solução" : "soluções"}`,
          message: resumo,
          consent: true,
          source: "favoritos",
          perfil: perfil === "todos" ? "" : perfil,
          contexto: itens.map((i) => i.nome).join(", ").slice(0, 300),
        }),
      });
      if (!r.ok) throw new Error(String(r.status));
      /**
       * A rota responde o que cada destino fez: "sent", "unconfigured" ou
       * "failed". Enquanto o token do CRM e o remetente de e-mail não
       * estiverem configurados, os dois voltam "unconfigured" e o pedido não
       * chegou a ninguém. Dizer "recebido" nessa hora seria inventar uma
       * confirmação que o site não tem, então a tela manda a pessoa para o
       * WhatsApp, que é o canal que já funciona.
       */
      const resposta = (await r.json()) as { crm?: string; email?: string };
      if (resposta.crm === "sent" || resposta.email === "sent") {
        setEstado("enviado");
        setRecado("Pedido recebido. Um consultor da Plan10 entra em contato para tratar da cotação.");
      } else {
        setEstado("erro");
        setRecado(
          "O canal de atendimento ainda está sendo preparado. Peça a cotação pelo WhatsApp, na opção acima: por lá o pedido chega agora.",
        );
      }
    } catch {
      setEstado("erro");
      setRecado(
        "O envio falhou agora. Tente de novo em instantes ou peça a cotação pelo WhatsApp, na opção ao lado.",
      );
    }
  }

  function prepararMensagem() {
    setLinkWhats(whatsappUrl(resumo));
  }

  async function copiarResumo() {
    try {
      await navigator.clipboard.writeText(resumo);
      setCopiado("Resumo copiado.");
    } catch {
      setCopiado("Não foi possível copiar. Selecione o texto acima e copie manualmente.");
    }
  }

  return (
    <div className="p10-fv-fundo" onMouseDown={(e) => e.target === e.currentTarget && fechar()}>
      <style>{ESTILO}</style>

      <div
        className="p10-fv"
        role="dialog"
        aria-modal="true"
        aria-labelledby="p10-fv-h"
        ref={caixa}
      >
        <button ref={fecharRef} type="button" className="p10-fv-x" onClick={fechar} aria-label="Fechar os favoritos">
          <X size={19} aria-hidden />
        </button>

        <p className="p10-fv-olho">Suas escolhas, reunidas</p>
        <h2 id="p10-fv-h">Seus favoritos</h2>
        <p className="p10-fv-sub">Revise as soluções e escolha como prefere pedir suas cotações.</p>

        <div className="p10-fv-grade">
          {/* coluna da esquerda: a seleção */}
          <div>
            {quantidade === 0 ? (
              <div className="p10-fv-vazio">
                <strong>Vamos entender melhor sua necessidade.</strong>
                <p>Experimente descrever seu objetivo de outra forma ou ampliar as áreas e os perfis.</p>
                <div className="p10-fv-acoes">
                  <Link to="/" hash="descoberta" className="p10-fv-btn p10-fv-btn-s" onClick={fechar}>
                    Ampliar minha busca
                  </Link>
                  <a
                    className="p10-fv-btn p10-fv-btn-s"
                    href={whatsappUrl("Olá! Quero conversar sobre o que preciso.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Conversar sobre o que preciso
                  </a>
                </div>
              </div>
            ) : (
              <ul className="p10-fv-lista">
                {itens.map((i) => (
                  <li key={i.chave}>
                    <div className="p10-fv-item">
                      <div className="p10-fv-item-txt">
                        <strong>{i.nome}</strong>
                        <small>
                          {VERTICAIS.find((v) => v.id === i.vertical)?.label} · {rotuloPerfil(i.perfil)}
                        </small>
                      </div>
                      <button
                        type="button"
                        className="p10-fv-tirar"
                        onClick={() => remover(i.chave)}
                        aria-label={`Retirar ${i.nome} dos favoritos`}
                      >
                        <X size={15} aria-hidden />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <Link to="/" hash="descoberta" className="p10-fv-link" onClick={fechar}>
              Continuar explorando
              <span aria-hidden> ↗</span>
            </Link>

            <p className="p10-fv-dica">
              <Heart size={14} aria-hidden />
              Favorite pra cotar mais de um seguro / serviço
            </p>
          </div>

          {/* coluna da direita: o pedido */}
          <div className="p10-fv-brief">
            <h3>Como você prefere pedir a cotação?</h3>

            <div className="p10-fv-canais" role="group" aria-label="Canal para pedir a cotação">
              {([["site", "Pelo site"], ["whatsapp", "Pelo WhatsApp"]] as const).map(([v, r]) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={canal === v}
                  onClick={() => {
                    setCanal(v);
                    setRecado("");
                  }}
                >
                  {r}
                </button>
              ))}
            </div>

            {canal === "site" ? (
              estado === "enviado" ? (
                <p className="p10-fv-ok" role="status">
                  {recado}
                </p>
              ) : (
                <form onSubmit={enviar} className="p10-fv-form">
                  <p className="p10-fv-etapa">Etapa {etapa} de 2</p>

                  {etapa === 1 ? (
                    <>
                      <div className="p10-fv-campos">
                        <div>
                          <label htmlFor="fv-nome">Seu nome</label>
                          <input
                            id="fv-nome"
                            name="name"
                            autoComplete="name"
                            required
                            placeholder="Como podemos chamar você?"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor="fv-tel">Celular com DDD</label>
                          <input
                            id="fv-tel"
                            name="phone"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            required
                            placeholder="(11) 99999-9999"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                          />
                        </div>
                        <div className="p10-fv-largo">
                          <label htmlFor="fv-email">E-mail</label>
                          <input
                            id="fv-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="voce@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="p10-fv-btn p10-fv-btn-p"
                        disabled={!contatoCompleto || quantidade === 0}
                        onClick={() => setEtapa(2)}
                      >
                        Continuar
                      </button>
                      {quantidade === 0 && (
                        <p className="p10-fv-nota">Favorite ao menos uma solução para pedir a cotação.</p>
                      )}
                    </>
                  ) : (
                    <>
                      <label htmlFor="fv-detalhe">Quer acrescentar algum detalhe?</label>
                      <textarea
                        id="fv-detalhe"
                        rows={3}
                        placeholder="Ex.: viagem em dezembro, plano para 8 pessoas da equipe ou revisão de um seguro atual."
                        value={detalhe}
                        onChange={(e) => setDetalhe(e.target.value)}
                      />
                      <label className="p10-fv-consent">
                        <input
                          type="checkbox"
                          required
                          checked={consentimento}
                          onChange={(e) => setConsentimento(e.target.checked)}
                        />
                        <span>Autorizo o contato da Plan10 para tratar deste pedido de cotação.</span>
                      </label>
                      <div className="p10-fv-acoes">
                        <button
                          type="submit"
                          className="p10-fv-btn p10-fv-btn-p"
                          disabled={!consentimento || estado === "enviando"}
                        >
                          {estado === "enviando" ? "Enviando…" : "Enviar pedido de cotação"}
                        </button>
                        <button
                          type="button"
                          className="p10-fv-btn p10-fv-btn-s"
                          onClick={() => setEtapa(1)}
                        >
                          Voltar
                        </button>
                      </div>
                    </>
                  )}

                  <p className="p10-fv-status" role="status" aria-live="polite">
                    {estado === "erro" ? recado : ""}
                  </p>
                </form>
              )
            ) : (
              <div className="p10-fv-form">
                <label htmlFor="fv-detalhe-wa">Quer acrescentar algum detalhe?</label>
                <textarea
                  id="fv-detalhe-wa"
                  rows={3}
                  placeholder="Ex.: viagem em dezembro, plano para 8 pessoas da equipe ou revisão de um seguro atual."
                  value={detalhe}
                  onChange={(e) => {
                    setDetalhe(e.target.value);
                    setLinkWhats("");
                  }}
                />
                <p className="p10-fv-nota">
                  Seus favoritos e os detalhes que você informar seguem juntos na mensagem.
                </p>
                {linkWhats ? (
                  <>
                    <a
                      className="p10-fv-btn p10-fv-btn-p"
                      href={linkWhats}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Continuar no WhatsApp
                    </a>
                    <p className="p10-fv-nota">
                      A mensagem abre no WhatsApp com o resumo pronto. O pedido chega à Plan10 ao ser
                      enviado por lá.
                    </p>
                  </>
                ) : (
                  <button
                    type="button"
                    className="p10-fv-btn p10-fv-btn-p"
                    disabled={quantidade === 0}
                    onClick={prepararMensagem}
                  >
                    Preparar mensagem
                  </button>
                )}
              </div>
            )}

            <details className="p10-fv-resumo">
              <summary>Conferir resumo do pedido</summary>
              <label htmlFor="fv-resumo" style={{ position: "absolute", left: -9999 }}>
                Resumo com os favoritos para cotação
              </label>
              <textarea id="fv-resumo" readOnly rows={7} value={resumo} />
              <button type="button" className="p10-fv-link" onClick={copiarResumo}>
                Copiar resumo
              </button>
              <p className="p10-fv-status" role="status" aria-live="polite">
                {copiado}
              </p>
            </details>

            <p className="p10-fv-nota">
              Favoritar reúne interesses para a conversa. Disponibilidade, condições e valores são
              tratados com o consultor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const ESTILO = `
.p10-fv-fundo {
  position: fixed; inset: 0; z-index: 60; background: rgba(8,20,32,.55);
  display: flex; align-items: flex-start; justify-content: center;
  padding: 24px 16px; overflow-y: auto; backdrop-filter: blur(2px);
}
.p10-fv {
  position: relative; width: 100%; max-width: 1000px; background: #fff;
  border-radius: 16px; padding: 34px 32px 30px; margin: auto;
  box-shadow: 0 30px 80px rgba(8,20,32,.3); font-family: var(--font-sans);
}
.p10-fv-x {
  position: absolute; top: 16px; right: 16px; width: 38px; height: 38px;
  border: 1px solid #E6E1D6; border-radius: 50%; background: #fff; cursor: pointer;
  display: flex; align-items: center; justify-content: center; color: #16222F;
}
.p10-fv-x:hover { background: #F4F2EC; }
.p10-fv :is(button, a, input, textarea, summary):focus-visible { outline: 2px solid #C45016; outline-offset: 2px; }

.p10-fv-olho {
  font-size: .72rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;
  color: #9A7B23; margin: 0 0 8px;
}
.p10-fv h2 {
  font-size: clamp(1.5rem, 3vw, 2.1rem); font-weight: 600; letter-spacing: -.02em;
  margin: 0; color: #16222F;
}
.p10-fv-sub { font-size: .98rem; line-height: 1.55; color: #5B6472; margin: 10px 0 0; }

.p10-fv-grade { display: grid; gap: 26px; margin-top: 26px; grid-template-columns: 1fr; }
@media (min-width: 880px) { .p10-fv-grade { grid-template-columns: 1fr 1fr; gap: 34px; } }

.p10-fv-lista { list-style: none; margin: 0; padding: 0; display: grid; gap: 9px; }
/* o item é a caixa; o conteúdo em linha fica num filho, senão o flex do li
   quebraria o texto em colunas */
.p10-fv-lista li { display: block; }
.p10-fv-item {
  display: flex; align-items: center; gap: 12px; border: 1px solid #E6E1D6;
  border-radius: 10px; padding: 12px 14px; background: #FBFAF6;
}
.p10-fv-item-txt { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
.p10-fv-item strong { font-size: .93rem; font-weight: 600; color: #16222F; }
.p10-fv-item small { font-size: .74rem; letter-spacing: .05em; text-transform: uppercase; color: #9AA1AC; }
.p10-fv-tirar {
  flex: none; width: 30px; height: 30px; border-radius: 50%; border: 1px solid #E6E1D6;
  background: #fff; color: #6B7482; cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.p10-fv-tirar:hover { border-color: #C54949; color: #C54949; }

.p10-fv-vazio {
  border: 1px dashed #D9D2C4; border-radius: 12px; padding: 24px 22px;
  display: grid; gap: 10px; background: #FBFAF6;
}
.p10-fv-vazio strong { font-size: 1.04rem; font-weight: 600; color: #16222F; }
.p10-fv-vazio p { font-size: .93rem; line-height: 1.55; color: #5B6472; margin: 0; }

.p10-fv-link {
  display: inline-block; margin-top: 18px; border: 0; background: none; padding: 0; cursor: pointer;
  font-family: inherit; font-size: .82rem; font-weight: 700; letter-spacing: .06em;
  text-transform: uppercase; color: #9A7B23; text-decoration: none;
}
.p10-fv-link:hover { text-decoration: underline; }
.p10-fv-dica {
  display: flex; align-items: center; gap: 8px; margin: 16px 0 0;
  font-size: .86rem; color: #6B7482;
}
.p10-fv-dica svg { color: #C45016; flex: none; }

.p10-fv-brief { border: 1px solid #E6E1D6; border-radius: 12px; padding: 22px 20px; background: #FBFAF6; }
.p10-fv-brief h3 { font-size: 1.04rem; font-weight: 600; margin: 0; color: #16222F; }

.p10-fv-canais { display: flex; gap: 8px; margin: 14px 0 18px; flex-wrap: wrap; }
.p10-fv-canais button {
  flex: 1; min-width: 130px; border: 1px solid #E0DBD0; background: #fff; border-radius: 999px;
  padding: 10px 14px; font-family: inherit; font-size: .85rem; font-weight: 600;
  color: #5B6472; cursor: pointer;
}
.p10-fv-canais button[aria-pressed="true"] { background: #0E2438; border-color: #0E2438; color: #fff; }

.p10-fv-form { display: grid; gap: 12px; }
.p10-fv-etapa {
  margin: 0; font-size: .72rem; font-weight: 700; letter-spacing: .12em;
  text-transform: uppercase; color: #9AA1AC;
}
.p10-fv-campos { display: grid; gap: 12px; grid-template-columns: 1fr; }
@media (min-width: 520px) { .p10-fv-campos { grid-template-columns: 1fr 1fr; } }
.p10-fv-largo { grid-column: 1 / -1; }
.p10-fv :is(label) { display: block; font-size: .82rem; font-weight: 600; color: #16222F; margin-bottom: 5px; }
.p10-fv :is(input[type="text"], input[type="tel"], input[type="email"], input:not([type]), textarea) {
  width: 100%; border: 1px solid #E0DBD0; border-radius: 9px; padding: 11px 13px;
  font-family: inherit; font-size: .93rem; color: #16222F; background: #fff;
}
.p10-fv textarea { resize: vertical; line-height: 1.5; }
.p10-fv :is(input, textarea):focus { border-color: #C6A24A; outline: none; }
.p10-fv-consent { display: flex; align-items: flex-start; gap: 9px; font-weight: 400 !important; }
.p10-fv-consent input { width: auto !important; margin-top: 3px; flex: none; }
.p10-fv-consent span { font-size: .86rem; line-height: 1.45; color: #5B6472; }

.p10-fv-acoes { display: flex; flex-wrap: wrap; gap: 9px; }
.p10-fv-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  border-radius: 999px; padding: 11px 20px; font-family: inherit; font-size: .88rem;
  font-weight: 700; cursor: pointer; border: 1px solid transparent; text-decoration: none;
  justify-self: start;
}
.p10-fv-btn-p { background: #C45016; color: #fff; }
.p10-fv-btn-p:hover:enabled { background: #A8410F; }
.p10-fv-btn-s { background: transparent; color: #16222F; border-color: #CBC4B6; }
.p10-fv-btn-s:hover { border-color: #16222F; }
.p10-fv-btn:disabled { opacity: .45; cursor: not-allowed; }

.p10-fv-nota { font-size: .82rem; line-height: 1.5; color: #6B7482; margin: 0; }
.p10-fv-status { font-size: .85rem; line-height: 1.5; color: #C54949; margin: 0; min-height: 1px; }
.p10-fv-ok {
  font-size: .95rem; line-height: 1.55; color: #16222F; margin: 16px 0 0;
  border-left: 3px solid #4F7D60; padding-left: 14px;
}

.p10-fv-resumo { margin-top: 18px; border-top: 1px solid #E6E1D6; padding-top: 16px; }
.p10-fv-resumo summary {
  cursor: pointer; font-size: .82rem; font-weight: 700; letter-spacing: .06em;
  text-transform: uppercase; color: #9A7B23; list-style: none;
}
.p10-fv-resumo summary::-webkit-details-marker { display: none; }
.p10-fv-resumo textarea { margin-top: 12px; font-size: .85rem; }

@media (max-width: 620px) {
  .p10-fv { padding: 28px 18px 24px; border-radius: 13px; }
  .p10-fv-fundo { padding: 12px 8px; }
}
`;
