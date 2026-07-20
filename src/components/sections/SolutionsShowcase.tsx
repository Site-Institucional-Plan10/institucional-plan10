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
        padding: "72px 20px",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: "#1A1A1A",
      }}
      aria-labelledby="solucoes-plan10-heading"
    >
      <style>{`
        @keyframes p10ssFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .p10ss-wrap { max-width: 1100px; margin: 0 auto; }
        .p10ss-eyebrow {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600;
          font-size: .78rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: #C9A83C;
          margin: 0;
        }
        .p10ss-h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 500;
          font-size: clamp(1.6rem, 3vw, 2.35rem);
          line-height: 1.2;
          letter-spacing: -.005em;
          color: #1A1A1A;
          margin: 10px 0 0;
          max-width: 720px;
        }
        .p10ss-lede {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1.02rem;
          line-height: 1.65;
          color: #5A5A5A;
          margin: 12px 0 0;
          max-width: 680px;
        }
        .p10ss-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-top: 36px;
        }
        @media (min-width: 640px) { .p10ss-grid { grid-template-columns: repeat(2, minmax(0,1fr)); } }
        @media (min-width: 1024px) { .p10ss-grid { grid-template-columns: repeat(3, minmax(0,1fr)); } }
        .p10ss-card {
          background: #fff;
          border: 1px solid #E2E2E2;
          border-radius: 12px;
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 200px;
          text-decoration: none;
          color: #1A1A1A;
          border-top: 3px solid var(--p10ss-vp, #C9A83C);
          box-shadow: 0 2px 14px rgba(0,0,0,.06);
          transition: transform .22s ease, box-shadow .22s ease;
        }
        .p10ss-card:hover { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(0,0,0,.10); }
        .p10ss-card-logo {
          height: 40px;
          width: auto;
          max-width: 170px;
          object-fit: contain;
          object-position: left center;
          margin-bottom: 6px;
        }
        .p10ss-card h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 500;
          font-size: 1.25rem;
          line-height: 1.22;
          margin: 4px 0 0;
          color: #1A1A1A;
        }
        .p10ss-card p {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: .93rem;
          line-height: 1.55;
          color: #5A5A5A;
          margin: 0;
        }
        .p10ss-card .arrow {
          margin-top: auto;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: .74rem;
          letter-spacing: .12em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--p10ss-vp, #C9A83C);
        }
        .p10ss-eye-solucao {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600;
          font-size: .72rem;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--p10ss-vp, #C9A83C);
          margin: 0;
        }
        .p10ss-cta {
          margin-top: 32px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          border-radius: 8px;
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 700;
          font-size: .88rem;
          background: transparent;
          color: #1C4E80;
          border: 1px solid #1C4E80;
          text-decoration: none;
          transition: background .22s ease, color .22s ease;
        }
        .p10ss-cta:hover { background: #1C4E80; color: #fff; }
      `}</style>
      <div className="p10ss-wrap">
        <p className="p10ss-eyebrow">As Soluções Plan10</p>
        <h2 id="solucoes-plan10-heading" className="p10ss-h2">
          Cinco caminhos para organizar proteção, saúde e planejamento
        </h2>
        <p className="p10ss-lede">
          Cada solução reúne caminhos e modalidades organizados com critério para pessoas, famílias
          e empresas. Escolha o ponto de partida.
        </p>

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

        <Link to="/solucoes" className="p10ss-cta">
          Ver todas as Soluções →
        </Link>
      </div>
    </section>
  );
}
