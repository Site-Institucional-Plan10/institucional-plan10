import { Link } from "@tanstack/react-router";
import { solutions } from "@/data/solutions";
import { paletteFor, logoFor } from "@/components/plan10/PageTheme";

/**
 * Home section presenting the 5 Plan10 Soluções, editorial DS v3.1 style,
 * on a creme background. Positioned inside the marketing home page.
 */
export function SolutionsShowcase() {
  return (
    <section
      style={{
        background: "#F7F5F2",
        padding: "112px 20px",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: "#1A1A1A",
      }}
      aria-labelledby="solucoes-plan10-heading"
    >
      <style>{`
        .p10ss-wrap { max-width: 1180px; margin: 0 auto; }
        .p10ss-head { max-width: 760px; }
        .p10ss-eyebrow {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600;
          font-size: .78rem;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: #C9A83C;
          margin: 0;
        }
        .p10ss-h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 500;
          font-size: clamp(2rem, 4.2vw, 3.25rem);
          line-height: 1.12;
          letter-spacing: -.01em;
          color: #1A1A1A;
          margin: 18px 0 0;
        }
        .p10ss-lede {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1.05rem;
          line-height: 1.7;
          color: #4A4A4A;
          margin: 18px 0 0;
          max-width: 620px;
        }
        .p10ss-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-top: 56px;
        }
        @media (min-width: 720px) { .p10ss-grid { grid-template-columns: repeat(2, minmax(0,1fr)); gap: 24px; } }
        @media (min-width: 1024px) { .p10ss-grid { grid-template-columns: repeat(3, minmax(0,1fr)); } }
        .p10ss-card {
          background: #FFFFFF;
          border: 1px solid #E8E4DD;
          border-radius: 6px;
          padding: 32px 28px 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-height: 260px;
          text-decoration: none;
          color: #1A1A1A;
          position: relative;
          transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease;
        }
        .p10ss-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--p10ss-vp, #C9A83C);
          border-radius: 6px 6px 0 0;
        }
        .p10ss-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 40px -20px rgba(0,0,0,.18);
          border-color: #D6D0C6;
        }
        .p10ss-card-logo {
          height: 44px;
          width: auto;
          max-width: 190px;
          object-fit: contain;
          object-position: left center;
          margin-bottom: 4px;
        }
        .p10ss-card h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 500;
          font-size: 1.4rem;
          line-height: 1.22;
          margin: 6px 0 0;
          color: #1A1A1A;
          letter-spacing: -.005em;
        }
        .p10ss-card p {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: .95rem;
          line-height: 1.6;
          color: #4A4A4A;
          margin: 0;
        }
        .p10ss-card .arrow {
          margin-top: auto;
          padding-top: 10px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: .78rem;
          letter-spacing: .16em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--p10ss-vp, #C9A83C);
        }
        .p10ss-eye-solucao {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600;
          font-size: .72rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: #8A8478;
          margin: 0;
        }
        .p10ss-footer {
          margin-top: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .p10ss-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 6px 2px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600;
          font-size: .95rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          background: transparent;
          color: #1A1A1A;
          border: none;
          border-bottom: 1px solid #1A1A1A;
          text-decoration: none;
          transition: color .22s ease, border-color .22s ease, gap .22s ease;
        }
        .p10ss-cta:hover { color: #C9A83C; border-color: #C9A83C; gap: 14px; }
        @media (max-width: 767px) {
          .p10ss-card { min-height: 0; padding: 26px 22px 22px; }
          .p10ss-card h3 { font-size: 1.25rem; }
        }
      `}</style>
      <div className="p10ss-wrap">
        <div className="p10ss-head">
          <p className="p10ss-eyebrow">As Soluções Plan10</p>
          <h2 id="solucoes-plan10-heading" className="p10ss-h2">
            Cinco caminhos para organizar proteção, saúde e planejamento
          </h2>
          <p className="p10ss-lede">
            Cada solução reúne caminhos e modalidades organizados com critério para pessoas,
            famílias e empresas. Escolha o ponto de partida.
          </p>
        </div>

        <div className="p10ss-grid">
          {solutions.map((s) => {
            const p = paletteFor(s.slug);
            const logo = logoFor(s.slug);
            const vars = { ["--p10ss-vp" as string]: p.vp } as React.CSSProperties;
            return (
              <Link
                key={s.slug}
                to="/solucoes/$solucao"
                params={{ solucao: s.slug }}
                className="p10ss-card"
                style={vars}
              >
                {logo && <img src={logo} alt={`Logo ${s.nome}`} className="p10ss-card-logo" />}
                <p className="p10ss-eye-solucao">Solução</p>
                <h3>{s.nome}</h3>
                <p>{s.subHero}</p>
                <span className="arrow">Conhecer →</span>
              </Link>
            );
          })}
        </div>

        <div className="p10ss-footer">
          <Link to="/solucoes" className="p10ss-cta">
            Ver todas as soluções →
          </Link>
        </div>
      </div>
    </section>
  );
}
