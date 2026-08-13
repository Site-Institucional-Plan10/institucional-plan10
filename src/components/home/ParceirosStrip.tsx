/**
 * Home, faixa enxuta de parceiros, DS v3.1 (mockup validado).
 * Números e depoimentos vivem em Quem Somos (pedido do cliente).
 */
const parceiros = [
  "Porto", "Bradesco Seguros", "SulAmérica", "MAPFRE",
  "Allianz", "Amil", "Hapvida", "Porto Bank",
];

export function ParceirosStrip() {
  return (
    <section className="pt-sec" aria-labelledby="pt-title">
      <style>{`
        .pt-sec {
          background: #F7F5F2;
          padding: 64px 20px;
          text-align: center;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .pt-wrap { max-width: 1000px; margin: 0 auto; }
        .pt-eyebrow {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600; font-size: .78rem;
          letter-spacing: .22em; text-transform: uppercase;
          color: #C9A83C; margin: 0;
        }
        .pt-h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 500; font-size: clamp(1.6rem, 3vw, 2rem);
          color: #143A61; margin: 12px 0 24px;
        }
        .pt-names {
          font-family: 'Barlow Condensed', sans-serif;
          letter-spacing: .14em; text-transform: uppercase;
          color: #5A5A5A; font-size: .94rem; line-height: 2.4;
        }
        .pt-names span { white-space: nowrap; }
        .pt-names .sep { color: #C9A83C; margin: 0 10px; }
      `}</style>
      <div className="pt-wrap">
        <p className="pt-eyebrow">Parceiros</p>
        <h2 id="pt-title" className="pt-h2">Empresas que confiam no nosso trabalho</h2>
        <div className="pt-names">
          {parceiros.map((p, i) => (
            <span key={p}>
              {p}
              {i < parceiros.length - 1 && <span className="sep">·</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
