/**
 * Faixa de seguradoras em passagem contínua.
 *
 * O pacote pede três coisas aqui e todas estão atendidas: a volta não pode ter
 * salto perceptível, a cópia que fecha o ciclo precisa ser ignorada por leitor
 * de tela, e o movimento precisa parar em `prefers-reduced-motion`.
 *
 * O truque do ciclo sem salto é a faixa ter exatamente o dobro do conteúdo e a
 * animação deslocar 50%: quando ela reinicia, o quadro é idêntico ao inicial.
 * A segunda cópia leva `aria-hidden` e `alt` vazio.
 */
const FAIXAS = [
  {
    src: "/assets/fase1/logos/seguradoras-faixa-1.webp",
    w: 1707,
    h: 85,
    alt: "Aliro, Allianz, Azul Seguros, Bradesco Seguros, Essor, HDI, Itaú Seguros, Ituran, Mapfre e Porto Seguro",
  },
  {
    src: "/assets/fase1/logos/seguradoras-faixa-2.webp",
    w: 1304,
    h: 71,
    alt: "Sompo, Suhai, Sura, Tokio Marine, Velum, Youse e Zurich",
  },
];

export function Seguradoras() {
  return (
    <section className="f1 f1-sec f1-alt" aria-labelledby="seg-h">
      <style>{`
        .f1-seg-pista { overflow: hidden; margin-top: 26px; position: relative; }
        .f1-seg-pista::before, .f1-seg-pista::after {
          content: ""; position: absolute; top: 0; bottom: 0; width: 72px; z-index: 2; pointer-events: none;
        }
        .f1-seg-pista::before { left: 0; background: linear-gradient(90deg, #F4F2EC, transparent); }
        .f1-seg-pista::after { right: 0; background: linear-gradient(270deg, #F4F2EC, transparent); }
        .f1-seg-trilho { display: flex; width: max-content; will-change: transform; }
        .f1-seg-trilho img { height: 46px; width: auto; display: block; margin-right: 56px; opacity: .72; }
        .f1-seg-1 .f1-seg-trilho { animation: f1-desliza 42s linear infinite; }
        .f1-seg-2 .f1-seg-trilho { animation: f1-desliza 36s linear infinite reverse; }
        /* o trilho tem o dobro do conteúdo e anda metade dele: a volta cai no
           mesmo quadro do começo, sem salto visível */
        @keyframes f1-desliza { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .f1-seg-trilho { animation: none !important; }
          .f1-seg-pista { overflow-x: auto; }
        }
      `}</style>

      <div className="f1-wrap">
        <p className="f1-eyebrow">Mais opções para a sua escolha</p>
        <p className="f1-eyebrow">Mais opções para a sua escolha</p>
        <h2 className="f1-h2" id="seg-h">
          Seguradoras em nosso portfólio
        </h2>
      </div>

      {FAIXAS.map((f, i) => (
        <div key={f.src} className={`f1-seg-pista f1-seg-${i + 1}`}>
          <div className="f1-seg-trilho">
            <img src={f.src} width={f.w} height={f.h} alt={f.alt} loading="lazy" decoding="async" />
            <img
              src={f.src}
              width={f.w}
              height={f.h}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      ))}
    </section>
  );
}
