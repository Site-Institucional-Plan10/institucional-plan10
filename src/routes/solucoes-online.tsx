import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { solucoesOnline, categoriasOnline } from "@/data/solucoesOnline";
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/solucoes-online")({
  head: () => ({
    meta: [
      { title: "Soluções online | Contratação digital e orientação | Plan10" },
      { name: "description", content: "Contrate soluções digitais da Plan10 direto pelo link, ou peça orientação quando a decisão pedir contexto. Filtre por necessidade." },
      { property: "og:title", content: "Soluções online Plan10" },
      { property: "og:description", content: "Soluções digitais e caminhos de atendimento." },
      { property: "og:url", content: canonical("/solucoes-online") },
    ],
    links: [{ rel: "canonical", href: canonical("/solucoes-online") }],
  }),
  component: SolucoesOnlinePage,
});

function Linha({ s }: { s: (typeof solucoesOnline)[number] }) {
  const inner = (
    <>
      <span><span className="sol-nm">{s.nome}</span><span className="sol-cat">{s.categoria}</span></span>
      <span className="sol-desc">{s.descricao}</span>
      <span className="sol-cta">{s.kind === "online" ? "Contratar" : "Orientação"}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </span>
    </>
  );
  return s.kind === "online" ? (
    <a href={s.link} target="_blank" rel="noopener noreferrer" className="sol-row on">{inner}</a>
  ) : (
    <Link to="/fale-conosco" className="sol-row cons">{inner}</Link>
  );
}

function SolucoesOnlinePage() {
  const [cat, setCat] = useState<string>("Todas");
  const grupos = useMemo(() => {
    const cats = cat === "Todas" ? categoriasOnline : [cat];
    return cats
      .map((c) => ({ cat: c, itens: solucoesOnline.filter((s) => s.categoria === c) }))
      .filter((g) => g.itens.length > 0);
  }, [cat]);

  return (
    <div className="solp">
      <style>{`
        .solp { background: #F6F4EF; color: #0B1A2F; font-family: 'Inter', system-ui, sans-serif; }
        .solp-hero { background: linear-gradient(150deg, #0E2438 0%, #0B1D2E 100%); color: #F1EFEA; padding: 132px 24px 60px; }
        .solp-hero-in { max-width: 1080px; margin: 0 auto; }
        .solp-eyebrow { font-family: 'JetBrains Mono', ui-monospace, monospace; font-weight: 500; font-size: .7rem; letter-spacing: .32em; text-transform: uppercase; color: rgba(241,239,234,.6); margin: 0 0 20px; display: inline-flex; align-items: center; gap: 12px; }
        .solp-eyebrow::before { content: ""; width: 26px; height: 1px; background: #B08D57; }
        .solp-h1 { font-family: 'Schibsted Grotesk','Inter',sans-serif; font-weight: 500; font-size: clamp(2rem, 4.4vw, 3.2rem); line-height: 1.1; letter-spacing: -.028em; margin: 0; max-width: 20ch; }
        .solp-lede { font-size: 1.08rem; line-height: 1.6; color: rgba(241,239,234,.76); margin: 22px 0 0; max-width: 56ch; }
        .solp-body { max-width: 1080px; margin: 0 auto; padding: 40px 24px 96px; }
        .solp-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; position: sticky; top: 78px; background: #F6F4EF; padding: 16px 0; z-index: 20; }
        .solp-chip { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: .66rem; letter-spacing: .08em; text-transform: uppercase; padding: 8px 14px; border-radius: 999px; border: 1px solid #E0DBD0; background: transparent; color: #5B6472; cursor: pointer; transition: border-color .2s, color .2s, background .2s; }
        .solp-chip:hover { border-color: #B08D57; color: #0E2438; }
        .solp-chip[aria-pressed="true"] { background: #0E2438; border-color: #0E2438; color: #F1EFEA; }
        .solp-group { margin-top: 34px; }
        .solp-group-h { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: .72rem; letter-spacing: .16em; text-transform: uppercase; color: #9A7B23; margin: 0 0 4px; }
        .solp-list { border-top: 1px solid #E2DDD3; }
        .sol-row { --c: #9A7B23; display: grid; grid-template-columns: 1.1fr 1.5fr auto; align-items: center; gap: 24px; padding: 22px 12px 22px 6px; border-bottom: 1px solid #E2DDD3; text-decoration: none; color: #0B1A2F; position: relative; transition: background .24s ease, padding-left .24s ease; }
        .sol-row.cons { --c: #3E6488; }
        .sol-row::before { content:""; position:absolute; left:0; top:50%; transform:translateY(-50%); width:3px; height:0; background:var(--c); border-radius:3px; transition:height .24s ease; }
        .sol-row:hover { background: #FBFAF6; padding-left: 16px; }
        .sol-row:hover::before { height: 58%; }
        .sol-nm { font-family: 'Schibsted Grotesk','Inter',sans-serif; font-weight: 600; font-size: 1.14rem; letter-spacing: -.015em; color: #0E2438; }
        .sol-cat { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: .58rem; letter-spacing: .12em; text-transform: uppercase; color: #9AA1AC; display: block; margin-top: 4px; }
        .sol-desc { font-size: .92rem; line-height: 1.5; color: #5B6472; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .sol-cta { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: .66rem; letter-spacing: .1em; text-transform: uppercase; color: var(--c); display: inline-flex; align-items: center; gap: 7px; white-space: nowrap; }
        .sol-row svg { transition: transform .2s ease; }
        .sol-row:hover svg { transform: translateX(3px); }
        @media (max-width: 780px) {
          .solp-hero { padding: 108px 20px 48px; }
          .solp-filters { top: 70px; }
          .sol-row { grid-template-columns: 1fr auto; gap: 6px 14px; padding: 18px 6px; }
          .sol-desc { grid-column: 1 / 3; }
          .sol-cta { grid-column: 1 / 3; }
        }
      `}</style>

      <header className="solp-hero">
        <div className="solp-hero-in">
          <p className="solp-eyebrow">Soluções online</p>
          <h1 className="solp-h1">Soluções digitais e caminhos de atendimento</h1>
          <p className="solp-lede">
            Algumas soluções são simples e seguem direto para contratação online. Outras pedem objetivo, cobertura, prazo ou uso, e a Plan10 ajuda a escolher o melhor caminho antes de decidir.
          </p>
        </div>
      </header>

      <div className="solp-body">
        <div className="solp-filters" role="group" aria-label="Filtrar por necessidade">
          {["Todas", ...categoriasOnline].map((c) => (
            <button key={c} type="button" className="solp-chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>

        {grupos.map((g) => (
          <section key={g.cat} className="solp-group">
            <p className="solp-group-h">{g.cat}</p>
            <div className="solp-list">
              {g.itens.map((s) => <Linha key={s.nome} s={s} />)}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
