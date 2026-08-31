import { Link } from "@tanstack/react-router";

/**
 * Home hero, premium e compacto. Foto de veleiro ao fundo sob camada navy
 * (texto à esquerda, veleiro revelado à direita). Um único acento dourado.
 * Conteúdo oficial: 01_HOME.xlsx, coluna D.
 */
export function PremiumHero() {
  return (
    <section className="ph2" aria-labelledby="ph2-title">
      <style>{`
        .ph2 {
          position: relative; overflow: hidden;
          background:
            linear-gradient(100deg, rgba(9,23,38,.97) 0%, rgba(11,28,45,.92) 38%, rgba(11,28,45,.66) 70%, rgba(11,28,45,.46) 100%),
            url('/assets/banners/veleiro-hero.jpg');
          background-size: cover;
          background-position: center 42%;
          color: #F1EFEA;
          font-family: 'Inter', system-ui, sans-serif;
          padding: 132px 24px 80px;
          isolation: isolate;
        }
        .ph2::before {
          content: ""; position: absolute; inset: 0; z-index: -1;
          background: radial-gradient(60% 80% at 15% 18%, rgba(20,44,66,.5) 0%, transparent 60%);
        }
        .ph2-in { max-width: 1080px; margin: 0 auto; position: relative; }
        .ph2-eyebrow {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-weight: 500; font-size: .68rem;
          letter-spacing: .34em; text-transform: uppercase;
          color: rgba(241,239,234,.6); margin: 0 0 22px;
          display: inline-flex; align-items: center; gap: 14px;
        }
        .ph2-eyebrow::before { content: ""; width: 28px; height: 1px; background: #C6A24A; display: inline-block; }
        .ph2-h1 {
          font-family: 'Schibsted Grotesk', 'Inter', sans-serif;
          font-weight: 500;
          font-size: clamp(2.1rem, 4.8vw, 3.7rem);
          line-height: 1.1; letter-spacing: -.028em;
          margin: 0; max-width: 18ch; color: #F1EFEA;
          text-wrap: balance; text-shadow: 0 2px 30px rgba(6,18,30,.4);
        }
        .ph2-h1 .accent { color: #D8B879; font-weight: 600; font-style: italic; }
        .ph2-lede {
          font-size: clamp(1rem, 1.4vw, 1.18rem);
          line-height: 1.6; color: rgba(241,239,234,.76);
          max-width: 42ch; margin: 24px 0 0; font-weight: 400;
          text-shadow: 0 1px 16px rgba(6,18,30,.35);
        }
        .ph2-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 34px; }
        .ph2-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 27px; border-radius: 999px;
          font-weight: 600; font-size: .98rem; text-decoration: none;
          transition: transform .2s ease, background .2s ease, border-color .2s ease;
        }
        .ph2-btn-p { background: #C6A24A; color: #0E2438; }
        .ph2-btn-p:hover { background: #D8B879; transform: translateY(-2px); }
        .ph2-btn-s { color: #F1EFEA; border: 1px solid rgba(241,239,234,.32); backdrop-filter: blur(3px); }
        .ph2-btn-s:hover { border-color: rgba(241,239,234,.7); transform: translateY(-2px); }
        .ph2-btn-s svg { transition: transform .2s ease; }
        .ph2-btn-s:hover svg { transform: translateX(3px); }
        .ph2-strip {
          max-width: 1080px; margin: 52px auto 0; position: relative;
          display: flex; flex-wrap: wrap; gap: 12px 36px;
          padding-top: 22px; border-top: 1px solid rgba(241,239,234,.14);
        }
        .ph2-strip span {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: .7rem; letter-spacing: .06em; text-transform: uppercase;
          color: rgba(241,239,234,.62);
          display: inline-flex; align-items: center; gap: 9px;
        }
        .ph2-strip span::before { content: ""; width: 4px; height: 4px; border-radius: 999px; background: #C6A24A; }
        @media (max-width: 720px) {
          .ph2 {
            background:
              linear-gradient(178deg, rgba(12,31,49,.82) 0%, rgba(13,33,52,.9) 55%, rgba(12,31,49,.96) 100%),
              url('/assets/banners/veleiro-hero.jpg');
            background-position: center;
            padding: 104px 20px 52px;
          }
          .ph2-strip { gap: 10px 22px; margin-top: 40px; }
        }
        @media (prefers-reduced-motion: reduce) { .ph2-btn:hover { transform: none; } }
      `}</style>

      <div className="ph2-in">
        <p className="ph2-eyebrow">Consultoria · Aconselhamento · Proteção</p>
        <h1 id="ph2-title" className="ph2-h1">
          Cuidado, proteção, finanças, crescimento e assistência <span className="accent">conectados</span> para cada fase da vida e dos negócios.
        </h1>
        <p className="ph2-lede">
          A Plan10 conecta soluções em uma jornada consultiva orientada ao seu momento.
        </p>
        <div className="ph2-ctas">
          <Link to="/solucoes" className="ph2-btn ph2-btn-p">Explorar soluções</Link>
          <a href="#contato" className="ph2-btn ph2-btn-s">
            Falar com consultor
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </div>

      <div className="ph2-strip">
        <span>Diagnóstico antes da recomendação</span>
        <span>Curadoria de caminhos</span>
        <span>Visão integrada</span>
        <span>Acompanhamento ao longo do tempo</span>
      </div>
    </section>
  );
}
