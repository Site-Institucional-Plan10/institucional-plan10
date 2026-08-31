import { Link } from "@tanstack/react-router";
import { solucoesOnline } from "@/data/solucoesOnline";

/**
 * Home, "Soluções online" compacta: só os destaques em linhas premium (sem cards
 * de caixa), com contratação direta. A lista completa vive em /solucoes-online.
 * Conteúdo: 03_SOLUCOES_ONLINE.xlsx (colunas C e D).
 */
const total = solucoesOnline.length;

export function SolucoesOnline() {
  const destaques = solucoesOnline.filter((s) => s.destaque);
  return (
    <section className="so" aria-labelledby="so-h">
      <style>{`
        .so { background: #FFFFFF; color: #0B1A2F; padding: 84px 24px; font-family: 'Inter', system-ui, sans-serif; }
        .so-in { max-width: 1080px; margin: 0 auto; }
        .so-eyebrow { font-family: 'JetBrains Mono', ui-monospace, monospace; font-weight: 500; font-size: .7rem; letter-spacing: .3em; text-transform: uppercase; color: #9A7B23; margin: 0 0 16px; display: inline-flex; align-items: center; gap: 12px; }
        .so-eyebrow::before { content: ""; width: 26px; height: 1px; background: #B08D57; }
        .so-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 20px; }
        .so-h2 { font-family: 'Schibsted Grotesk','Inter',sans-serif; font-weight: 600; font-size: clamp(1.7rem, 3.2vw, 2.4rem); line-height: 1.1; letter-spacing: -.025em; color: #0E2438; margin: 0; max-width: 20ch; }
        .so-lede { font-size: 1.02rem; line-height: 1.6; color: #5B6472; margin: 16px 0 0; max-width: 60ch; }
        .so-list { margin-top: 40px; border-top: 1px solid #E6E1D6; }
        .so-row { --c: #9A7B23; display: grid; grid-template-columns: 1.1fr 1.4fr auto; align-items: center; gap: 24px; padding: 22px 12px 22px 6px; border-bottom: 1px solid #E6E1D6; text-decoration: none; color: #0B1A2F; position: relative; transition: background .24s ease, padding-left .24s ease; }
        .so-row::before { content:""; position:absolute; left:0; top:50%; transform:translateY(-50%); width:3px; height:0; background:var(--c); border-radius:3px; transition:height .24s ease; }
        .so-row:hover { background: #FAF8F3; padding-left: 16px; }
        .so-row:hover::before { height: 58%; }
        .so-nm { font-family: 'Schibsted Grotesk','Inter',sans-serif; font-weight: 600; font-size: 1.16rem; letter-spacing: -.015em; color: #0E2438; }
        .so-cat { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: .6rem; letter-spacing: .12em; text-transform: uppercase; color: #9AA1AC; display: block; margin-top: 4px; }
        .so-desc { font-size: .92rem; line-height: 1.5; color: #5B6472; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .so-cta { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: .68rem; letter-spacing: .1em; text-transform: uppercase; color: var(--c); display: inline-flex; align-items: center; gap: 7px; white-space: nowrap; }
        .so-row svg { transition: transform .2s ease; }
        .so-row:hover svg { transform: translateX(3px); }
        .so-foot { margin-top: 34px; }
        .so-all { display: inline-flex; align-items: center; gap: 10px; background: #0E2438; color: #F1EFEA; text-decoration: none; font-weight: 600; font-size: .96rem; padding: 14px 26px; border-radius: 999px; transition: background .2s ease, transform .2s ease; }
        .so-all:hover { background: #14324e; transform: translateY(-2px); }
        .so-all svg { transition: transform .2s ease; }
        .so-all:hover svg { transform: translateX(3px); }
        @media (max-width: 780px) {
          .so { padding: 60px 20px; }
          .so-row { grid-template-columns: 1fr auto; gap: 6px 14px; padding: 18px 6px; }
          .so-desc { grid-column: 1 / 3; }
          .so-cta { grid-column: 1 / 3; }
        }
      `}</style>
      <div className="so-in">
        <div className="so-head">
          <div>
            <p className="so-eyebrow">Soluções online</p>
            <h2 id="so-h" className="so-h2">Soluções digitais e caminhos de atendimento</h2>
          </div>
        </div>
        <p className="so-lede">
          A Plan10 organiza opções digitais para quem busca praticidade com clareza. Algumas seguem direto para contratação online; outras pedem orientação antes de decidir.
        </p>

        <div className="so-list">
          {destaques.map((s) => (
            <a key={s.nome} href={s.link} target="_blank" rel="noopener noreferrer" className="so-row">
              <span><span className="so-nm">{s.nome}</span><span className="so-cat">{s.categoria}</span></span>
              <span className="so-desc">{s.descricao}</span>
              <span className="so-cta">Contratar<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
            </a>
          ))}
        </div>

        <div className="so-foot">
          <Link to="/solucoes-online" className="so-all">
            Ver todas as {total} soluções online
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
