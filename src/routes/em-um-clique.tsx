import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { canonical } from "@/lib/seo";
import { getWhatsAppUrl } from "@/lib/utils";

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
    { t: "Carro", d: "Veículos, frota, montadoras e mobilidade.", tag: "Crescimento · Proteção · Assistência", sol: "crescimento" },
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
    { t: "Mobilidade", d: "Veículos, frota e deslocamentos.", tag: "Crescimento · Proteção · Assistência", sol: "crescimento" },
    { t: "Montadoras", d: "Lançamentos, veículos e tecnologia automotiva.", tag: "Blog · Crescimento", to: "/blog" },
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
    { t: "Veículos", d: "Carro, moto, bike e frotas.", tag: "Crescimento · Proteção · Assistência", sol: "crescimento" },
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

  return (
    <div className="euc">
      <style>{`
        .euc { font-family: 'Inter', system-ui, sans-serif; color: #1A1A1A; background: #F7F5F2; }
        .euc-hero { background: linear-gradient(160deg, #0C2340 0%, #143A61 100%); color: #fff; padding: 132px 20px 64px; text-align: center; }
        .euc-hero .eyebrow { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; letter-spacing: .22em; text-transform: uppercase; font-size: .8rem; color: #E8CA6A; margin: 0; }
        .euc-hero h1 { font-family: 'Playfair Display', Georgia, serif; font-weight: 600; font-size: clamp(2.2rem, 5vw, 3.4rem); margin: 14px 0 10px; color: #fff; }
        .euc-hero p { color: rgba(255,255,255,.72); font-size: 1.05rem; margin: 0 auto; max-width: 46ch; }
        .euc-search { max-width: 720px; margin: 30px auto 0; display: flex; gap: 10px; background: #fff; padding: 7px; border-radius: 999px; }
        .euc-search input { flex: 1; border: 0; background: transparent; padding: 13px 20px; font-size: 1rem; outline: 0; color: #1A1A1A; }
        .euc-search .ico { display: grid; place-items: center; padding: 0 22px; border-radius: 999px; background: #C9A83C; color: #143A61; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; font-size: .85rem; }
        .euc-wrap { max-width: 1180px; margin: 0 auto; padding: 64px 20px; }
        @media (min-width: 768px) { .euc-wrap { padding: 88px 40px; } }
        .euc-block { margin-bottom: 56px; }
        .euc-block > .eyebrow { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; letter-spacing: .22em; text-transform: uppercase; font-size: .78rem; color: #E05A20; margin: 0; }
        .euc-block > h2 { font-family: 'Playfair Display', Georgia, serif; font-weight: 600; font-size: clamp(1.6rem, 3vw, 2.2rem); color: #143A61; margin: 10px 0 22px; }
        .euc-letter { margin-bottom: 26px; }
        .euc-letter h3 { font-family: 'Playfair Display', Georgia, serif; font-weight: 600; font-size: 1.5rem; color: #C9A83C; border-bottom: 1px solid #E6E1D6; padding-bottom: 8px; margin: 0 0 14px; }
        .euc-items { display: grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 640px) { .euc-items { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .euc-items { grid-template-columns: repeat(3, 1fr); } }
        .euc-item { display: block; text-decoration: none; border: 1px solid #E6E1D6; border-radius: 5px; padding: 16px 18px; background: #fff; transition: border-color .22s ease; }
        .euc-item:hover { border-color: #143A61; }
        .euc-item strong { display: block; font-family: 'Playfair Display', Georgia, serif; font-weight: 500; font-size: 1.1rem; color: #143A61; }
        .euc-item span { display: block; color: #5A5A5A; font-size: .9rem; margin-top: 5px; line-height: 1.45; }
        .euc-item em { display: block; font-style: normal; font-family: 'Barlow Condensed', sans-serif; letter-spacing: .08em; text-transform: uppercase; font-size: .7rem; color: #C9A83C; margin-top: 10px; }
        .euc-quick { display: grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 640px) { .euc-quick { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .euc-quick { grid-template-columns: repeat(4, 1fr); } }
        .euc-pop { display: flex; flex-wrap: wrap; gap: 8px; }
        .euc-pop button { border: 1px solid #D8D2C6; background: #fff; border-radius: 999px; padding: 9px 16px; color: #5A5A5A; font-weight: 600; font-size: .88rem; cursor: pointer; transition: border-color .2s ease, color .2s ease; }
        .euc-pop button:hover { border-color: #C9A83C; color: #143A61; }
        .euc-help { text-align: center; background: linear-gradient(150deg, #0C2340, #143A61); color: #fff; border-radius: 8px; padding: 44px 24px; }
        .euc-help h2 { font-family: 'Playfair Display', Georgia, serif; font-weight: 600; font-size: 1.7rem; margin: 0 0 8px; color: #fff; }
        .euc-help p { color: rgba(255,255,255,.72); margin: 0 auto 20px; max-width: 46ch; }
        .euc-help a { display: inline-flex; align-items: center; gap: 8px; background: #E05A20; color: #fff; text-decoration: none; font-weight: 600; border-radius: 9px; padding: 13px 26px; }
        .euc-nada { color: #5A5A5A; font-size: 1rem; }
      `}</style>

      <header className="euc-hero">
        <p className="eyebrow">Plan10 em um clique</p>
        <h1>Encontre por solução, tema ou necessidade</h1>
        <p>Um índice rápido de todo o ecossistema Plan10, do jeito que você procura.</p>
        <form className="euc-search" onSubmit={(e) => e.preventDefault()} role="search">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Saúde, casa, empresa, carro, crédito, viagem, pet..."
            aria-label="Buscar por tema ou necessidade"
          />
          <span className="ico" aria-hidden>Buscar</span>
        </form>
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
    </div>
  );
}
