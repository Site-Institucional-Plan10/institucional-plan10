/**
 * Bloco de valor da Home: beat premium e emocional logo após o hero.
 * Fundo fotográfico escuro (envelopes com lacre dourado, curadoria aprovada) sob
 * camada de leitura. Reforça a promessa consultiva antes da lista de soluções.
 */
export function BrandPromise() {
  return (
    <section className="bp" aria-labelledby="bp-h">
      <style>{`
        .bp {
          position: relative; isolation: isolate; overflow: hidden;
          color: #F4EFE3; font-family: 'Inter', system-ui, sans-serif;
          padding: 52px 24px;
        }
        .bp-bg { position: absolute; inset: 0; z-index: -2; }
        .bp-bg img { width: 100%; height: 100%; object-fit: cover; object-position: center 40%; }
        .bp::after {
          content: ""; position: absolute; inset: 0; z-index: -1;
          background: linear-gradient(96deg, rgba(14,10,4,.94) 0%, rgba(16,12,5,.86) 46%, rgba(16,12,5,.6) 78%, rgba(16,12,5,.42) 100%);
        }
        .bp-in { max-width: 1080px; margin: 0 auto; }
        .bp-eyebrow {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-weight: 500; font-size: .7rem; letter-spacing: .3em; text-transform: uppercase;
          color: #D8B879; margin: 0 0 20px; display: inline-flex; align-items: center; gap: 13px;
        }
        .bp-eyebrow::before { content: ""; width: 26px; height: 1px; background: #C6A24A; }
        .bp-h {
          font-family: 'Schibsted Grotesk', 'Inter', sans-serif; font-weight: 500;
          font-size: clamp(1.7rem, 3.4vw, 2.7rem); line-height: 1.14; letter-spacing: -.024em;
          margin: 0; max-width: 20ch; color: #F7F2E7;
        }
        .bp-h .g { color: #D8B879; font-style: italic; font-weight: 600; }
        .bp-p {
          font-size: clamp(1rem, 1.4vw, 1.14rem); line-height: 1.62;
          color: rgba(244,239,227,.8); margin: 22px 0 0; max-width: 52ch;
        }
        @media (max-width: 720px) { .bp { padding: 40px 20px; } }
      `}</style>
      <div className="bp-bg" aria-hidden>
        <img src="/assets/curated/still-envelopes.jpg" alt="" loading="lazy" />
      </div>
      <div className="bp-in">
        <p className="bp-eyebrow">O jeito Plan10</p>
        <h2 id="bp-h" className="bp-h">
          Uma <span className="g">leitura integrada</span> do seu momento, com caminhos para pessoas, famílias e empresas.
        </h2>
      </div>
    </section>
  );
}
