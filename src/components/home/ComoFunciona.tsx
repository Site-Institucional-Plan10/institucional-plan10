/**
 * Home, o processo consultivo em 5 passos, DS v3.1.
 * Linguagem dentro da régua premium (sem "comparação" nem "cotação").
 */
const passos = [
  { t: "Entendimento do seu cenário", d: "Conversamos para mapear o que o seu momento pede." },
  { t: "Análise das opções adequadas", d: "Avaliamos as alternativas que fazem sentido para o seu perfil." },
  { t: "Recomendação com critério", d: "Apresentamos o caminho mais adequado, com clareza em cada ponto." },
  { t: "Contratação acompanhada", d: "Conduzimos toda a documentação junto com você." },
  { t: "Acompanhamento contínuo", d: "Seguimos ao seu lado em renovações e no que surgir." },
];

export function ComoFunciona() {
  return (
    <section className="cf-sec" aria-labelledby="cf-title">
      <style>{`
        .cf-sec {
          background: #EFEBE4;
          padding: 88px 20px;
          font-family: 'Inter', system-ui, sans-serif;
          color: #1A1A1A;
        }
        .cf-wrap { max-width: 1180px; margin: 0 auto; }
        .cf-head { max-width: 660px; margin-bottom: 46px; }
        .cf-eyebrow {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600; font-size: .78rem;
          letter-spacing: .22em; text-transform: uppercase;
          color: #E05A20; margin: 0;
        }
        .cf-h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 500; font-size: clamp(1.9rem, 3.6vw, 2.6rem);
          line-height: 1.14; color: #143A61; margin: 12px 0 0;
        }
        .cf-grid {
          display: grid; grid-template-columns: 1fr; gap: 26px 20px;
        }
        @media (min-width: 640px) { .cf-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .cf-grid { grid-template-columns: repeat(5, 1fr); } }
        .cf-step .num {
          width: 38px; height: 38px; border-radius: 50%;
          background: #1C4E80; color: #fff;
          font-family: 'Playfair Display', Georgia, serif; font-weight: 600;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.05rem; margin-bottom: 16px;
        }
        .cf-step h3 {
          font-family: 'Playfair Display', Georgia, serif; font-weight: 500;
          font-size: 1.12rem; color: #143A61; margin: 0 0 7px; line-height: 1.25;
        }
        .cf-step p { font-size: .92rem; line-height: 1.6; color: #5A5A5A; margin: 0; }
      `}</style>
      <div className="cf-wrap">
        <div className="cf-head">
          <p className="cf-eyebrow">Como conduzimos</p>
          <h2 id="cf-title" className="cf-h2">Uma decisão orientada, do início ao fim</h2>
        </div>
        <div className="cf-grid">
          {passos.map((p, i) => (
            <div key={p.t} className="cf-step">
              <div className="num">{i + 1}</div>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
