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
          background: #FFFFFF;
          padding: 64px 24px;
          text-align: center;
          font-family: 'Inter', system-ui, sans-serif;
          border-top: 1px solid #ECE9E1;
        }
        .pt-wrap { max-width: 1000px; margin: 0 auto; }
        .pt-eyebrow {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-weight: 500; font-size: .7rem;
          letter-spacing: .3em; text-transform: uppercase;
          color: #9A7B23; margin: 0 0 14px;
        }
        .pt-h2 {
          font-family: 'Schibsted Grotesk', 'Inter', sans-serif;
          font-weight: 600; font-size: clamp(1.4rem, 2.6vw, 1.9rem);
          letter-spacing: -.02em; color: #0E2438; margin: 0 0 26px;
        }
        .pt-names {
          display: flex; flex-wrap: wrap;
          align-items: center; justify-content: center;
          gap: 14px 28px;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          letter-spacing: .06em;
          color: #7A8290; font-size: .82rem;
        }
        .pt-names .nm { white-space: nowrap; position: relative; }
        .pt-names .nm:not(:last-child)::after {
          content: ''; width: 4px; height: 4px; border-radius: 999px; background: #CBB27A;
          position: absolute; right: -16px; top: 50%; transform: translateY(-50%);
        }
      `}</style>
      <div className="pt-wrap">
        <p className="pt-eyebrow">Parceiros</p>
        <h2 id="pt-title" className="pt-h2">Empresas que confiam no nosso trabalho</h2>
        <div className="pt-names">
          {parceiros.map((p) => (
            <span key={p} className="nm">{p}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
