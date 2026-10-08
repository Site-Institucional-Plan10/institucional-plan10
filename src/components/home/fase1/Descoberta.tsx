import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChartNoAxesCombined, Compass, Handshake, HeartPulse, KeyRound,
  ListChecks, MessagesSquare, Search, ShieldCheck,
} from "lucide-react";
import { buscar, CATALOGO, DESTAQUES, VERTICAIS, type ItemCatalogo, type VerticalId } from "@/lib/verticais";
import { usarPerfil } from "@/lib/perfilPublico";
import { usarFavoritos } from "@/lib/favoritos";
import { BotaoFavoritar, EstiloFavoritar } from "@/components/favoritos/BotaoFavoritar";

/**
 * "O que você quer proteger ou realizar?": a descoberta da Home.
 *
 * O arranjo é o do wireframe, peça por peça: a caixa branca com sombra; o
 * título dividindo a linha com a alternância de público; as cinco áreas em
 * grade, com ícone e sublinhado na cor da área quando ativas; o campo cinza
 * com a lupa e o botão dentro; os atalhos de frase; o título dos resultados
 * com o "Ver todas as áreas"; os cards com ícone, nome, descrição, expansão
 * "Conhecer" e Favoritar; o convite dos favoritos; e as três garantias
 * embaixo, fora da caixa.
 *
 * A diferença em relação ao wireframe é só a origem dos dados: lá são 32
 * produtos ilustrativos, aqui é o catálogo inteiro. E o título do card leva
 * para a vertical com a sanfona aberta, porque no site as páginas existem.
 *
 * A busca é local, sobre o modelo único. O pacote é explícito: backend de
 * busca não é requisito desta fase.
 */
const ICONES: Record<string, typeof ShieldCheck> = {
  ShieldCheck, HeartPulse, ChartNoAxesCombined, KeyRound, Handshake,
};

const ATALHOS = ["Vou viajar", "Comprei um apartamento", "Proteger minha equipe"];

const GARANTIAS: [typeof ShieldCheck, string][] = [
  [MessagesSquare, "Conversa antes da recomendação"],
  [ListChecks, "Atenção às diferenças entre propostas"],
  [Compass, "Clareza para decidir"],
];

