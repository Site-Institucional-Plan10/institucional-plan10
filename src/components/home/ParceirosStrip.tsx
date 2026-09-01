/**
 * Home, faixa de parceiros: marquee horizontal com os logos reais das seguradoras
 * e parceiros da Plan10 (cinza, ganham cor no hover; o movimento pausa no hover).
 * Números e depoimentos vivem em Quem Somos (pedido do cliente).
 */
const parceiros: { src: string; alt: string }[] = [
  { src: "/assets/parceiros/porto.png", alt: "Porto" },
  { src: "/assets/parceiros/bradesco.png", alt: "Bradesco Seguros" },
  { src: "/assets/parceiros/sulamerica.png", alt: "SulAmérica" },
  { src: "/assets/parceiros/mapfre.png", alt: "MAPFRE" },
  { src: "/assets/parceiros/amil.webp", alt: "Amil" },
  { src: "/assets/parceiros/hapvida.png", alt: "Hapvida" },
  { src: "/assets/parceiros/aig.png", alt: "AIG" },
  { src: "/assets/parceiros/liberty.svg", alt: "Liberty Seguros" },
  { src: "/assets/parceiros/notredame.png", alt: "NotreDame Intermédica" },
  { src: "/assets/parceiros/porto-bank.png", alt: "Porto Bank" },
  { src: "/assets/parceiros/ituran.png", alt: "Ituran" },
  { src: "/assets/parceiros/embracon.png", alt: "Embracon" },
  { src: "/assets/parceiros/carsystem.png", alt: "Carsystem" },
];

export function ParceirosStrip() {
  return (
    <section className="pt-sec" aria-labelledby="pt-title">
      <style>{`
        .pt-sec { background: #FFFFFF; padding: 58px 0 62px; text-align: center; font-family: 'Inter', system-ui, sans-serif; border-top: 1px solid #ECE9E1; }
        .pt-head { max-width: 1000px; margin: 0 auto 34px; padding: 0 24px; }
        .pt-eyebrow { font-family: 'JetBrains Mono', ui-monospace, monospace; font-weight: 500; font-size: .7rem; letter-spacing: .3em; text-transform: uppercase; color: #9A7B23; margin: 0 0 14px; }
        .pt-h2 { font-family: 'Schibsted Grotesk', 'Inter', sans-serif; font-weight: 600; font-size: clamp(1.4rem, 2.6vw, 1.9rem); letter-spacing: -.02em; color: #0E2438; margin: 0; }
        .pt-marquee { position: relative; overflow: hidden; width: 100%; -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); }
        .pt-track { display: flex; width: max-content; animation: ptmarq 46s linear infinite; }
        .pt-marquee:hover .pt-track { animation-play-state: paused; }
        .pt-group { display: flex; align-items: center; gap: 60px; padding-right: 60px; flex: none; }
        .pt-logo { height: 38px; width: auto; max-width: 150px; object-fit: contain; filter: grayscale(1); opacity: .6; transition: filter .3s ease, opacity .3s ease; flex: none; }
        .pt-logo:hover { filter: grayscale(0); opacity: 1; }
        @media (max-width: 640px) { .pt-logo { height: 30px; } .pt-group { gap: 40px; padding-right: 40px; } }
        @keyframes ptmarq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .pt-marquee { -webkit-mask-image: none; mask-image: none; }
          .pt-track { animation: none; width: auto; }
          .pt-group:last-child { display: none; }
          .pt-group { flex-wrap: wrap; justify-content: center; gap: 32px 44px; padding: 0 24px; }
        }
      `}</style>
      <div className="pt-head">
        <p className="pt-eyebrow">Parceiros</p>
        <h2 id="pt-title" className="pt-h2">Empresas que confiam no nosso trabalho</h2>
      </div>
      <div className="pt-marquee">
        <div className="pt-track">
          {[0, 1].map((g) => (
            <div className="pt-group" key={g} aria-hidden={g === 1}>
              {parceiros.map((p) => (
                <img key={p.alt + g} className="pt-logo" src={p.src} alt={g === 0 ? p.alt : ""} loading="lazy" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
