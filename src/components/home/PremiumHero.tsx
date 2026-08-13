import { Link } from "@tanstack/react-router";

/**
 * Home hero, editorial DS v3.1 (mockup premium validado 12/08/2026).
 * Fundo navy em gradiente, título em Playfair, os 4Cs da marca.
 */
export function PremiumHero() {
  return (
    <section className="ph-hero" aria-labelledby="ph-hero-title">
      <style>{`
        .ph-hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(147deg, #0C2340 0%, #0F2E52 48%, #1C4E80 100%);
          color: #fff;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .ph-hero::after {
          content: '';
          position: absolute;
          right: -140px; top: -120px;
          width: 520px; height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,60,.20), transparent 62%);
          pointer-events: none;
        }
        .ph-in {
          position: relative; z-index: 1;
          max-width: 1180px; margin: 0 auto;
          padding: 96px 20px 104px;
        }
        .ph-gold { width: 56px; height: 3px; background: #C9A83C; margin-bottom: 22px; }
        .ph-eyebrow {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600; font-size: .8rem;
          letter-spacing: .22em; text-transform: uppercase;
          color: #E8CA6A; margin: 0;
        }
        .ph-h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 600;
          font-size: clamp(2.5rem, 6vw, 4rem);
          line-height: 1.12; letter-spacing: -.01em;
          margin: 20px 0 22px; max-width: 15ch;
        }
        .ph-lede {
          font-size: clamp(1.05rem, 2vw, 1.22rem);
          line-height: 1.6; color: rgba(255,255,255,.74);
          max-width: 52ch; margin: 0;
        }
        .ph-ctas { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 38px; }
        .ph-btn {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 14px 26px; border-radius: 9px;
          font-weight: 600; font-size: .98rem; text-decoration: none;
          transition: background .22s ease, border-color .22s ease;
        }
        .ph-btn-p { background: #E05A20; color: #fff; }
        .ph-btn-p:hover { background: #C94D17; }
        .ph-btn-o { border: 1.5px solid rgba(255,255,255,.42); color: #fff; }
        .ph-btn-o:hover { border-color: rgba(255,255,255,.8); }
        .ph-4c {
          display: flex; flex-wrap: wrap; gap: 26px;
          margin-top: 54px; padding-top: 26px;
          border-top: 1px solid rgba(255,255,255,.14);
        }
        .ph-4c span {
          font-family: 'Barlow Condensed', sans-serif;
          letter-spacing: .16em; text-transform: uppercase;
          font-size: .82rem; font-weight: 700; color: #E8CA6A;
        }
        @media (max-width: 720px) { .ph-in { padding: 64px 20px 72px; } }
      `}</style>
      <div className="ph-in">
        <div className="ph-gold" />
        <p className="ph-eyebrow">Consultoria de proteção e planejamento</p>
        <h1 id="ph-hero-title" className="ph-h1">Seu futuro muito mais tranquilo.</h1>
        <p className="ph-lede">
          A Plan10 organiza proteção, saúde e planejamento com clareza e critério, para pessoas,
          famílias e empresas que valorizam decisões bem tomadas.
        </p>
        <div className="ph-ctas">
          <a href="#contato" className="ph-btn ph-btn-p">Falar com um consultor</a>
          <Link to="/solucoes" className="ph-btn ph-btn-o">Conhecer as soluções</Link>
        </div>
        <div className="ph-4c">
          <span>Clareza</span>
          <span>Critério</span>
          <span>Cuidado</span>
          <span>Continuidade</span>
        </div>
      </div>
    </section>
  );
}