export function Descoberta() {
  const [termo, setTermo] = useState("");
  const { perfil, definirPerfil } = usarPerfil();
  const { quantidade: favoritos, abrir: abrirFavoritos } = usarFavoritos();
  const [area, setArea] = useState<VerticalId | "todas">("todas");

  const buscando = termo.trim().length >= 2;
  const filtrando = buscando || area !== "todas";

  const resultados = useMemo<ItemCatalogo[]>(() => {
    if (buscando) {
      const base = buscar(termo, perfil === "todos" ? undefined : perfil, 60);
      return (area === "todas" ? base : base.filter((i) => i.vertical === area)).slice(0, 12);
    }
    // em repouso, os destaques verificados, que são os mesmos do mega menu
    const areas = area === "todas" ? VERTICAIS : VERTICAIS.filter((v) => v.id === area);
    const publicos = perfil === "todos" ? (["pessoal", "empresa"] as const) : ([perfil] as const);
    const saida: ItemCatalogo[] = [];
    for (const a of areas) for (const p of publicos) saida.push(...DESTAQUES[a.id][p]);
    return saida.slice(0, 12);
  }, [termo, buscando, perfil, area]);

  const titulo = filtrando
    ? resultados.length === 0
      ? "Nada encontrado"
      : `${resultados.length} ${resultados.length === 1 ? "solução encontrada" : "soluções encontradas"}`
    : perfil === "todos"
      ? "Atalhos para começar"
      : `Soluções para ${perfil === "empresa" ? "sua empresa" : "você e sua família"}`;

  function verTodasAsAreas() {
    setTermo("");
    setArea("todas");
  }

  return (
    <section className="f1 f1-sec" id="descoberta" aria-label="Encontre e selecione soluções">
      <EstiloFavoritar />
      <style>{ESTILO}</style>

      <div className="f1-wrap">
        <div className="dc-caixa">
          <div className="dc-titulo">
            <h2 id="desc-h">O que você quer proteger ou realizar?</h2>
            <div className="dc-publico" role="group" aria-label="Para quem você procura">
              {([["todos", "Todos os perfis"], ["pessoal", "Você e família"], ["empresa", "Sua empresa"]] as const).map(
                ([v, r]) => (
                  <button key={v} type="button" aria-pressed={perfil === v} onClick={() => definirPerfil(v)}>
                    {r}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="dc-areas" role="group" aria-label="Buscar por área">
            {VERTICAIS.map((v) => {
              const Icone = ICONES[v.icone] ?? ShieldCheck;
              return (
                <button
                  key={v.id}
                  type="button"
                  className="dc-area"
                  aria-pressed={area === v.id}
                  style={{ ["--acento" as string]: v.cor } as React.CSSProperties}
                  onClick={() => setArea(area === v.id ? "todas" : v.id)}
                >
                  <Icone aria-hidden />
                  {v.label}
                </button>
              );
            })}
          </div>

          <form className="dc-campo" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="dc-q" className="dc-oculto">
              Descreva sua necessidade ou digite uma solução
            </label>
            <Search size={18} aria-hidden />
            <input
              id="dc-q"
              type="search"
              autoComplete="off"
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
              placeholder="Ex.: vou viajar, proteger minha família, saúde para minha equipe"
            />
            <button type="submit" className="dc-btn">Encontrar soluções</button>
          </form>

          <div className="dc-chips">
            <span>Experimente:</span>
            {ATALHOS.map((a) => (
              <button key={a} type="button" onClick={() => setTermo(a)}>{a}</button>
            ))}
          </div>

          <div className="dc-res-topo">
            <h3 id="dc-res-h">{titulo}</h3>
            {filtrando && (
              <button type="button" onClick={verTodasAsAreas}>Ver todas as áreas</button>
            )}
          </div>

          {resultados.length > 0 ? (
            <div className="dc-grade" aria-labelledby="dc-res-h">
              {resultados.map((i) => {
                const v = VERTICAIS.find((x) => x.id === i.vertical);
                const Icone = ICONES[v?.icone ?? ""] ?? ShieldCheck;
                return (
                  <article
                    key={i.chave}
                    className="dc-res"
                    style={{ ["--acento" as string]: v?.cor } as React.CSSProperties}
                  >
                    <div className="dc-res-topo-l">
                      <Icone size={18} aria-hidden />
                      <span>Plan10 {v?.label}</span>
                    </div>
                    <h4>
                      <Link to={i.rota.to} params={i.rota.params} search={i.rota.search} hash={i.rota.hash}>
                        {i.nome}
                      </Link>
                    </h4>
                    <p>{i.descricao}</p>
                    <div className="dc-res-acoes">
                      <details className="dc-res-mais">
                        <summary>Conhecer</summary>
                        <div className="dc-res-corpo">
                          <p>
                            {i.perfil === "pessoal" ? "Você e família" : "Sua empresa"}. Confira escopo,
                            elegibilidade, disponibilidade e condições com a Plan10 antes de contratar.
                          </p>
                        </div>
                      </details>
                      <BotaoFavoritar chave={i.chave} nome={i.nome} />
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="dc-nada">
              <strong>Vamos entender melhor sua necessidade.</strong>
              <p>Experimente descrever seu objetivo de outra forma ou ampliar as áreas e os perfis.</p>
              <div className="dc-nada-acoes">
                <button type="button" className="dc-btn dc-btn-s" onClick={verTodasAsAreas}>
                  Ampliar minha busca
                </button>
                <Link to="/fale-conosco" className="dc-btn dc-btn-s">
                  Conversar sobre o que preciso
                </Link>
              </div>
            </div>
          )}

          <p aria-live="polite" className="dc-oculto">{filtrando ? titulo : ""}</p>

          <div className="dc-convite">
            <p>
              <strong>Favorite pra cotar mais de um seguro / serviço</strong>
              <br />
              Reúna suas escolhas e peça as cotações em uma só conversa.
            </p>
            <button type="button" onClick={abrirFavoritos}>
              Ver favoritos <span className="dc-convite-n">{favoritos}</span>
              <span aria-hidden> →</span>
            </button>
          </div>
        </div>

        <p className="dc-total">
          São {CATALOGO.length} soluções no catálogo. Use os filtros, descreva o seu momento ou
          comece por um dos atalhos acima.
        </p>
      </div>

      <div className="f1-wrap dc-garantias">
        {GARANTIAS.map(([Icone, texto]) => (
          <span key={texto}>
            <Icone size={16} aria-hidden />
            {texto}
          </span>
        ))}
      </div>
    </section>
  );
}

const ESTILO = `
.dc-oculto { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

.dc-caixa {
  background: #fff; border: 1px solid #E5E7EB; border-radius: 12px;
  box-shadow: 0 14px 45px rgba(5,31,73,.07); padding: 30px 32px; margin-top: 4px;
}
.dc-caixa :is(button, a, input, summary):focus-visible { outline: 2px solid #C45016; outline-offset: 2px; }

.dc-titulo { display: flex; align-items: center; justify-content: space-between; gap: 18px; margin-bottom: 22px; }
.dc-titulo h2 {
  font-size: clamp(1.3rem, 2.4vw, 1.7rem); font-weight: 600; letter-spacing: -.03em;
  margin: 0; color: #16222F;
}
.dc-publico { display: flex; background: #F2F4F7; padding: 4px; border-radius: 7px; gap: 3px; flex: none; }
.dc-publico button {
  border: 0; background: transparent; border-radius: 5px; padding: 9px 13px;
  font-family: var(--font-sans); font-size: .8rem; font-weight: 600; color: #5B6472;
  white-space: nowrap; cursor: pointer;
}
.dc-publico button[aria-pressed="true"] {
  background: #fff; box-shadow: 0 1px 4px rgba(5,31,73,.1); color: #0E2438; font-weight: 700;
}

.dc-areas {
  display: grid; grid-template-columns: repeat(5, minmax(0, 1fr));
  border-bottom: 1px solid #E5E7EB; margin-bottom: 22px; gap: 10px;
}
.dc-area {
  position: relative; border: 0; background: transparent; cursor: pointer; min-width: 0;
  padding: 14px 3px 17px; display: flex; align-items: center; justify-content: center; gap: 9px;
  font-family: var(--font-sans); font-size: .82rem; font-weight: 600; color: #6B7482;
}
.dc-area svg { width: 20px; height: 20px; color: var(--acento); display: block; }
.dc-area[aria-pressed="true"] { color: #0E2438; }
.dc-area[aria-pressed="true"]::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--acento);
}

.dc-campo {
  display: flex; gap: 12px; align-items: center; background: #F5F6F8;
  border: 1px solid #E5E7EB; border-radius: 8px; padding: 5px 5px 5px 17px;
}
.dc-campo > svg { color: #8A93A0; flex: none; display: block; }
.dc-campo input {
  min-width: 0; flex: 1; border: 0; background: none; outline: none;
  font-family: var(--font-sans); font-size: 1rem; color: #16222F; padding: 11px 0;
}
.dc-campo input::placeholder { color: #68778D; font-size: .88rem; }
.dc-btn {
  flex: none; border: 0; cursor: pointer; border-radius: 6px; padding: 12px 20px;
  background: #C45016; color: #fff; font-family: var(--font-sans); font-size: .88rem; font-weight: 700;
  text-decoration: none; display: inline-flex; align-items: center; justify-content: center;
}
.dc-btn:hover { background: #A8410F; }
.dc-btn-s { background: transparent; color: #16222F; border: 1px solid #CBC4B6; }
.dc-btn-s:hover { background: #F4F2EC; }

.dc-chips { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 14px; font-size: .84rem; color: #6B7482; }
.dc-chips button {
  padding: 7px 12px; border: 1px solid #E2E6ED; background: #fff; border-radius: 6px;
  font-family: var(--font-sans); font-size: .82rem; color: #16222F; cursor: pointer;
}
.dc-chips button:hover { background: #F2F4F7; }

.dc-res-topo { display: flex; justify-content: space-between; align-items: center; gap: 15px; margin: 28px 0 16px; }
.dc-res-topo h3 { font-size: .95rem; font-weight: 700; margin: 0; color: #16222F; }
.dc-res-topo button {
  border: 0; background: none; padding: 0; cursor: pointer; font-family: var(--font-sans);
  font-size: .82rem; color: #6B7482; text-decoration: underline;
}
.dc-res-topo button:hover { color: #16222F; }

.dc-grade { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.dc-res {
  border: 1px solid #E5E7EB; border-radius: 8px; padding: 17px; background: #fff;
  display: flex; flex-direction: column; align-items: flex-start; gap: 8px;
  transition: border-color .2s ease;
}
.dc-res:hover { border-color: var(--acento); }
.dc-res-topo-l { display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 10px; }
.dc-res-topo-l svg { color: var(--acento); flex: none; display: block; }
.dc-res-topo-l span { font-size: .68rem; text-transform: uppercase; letter-spacing: .06em; color: #8A93A0; }
.dc-res h4 { font-size: .95rem; line-height: 1.35; font-weight: 700; margin: 0; }
.dc-res h4 a { color: #0E2438; text-decoration: none; }
.dc-res h4 a:hover { text-decoration: underline; }
.dc-res > p { font-size: .82rem; color: #6B7482; line-height: 1.6; margin: 0; }
.dc-res-acoes {
  display: flex; justify-content: space-between; align-items: center; width: 100%;
  margin-top: auto; padding-top: 8px; gap: 10px; flex-wrap: wrap;
}
.dc-res-mais > summary {
  list-style: none; cursor: pointer; font-family: var(--font-sans); font-size: .78rem;
  font-weight: 700; color: #9A7B23;
}
.dc-res-mais > summary::-webkit-details-marker { display: none; }
.dc-res-corpo p { font-size: .78rem; line-height: 1.55; color: #6B7482; margin: 8px 0 0; }

.dc-nada {
  border: 1px dashed #D9D2C4; border-radius: 10px; padding: 22px 20px;
  display: grid; gap: 10px; background: #FBFAF6;
}
.dc-nada strong { font-size: 1rem; font-weight: 600; color: #16222F; }
.dc-nada p { font-size: .9rem; line-height: 1.55; color: #5B6472; margin: 0; }
.dc-nada-acoes { display: flex; flex-wrap: wrap; gap: 9px; }

.dc-convite {
  margin-top: 22px; border-top: 1px solid #E5E7EB; padding-top: 18px;
  display: flex; align-items: center; justify-content: space-between; gap: 15px; flex-wrap: wrap;
}
.dc-convite p { font-size: .86rem; color: #6B7482; max-width: 480px; margin: 0; line-height: 1.5; }
.dc-convite strong { color: #16222F; font-weight: 600; }
.dc-convite > button {
  border: 0; background: none; padding: 0; cursor: pointer; font-family: var(--font-sans);
  font-size: .84rem; font-weight: 700; color: #9A7B23; display: inline-flex; align-items: center; gap: 4px;
}
.dc-convite-n {
  display: inline-flex; align-items: center; justify-content: center; min-width: 20px; height: 20px;
  padding: 0 5px; border-radius: 999px; background: #0E2438; color: #fff; font-size: .68rem; font-weight: 700;
}

.dc-total { font-size: .86rem; color: #8A93A0; margin: 18px 0 0; }

.dc-garantias {
  display: flex; justify-content: center; align-items: center; gap: 35px; flex-wrap: wrap;
  padding-top: 34px; font-size: .84rem; color: #6B7482;
}
.dc-garantias span { display: inline-flex; align-items: center; gap: 8px; }
.dc-garantias svg { color: #C6A24A; flex: none; }

@media (max-width: 1000px) {
  .dc-grade { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 760px) {
  .dc-caixa { padding: 24px 18px; }
  .dc-titulo { flex-direction: column; align-items: stretch; }
  /* Os três rótulos somavam cerca de 340px sem poder encolher, e era isso que
     empurrava a página inteira no celular. Agora dividem a linha e quebram. */
  .dc-publico { width: 100%; flex-wrap: wrap; }
  .dc-publico button { flex: 1 1 auto; min-width: 0; white-space: normal; padding: 9px 8px; font-size: .74rem; }
  .dc-areas { grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0; }
  .dc-area { flex-direction: column; font-size: .68rem; gap: 7px; padding: 12px 2px 13px; }
}
/* Cinco rótulos lado a lado numa caixa de 310px: com a Manrope, que é bem mais
   larga que a condensada anterior, "Consórcios" estourava a coluna e empurrava
   a página inteira. Abaixo de 430px o corpo diminui e a palavra pode quebrar. */
@media (max-width: 430px) {
  .dc-area { font-size: .6rem; letter-spacing: -.01em; line-height: 1.2; text-align: center; overflow-wrap: anywhere; }
  .dc-area svg { width: 17px; height: 17px; }
  .dc-campo { flex-wrap: wrap; padding-left: 12px; gap: 8px; }
  .dc-campo input { width: calc(100% - 30px); }
  .dc-btn { width: 100%; }
  .dc-grade { grid-template-columns: 1fr; }
  .dc-convite { align-items: flex-start; flex-direction: column; }
  .dc-garantias { align-items: flex-start; flex-direction: column; gap: 14px; }
}
`;
