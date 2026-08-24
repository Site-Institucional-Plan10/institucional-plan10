import { Link } from "@tanstack/react-router";

/**
 * Home hero, editorial DS v3.1 (mockup premium validado 12/08/2026).
 * Banner náutico da marca sob camada navy, título em Playfair com o
 * benefício em destaque, os 4Cs da marca.
 */
export function PremiumHero() {
  return (
    <section className="ph-hero" aria-labelledby="ph-hero-title">
      <style>{`
        .ph-hero {
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(96deg, rgba(9,26,49,.95) 0%, rgba(10,30,55,.86) 42%, rgba(15,45,78,.55) 78%, rgba(20,58,97,.32) 100%),
            url('/assets/banners/hero-home-1.png');
          background-size: cover;
          background-position: center right;
          color: #fff;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .ph-in {
          position: relative; z-index: 1;
          max-width: 1180px; margin: 0 auto;
          padding: 148px 20px 120px;
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
          color: #fff;
          font-size: clamp(2.9rem, 6.6vw, 4.6rem);
          line-height: 1.08; letter-spacing: -.015em;
          margin: 20px 0 24px; max-width: 16ch;
          text-shadow: 0 2px 26px rgba(4,14,28,.45);
        }
        .ph-h1 .ph-accent {
          display: block;
          font-style: italic;
          color: #E8CA6A;
        }
        .ph-lede {
          font-size: clamp(1.05rem, 2vw, 1.24rem);
          line-height: 1.6; color: rgba(255,255,255,.82);
          max-width: 50ch; margin: 0;
          text-shadow: 0 1px 16px rgba(4,14,28,.4);
        }
        .ph-ctas { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 40px; }
        .ph-btn {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 15px 28px; border-radius: 9px;
          font-weight: 600; font-size: .98rem; text-decoration: none;
          transition: background .22s ease, border-color .22s ease, transform .22s ease;
        }
        .ph-btn-p { background: #E05A20; color: #fff; box-shadow: 0 10px 30px rgba(224,90,32,.28); }
        .ph-btn-p:hover { background: #C94D17; transform: translateY(-1px); }
        .ph-btn-o { border: 1.5px solid rgba(255,255,255,.5); color: #fff; backdrop-filter: blur(2px); }
        .ph-btn-o:hover { border-color: #fff; }
        @media (max-width: 720px) {
          .ph-hero {
            background:
              linear-gradient(178deg, rgba(9,26,49,.9) 0%, rgba(10,30,55,.8) 45%, rgba(15,45,78,.6) 100%),
              url('/assets/banners/hero-home-1.png');
            background-position: center;
          }
          .ph-in { padding: 116px 20px 84px; }
        }
      `}</style>
      <div className="ph-in">
        <div className="ph-gold" />
        <p className="ph-eyebrow">Consultoria de proteção e planejamento</p>
        <h1 id="ph-hero-title" className="ph-h1">
          Seu futuro
          <span className="ph-accent">muito mais tranquilo.</span>
        </h1>
        <p className="ph-lede">
          A Plan10 organiza proteção, saúde e planejamento com clareza e critério, para pessoas,
          famílias e empresas que valorizam decisões bem tomadas.
        </p>
        <div className="ph-ctas">
          <a href="#contato" className="ph-btn ph-btn-p">Falar com um consultor</a>
          <Link to="/solucoes" className="ph-btn ph-btn-o">Conhecer as soluções</Link>
        </div>
      </div>
    </section>
  );
}
