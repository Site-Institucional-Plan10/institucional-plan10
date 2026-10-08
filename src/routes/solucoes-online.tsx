import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { solucoesOnline, categoriasOnline } from "@/data/solucoesOnline";
import { canonical } from "@/lib/seo";
import { PageTheme, PALETTES } from "@/components/plan10/PageTheme";

export const Route = createFileRoute("/solucoes-online")({
  head: () => ({
    meta: [
      { title: "Soluções online | Contratação digital e orientação | Plan10" },
      { name: "description", content: "Contrate soluções digitais da Plan10 direto pelo link, ou peça orientação quando a decisão pedir contexto. Filtre por necessidade." },
      { property: "og:title", content: "Soluções online Plan10" },
      { property: "og:description", content: "Contrate online as soluções com acesso digital." },
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
      {/* os dois rótulos que o Carlos definiu para a variação do CTA */}
      <span className="sol-cta">{s.kind === "online" ? "Contratar online" : "Solicitar cotação"}
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
    <PageTheme palette={PALETTES.institucional}>
      <style>{`
        .solp-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 4px; position: sticky; top: 78px; background: var(--c1); padding: 16px 0; z-index: 20; }
        .solp-chip { font-family: var(--fb); font-size: 0.8rem; letter-spacing: .06em; text-transform: uppercase; padding: 9px 16px; border-radius: 999px; border: 1px solid var(--c2); background: transparent; color: var(--ctxt); cursor: pointer; transition: border-color .2s, color .2s, background .2s; }
        .solp-chip:hover { border-color: var(--gold); color: var(--preto); }
        .solp-chip[aria-pressed="true"] { background: var(--preto); border-color: var(--preto); color: #F1EFEA; }
        .solp-group { margin-top: 34px; }
        .solp-group-h { font-family: var(--fl); font-weight: 500; font-size: 0.78rem; letter-spacing: .14em; text-transform: uppercase; color: var(--gold-dk, #866719); margin: 0 0 4px; }
        .solp-list { border-top: 1px solid var(--c2); }
        .sol-row { --c: var(--gold-dk, #866719); display: grid; grid-template-columns: 1.1fr 1.5fr auto; align-items: center; gap: 24px; padding: 22px 12px 22px 6px; border-bottom: 1px solid var(--c2); text-decoration: none; color: var(--preto); position: relative; transition: background .24s ease, padding-left .24s ease; }
        .sol-row.cons { --c: var(--vp); }
        .sol-row::before { content:""; position:absolute; left:0; top:50%; transform:translateY(-50%); width:3px; height:0; background:var(--c); border-radius:3px; transition:height .24s ease; }
        .sol-row:hover { background: var(--vs); padding-left: 16px; }
        .sol-row:hover::before { height: 58%; }
        .sol-nm { font-family: var(--fd); font-weight: 600; font-size: 1.14rem; letter-spacing: -.015em; color: var(--preto); }
        .sol-cat { font-family: var(--fl); font-size: 0.66rem; letter-spacing: .12em; text-transform: uppercase; color: var(--ctxt); display: block; margin-top: 4px; opacity: .8; }
        .sol-desc { font-family: var(--fb); font-size: .95rem; line-height: 1.5; color: var(--ctxt); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .sol-cta { font-family: var(--fl); font-size: 0.74rem; letter-spacing: .1em; text-transform: uppercase; color: var(--c); display: inline-flex; align-items: center; gap: 7px; white-space: nowrap; }
        .sol-row svg { display: inline; transition: transform .2s ease; }
        .sol-row:hover svg { transform: translateX(3px); }
        @media (max-width: 780px) {
          .solp-filters { top: 70px; }
          .sol-row { grid-template-columns: 1fr auto; gap: 6px 14px; padding: 18px 6px; }
          .sol-desc { grid-column: 1 / 3; }
          .sol-cta { grid-column: 1 / 3; }
        }
      `}</style>

      <header className="p10-hero">
        <div className="p10-hero-inner">
          <p className="eyebrow">Soluções online</p>
          <h1>Contrate online</h1>
          <p className="lede">
            Algumas soluções são simples e seguem direto para contratação online. Outras pedem objetivo, cobertura, prazo ou uso, e a Plan10 ajuda a escolher o melhor caminho antes de decidir.
          </p>
        </div>
      </header>

      <div className="sec">
        <div className="wrap">
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
    </PageTheme>
  );
}
