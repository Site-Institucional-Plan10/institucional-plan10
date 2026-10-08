import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { canonical } from "@/lib/seo";
import { getWhatsAppUrl } from "@/lib/utils";
import { PageTheme, PALETTES } from "@/components/plan10/PageTheme";
import { CATALOGO, VERTICAIS } from "@/lib/verticais";

export const Route = createFileRoute("/em-um-clique")({
  head: () => ({
    meta: [
      { title: "Plan10 em um clique | Índice de soluções e temas" },
      { name: "description", content: "Encontre por solução, tema ou necessidade. Um índice rápido de todo o ecossistema Plan10." },
      { property: "og:title", content: "Plan10 em um clique" },
      { property: "og:description", content: "Busque por solução, tema ou necessidade." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Plan10" },
      { property: "og:url", content: canonical("/em-um-clique") },
    ],
    links: [{ rel: "canonical", href: canonical("/em-um-clique") }],
  }),
  component: EmUmClique,
});

type Item = { t: string; d: string; tag: string; sol?: string; to?: string };

// Índice A-Z de necessidades (arquivo 12 do Drive), cada item aponta para a
// solução ou página correspondente.
const AZ: { l: string; items: Item[] }[] = [
  { l: "A", items: [
    { t: "Agro", d: "Campo, safra, máquinas e atividade produtiva.", tag: "Proteção · Crescimento · Finanças", sol: "protecao" },
    { t: "Assistência", d: "Suporte, conveniência e continuidade do dia a dia.", tag: "Assistência pessoal e empresarial", sol: "assistencia" },
  ] },
  { l: "C", items: [
    { t: "Carro", d: "Veículos, frota, montadoras e mobilidade.", tag: "Mobilidade · Crescimento", to: "/mobilidade" },
    { t: "Casa", d: "Residência, imóvel, reparos e rotina.", tag: "Proteção · Assistência", sol: "protecao" },
    { t: "Conquistas", d: "Aquisição, expansão e planejamento.", tag: "Crescimento e mobilidade", sol: "crescimento" },
    { t: "Conteúdos", d: "Dicas, explicações e biblioteca editorial.", tag: "Blog Plan10", to: "/blog" },
    { t: "Crédito", d: "Liquidez, financiamento e capital de giro.", tag: "Soluções financeiras", sol: "financeiras" },
    { t: "Cyber", d: "Dados, Pix, golpes e riscos digitais.", tag: "Proteção · Finanças · Assistência", sol: "protecao" },
  ] },
  { l: "E", items: [
    { t: "Empresa", d: "Riscos, benefícios e continuidade operacional.", tag: "Proteção · Saúde · Finanças · Assistência", to: "/solucoes" },
  ] },
  { l: "F", items: [
    { t: "Família", d: "Vida, renda, saúde e futuro.", tag: "Proteção · Saúde · Finanças", sol: "protecao" },
    { t: "Finanças", d: "Crédito, liquidez, investimentos e previdência.", tag: "Soluções financeiras", sol: "financeiras" },
  ] },
  { l: "I", items: [
    { t: "Imóvel", d: "Casa, apartamento, locação e patrimônio.", tag: "Proteção · Finanças · Assistência", sol: "protecao" },
    { t: "Investimentos", d: "Futuro, planejamento e decisões financeiras.", tag: "Soluções financeiras", sol: "financeiras" },
  ] },
  { l: "M", items: [
    { t: "Mapa de soluções", d: "Visão geral das cinco soluções Plan10.", tag: "Soluções", to: "/solucoes" },
    { t: "Mobilidade", d: "Montadoras, modelos, frota e deslocamentos.", tag: "Biblioteca de mobilidade", to: "/mobilidade" },
    { t: "Montadoras", d: "Montadoras, modelos e ficha de cada carro.", tag: "Biblioteca de mobilidade", to: "/mobilidade" },
  ] },
  { l: "P", items: [
    { t: "Patrimônio", d: "Ativos, riscos e continuidade.", tag: "Proteção à vida e ao patrimônio", sol: "protecao" },
    { t: "Pet", d: "Saúde e cuidado animal.", tag: "Saúde · Assistência", sol: "saude" },
    { t: "Proteção", d: "Vida, patrimônio, riscos e responsabilidades.", tag: "Proteção à vida e ao patrimônio", sol: "protecao" },
  ] },
  { l: "Q", items: [
    { t: "Quem somos", d: "Institucional Plan10.", tag: "Quem somos", to: "/quem-somos" },
  ] },
  { l: "R", items: [
    { t: "Residência", d: "Casa, imóvel, manutenção e assistência.", tag: "Proteção · Assistência", sol: "protecao" },
    { t: "Riscos", d: "Responsabilidades, contratos e continuidade.", tag: "Proteção à vida e ao patrimônio", sol: "protecao" },
  ] },
  { l: "S", items: [
    { t: "Saúde", d: "Cuidado, prevenção e bem-estar.", tag: "Saúde e vida saudável", sol: "saude" },
    { t: "Soluções", d: "As cinco soluções oficiais Plan10.", tag: "Mapa de soluções", to: "/solucoes" },
  ] },
  { l: "T", items: [
    { t: "Tecnologia", d: "Celular, conectividade e rotina digital.", tag: "Proteção · Assistência · Finanças", sol: "assistencia" },
  ] },
  { l: "V", items: [
    { t: "Veículos", d: "Carro, moto, bike e frotas.", tag: "Mobilidade · Crescimento", to: "/mobilidade" },
    { t: "Viagem", d: "Seguro viagem, bagagem e conveniência.", tag: "Assistência · Proteção · Saúde", sol: "assistencia" },
    { t: "Vida e renda", d: "Proteção familiar e continuidade.", tag: "Proteção à vida e ao patrimônio", sol: "protecao" },
  ] },
];

const QUICK: Item[] = [
  { t: "Mapa de soluções", d: "Visão geral das cinco soluções.", tag: "", to: "/solucoes" },
  { t: "Saúde e vida saudável", d: "Cuidado, acesso, prevenção e bem-estar.", tag: "", sol: "saude" },
  { t: "Proteção à vida e ao patrimônio", d: "Vida, patrimônio, riscos e responsabilidades.", tag: "", sol: "protecao" },
  { t: "Soluções financeiras", d: "Crédito, garantias, reservas e planejamento.", tag: "", sol: "financeiras" },
  { t: "Crescimento e mobilidade", d: "Aquisição, veículos e expansão.", tag: "", sol: "crescimento" },
  { t: "Assistência pessoal e empresarial", d: "Suporte, manutenção e continuidade.", tag: "", sol: "assistencia" },
  { t: "Mobilidade: montadoras e modelos", d: "Ficha de cada carro, proteção e aquisição.", tag: "", to: "/mobilidade" },
  { t: "Blog e conteúdos", d: "Dicas e temas úteis para decidir.", tag: "", to: "/blog" },
  { t: "Quem somos", d: "A consultoria por trás das soluções.", tag: "", to: "/quem-somos" },
];

const POPULAR = ["Saúde", "Empresa", "Casa", "Carro", "Crédito", "Proteção", "Assistência", "Finanças", "Imóvel", "Viagem", "Pet", "Tecnologia"];

function ItemLink({ it, className }: { it: Item; className: string }) {
  const inner = (
    <>
      <strong>{it.t}</strong>
      <span>{it.d}</span>
      {it.tag && <em>{it.tag}</em>}
    </>
  );
  if (it.sol) return <Link to="/solucoes/$solucao" params={{ solucao: it.sol }} className={className}>{inner}</Link>;
  return <Link to={it.to ?? "/solucoes"} className={className}>{inner}</Link>;
}

function EmUmClique() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const groups = useMemo(() => {
    if (!query) return AZ;
    return AZ.map((g) => ({
      l: g.l,
      items: g.items.filter((it) => (it.t + " " + it.d + " " + it.tag).toLowerCase().includes(query)),
    })).filter((g) => g.items.length > 0);
  }, [query]);

  const nada = groups.length === 0;

  /**
   * A segunda procura: as soluções de A a Z, no conceito da Porto.
   *
   * O índice acima é alfabético por tema; este é alfabético por solução, que é
   * como a pessoa costuma chegar quando já sabe o nome do que quer. Os dois
   * dividem o mesmo campo de busca.
   *
   * Cada item leva para a vertical com a sanfona da solução já aberta, que é a
   * rota que o catálogo monta.
   */
  const porLetra = useMemo(() => {
    const semAcento = (t: string) =>
      t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    const base = query
      ? CATALOGO.filter((i) => semAcento(i.nome + " " + i.descricao).toLowerCase().includes(semAcento(query).toLowerCase()))
      : CATALOGO;
    /* Nomes se repetem no catálogo: "Assistência chaveiro" existe para empresa e
       para residência, em caminhos diferentes. Numa lista alfabética os dois
       aparecem colados e sem como distinguir, então o público entra no rótulo
       quando o nome não é único. */
    const vezes = new Map<string, number>();
    for (const i of base) vezes.set(i.nome, (vezes.get(i.nome) ?? 0) + 1);

    const mapa = new Map<string, { item: (typeof CATALOGO)[number]; publico: string | null }[]>();
    for (const item of [...base].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))) {
      const l = semAcento(item.nome.trim().charAt(0));
      const letra = /[A-Z]/.test(l) ? l : "#";
      if (!mapa.has(letra)) mapa.set(letra, []);
      mapa.get(letra)!.push({
        item,
        publico:
          (vezes.get(item.nome) ?? 0) > 1
            ? item.perfil === "empresa"
              ? "sua empresa"
              : "você e família"
            : null,
      });
    }
    return [...mapa.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [query]);

  return (
    <PageTheme palette={PALETTES.institucional}>
      <style>{`
        .plan10-scope .euc-hero-in { display: grid; gap: 14px; }
        
        
        
        
        .euc-search { max-width: 640px; margin: 12px 0 0; display: flex; gap: 10px; background: #fff; padding: 7px; border-radius: 999px; }
        .euc-search input { flex: 1; border: 0; background: transparent; padding: 13px 20px; font-size: 1rem; outline: 0; color: #1A1A1A; }
        .euc-search .ico { display: grid; place-items: center; padding: 0 22px; border-radius: 999px; background: var(--gold); color: var(--preto); font-family: var(--font-sans); font-weight: 700; letter-spacing: .1em; text-transform: uppercase; font-size: 0.91rem; }
        .euc-wrap { max-width: 1180px; margin: 0 auto; padding: 64px 20px; }
        @media (min-width: 768px) { .euc-wrap { padding: 88px 40px; } }
        .euc-block { margin-bottom: 56px; }
        .euc-sub { font-family: var(--fb); font-size: .95rem; color: var(--ctxt); margin: -12px 0 22px; }
        .euc-az-nav { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 26px; }
        .euc-az-nav a {
          display: grid; place-items: center; min-width: 32px; height: 32px; padding: 0 7px;
          border: 1px solid var(--c2); border-radius: 6px; background: #fff;
          font-family: var(--fb); font-size: .82rem; font-weight: 700; color: var(--preto);
          text-decoration: none;
        }
        .euc-az-nav a:hover { border-color: var(--vp); color: var(--vp); }
        /* o li é a caixa e o link é que fica em linha: li em flex quebraria o
           nome da solução em colunas */
        .euc-az { list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; grid-template-columns: 1fr; }
        @media (min-width: 720px) { .euc-az { grid-template-columns: repeat(2, 1fr); column-gap: 28px; } }
        @media (min-width: 1080px) { .euc-az { grid-template-columns: repeat(3, 1fr); } }
        .euc-az li { display: block; }
        .euc-az a {
          display: flex; align-items: baseline; gap: 9px; padding: 6px 2px;
          font-family: var(--fb); font-size: .93rem; color: var(--preto); text-decoration: none;
          border-bottom: 1px solid transparent;
        }
        .euc-az a:hover { color: var(--vp); border-bottom-color: var(--c2); }
        .euc-az a > span { min-width: 0; }
        .euc-az small { font-size: .82em; color: #8A93A0; }
        .euc-az em {
          margin-left: auto; flex: none; font-style: normal; font-family: var(--fl);
          font-size: .66rem; letter-spacing: .07em; text-transform: uppercase; color: #9AA1AC;
        }
        .euc-letter[id^="az-"] { scroll-margin-top: 110px; }
        .euc-block > .eyebrow { font-family: var(--font-sans); font-weight: 600; letter-spacing: .22em; text-transform: uppercase; font-size: 0.84rem; color: var(--gold-dk, #866719); margin: 0; }
        .euc-block > h2 { font-family: var(--font-sans); font-weight: 600; font-size: clamp(1.6rem, 3vw, 2.2rem); color: var(--preto); margin: 10px 0 22px; }
        .euc-letter { margin-bottom: 26px; }
        .euc-letter h3 { font-family: var(--font-sans); font-weight: 600; font-size: 1.5rem; color: var(--gold); border-bottom: 1px solid var(--c2); padding-bottom: 8px; margin: 0 0 14px; }
        .euc-items { display: grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 640px) { .euc-items { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .euc-items { grid-template-columns: repeat(3, 1fr); } }
        .euc-item { display: block; text-decoration: none; border: 1px solid var(--c2); border-radius: 5px; padding: 16px 18px; background: #fff; transition: border-color .22s ease; }
        .euc-item:hover { border-color: var(--preto); }
        .euc-item strong { display: block; font-family: var(--font-sans); font-weight: 500; font-size: 1.1rem; color: var(--preto); }
        .euc-item span { display: block; color: #5A5A5A; font-size: .9rem; margin-top: 5px; line-height: 1.45; }
        .euc-item em { display: block; font-style: normal; font-family: var(--font-sans); letter-spacing: .08em; text-transform: uppercase; font-size: 0.76rem; color: var(--gold); margin-top: 10px; }
        .euc-quick { display: grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 640px) { .euc-quick { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .euc-quick { grid-template-columns: repeat(4, 1fr); } }
        .euc-pop { display: flex; flex-wrap: wrap; gap: 8px; }
        .euc-pop button { border: 1px solid #D8D2C6; background: #fff; border-radius: 999px; padding: 9px 16px; color: #5A5A5A; font-weight: 600; font-size: 0.94rem; cursor: pointer; transition: border-color .2s ease, color .2s ease; }
        .euc-pop button:hover { border-color: var(--gold); color: var(--preto); }
        .euc-help { text-align: center; background: linear-gradient(150deg, #0C2340, var(--preto)); color: #fff; border-radius: 8px; padding: 44px 24px; }
        .euc-help h2 { font-family: var(--font-sans); font-weight: 600; font-size: 1.7rem; margin: 0 0 8px; color: #fff; }
        .euc-help p { color: rgba(255,255,255,.72); margin: 0 auto 20px; max-width: 46ch; }
        .euc-help a { display: inline-flex; align-items: center; gap: 8px; background: var(--gold-dk, #866719); color: #fff; text-decoration: none; font-weight: 600; border-radius: 9px; padding: 13px 26px; }
        .euc-nada { color: #5A5A5A; font-size: 1rem; }
      `}</style>

      <header className="p10-hero">
        <div className="p10-hero-inner euc-hero-in">
        <p className="eyebrow">Plan10 em um clique</p>
        <h1>Encontre por tema, necessidade ou nome da solução</h1>
        <p className="lede">Duas formas de procurar: pelo tema que organiza o assunto ou pelo nome da solução, de A a Z.</p>
        <form className="euc-search" onSubmit={(e) => e.preventDefault()} role="search">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Saúde, casa, empresa, carro, crédito, viagem, pet..."
            aria-label="Buscar por tema ou necessidade"
          />
          <span className="ico" aria-hidden>Buscar</span>
        </form>
        </div>
      </header>

      <main className="euc-wrap">
        <section className="euc-block" aria-label="Índice de temas">
          <p className="eyebrow">Índice</p>
          <h2>Por tema e necessidade</h2>
          {nada ? (
            <p className="euc-nada">Nada encontrado para "{q}". Tente outra palavra, ou fale com um consultor.</p>
          ) : (
            groups.map((g) => (
              <div key={g.l} className="euc-letter">
                <h3>{g.l}</h3>
                <div className="euc-items">
                  {g.items.map((it) => (
                    <ItemLink key={it.t} it={it} className="euc-item" />
                  ))}
                </div>
              </div>
            ))
          )}
        </section>

        <section className="euc-block" aria-label="Índice de soluções de A a Z" id="az">
          <p className="eyebrow">Índice</p>
          <h2>Por solução, de A a Z</h2>
          <p className="euc-sub">
            Quando você já sabe o nome do que procura. São {CATALOGO.length} soluções, em ordem
            alfabética.
          </p>

          {porLetra.length === 0 ? (
            <p className="euc-nada">Nada encontrado para "{q}". Tente outra palavra, ou fale com um consultor.</p>
          ) : (
            <>
              <nav className="euc-az-nav" aria-label="Pular para a letra">
                {porLetra.map(([letra]) => (
                  <a key={letra} href={`#az-${letra}`}>{letra}</a>
                ))}
              </nav>
              {porLetra.map(([letra, itens]) => (
                <div key={letra} className="euc-letter" id={`az-${letra}`}>
                  <h3>{letra}</h3>
                  <ul className="euc-az">
                    {itens.map(({ item: i, publico }) => (
                      <li key={i.chave}>
                        <Link to={i.rota.to} params={i.rota.params} search={i.rota.search} hash={i.rota.hash}>
                          <span>
                            {i.nome}
                            {publico && <small> ({publico})</small>}
                          </span>
                          <em>{VERTICAIS.find((v) => v.id === i.vertical)?.label}</em>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
        </section>

        {!query && (
          <>
            <section className="euc-block">
              <p className="eyebrow">Atalhos</p>
              <h2>Links rápidos</h2>
              <div className="euc-quick">
                {QUICK.map((it) => (
                  <ItemLink key={it.t} it={it} className="euc-item" />
                ))}
              </div>
            </section>

            <section className="euc-block">
              <p className="eyebrow">Mais buscados</p>
              <h2>O que as pessoas procuram</h2>
              <div className="euc-pop">
                {POPULAR.map((p) => (
                  <button key={p} type="button" onClick={() => setQ(p)}>{p}</button>
                ))}
              </div>
            </section>
          </>
        )}

        <section className="euc-help">
          <h2>Não encontrou o que procura?</h2>
          <p>Um consultor Plan10 ajuda você a chegar na solução certa, com orientação e sem excesso comercial.</p>
          <a href={getWhatsAppUrl("default")} target="_blank" rel="noopener noreferrer">Falar com um consultor</a>
        </section>
      </main>
    </PageTheme>
  );
}
