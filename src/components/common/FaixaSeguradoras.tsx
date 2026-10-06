/**
 * Faixa única com as seguradoras do portfólio, em passagem contínua.
 *
 * O arranjo é o do wireframe: um trilho só, todas as marcas numa linha,
 * andando no mesmo sentido, com as pontas esmaecidas e pausa ao passar o mouse.
 *
 * Três detalhes que o pacote cobra e que são fáceis de errar:
 *
 * A volta não pode ter salto. O trilho repete o mesmo conjunto três vezes e a
 * animação anda exatamente um terço, então o último quadro é igual ao primeiro.
 * São três e não dois porque um conjunto mede cerca de 1930px: com duas cópias,
 * no fim do ciclo sobrava um vão à direita em tela larga, que era o defeito
 * visível. Com três, a tela continua coberta até 3860px.
 *
 * As cópias que fecham o ciclo saem do leitor de tela, com `alt` vazio e
 * `aria-hidden`. Só o primeiro conjunto nomeia as seguradoras.
 *
 * Os arquivos vieram sem transparência, com fundo branco. Sobre o bege da
 * seção isso desenhava tarjas retangulares com borda visível. `mix-blend-mode`
 * não resolve: a animação de transform cria contexto de empilhamento e o
 * branco passa a ser misturado contra o próprio trilho, não contra a seção.
 * A saída é assumir o branco: a faixa inteira vira uma banda branca, e as
 * pontas esmaecem para o bege junto com ela.
 */
const FAIXAS = [
  {
    src: "/assets/fase1/logos/seguradoras-faixa-1.webp",
    w: 1707,
    h: 85,
    alt: "Aliro, Allianz, Azul Seguros, Bradesco Seguros, Essor, HDI, Itaú Seguros, Ituran, Mapfre, Mitsui Sumitomo e Porto",
  },
  {
    src: "/assets/fase1/logos/seguradoras-faixa-2.webp",
    w: 1302,
    h: 71,
    alt: "Sompo, Suhai, Sura, Tokio Marine, Yelum, Youse e Zurich",
  },
];

const COPIAS = [0, 1, 2];

export function FaixaSeguradoras() {
  return (
    <div className="p10-faixa">
      <style>{`
        .p10-faixa {
          overflow: hidden; width: 100%; background: #fff; padding: 22px 0;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
        }
        .p10-faixa-trilho {
          display: flex; width: max-content; will-change: transform;
          animation: p10-faixa-anda 65s linear infinite;
        }
        .p10-faixa:hover .p10-faixa-trilho,
        .p10-faixa:focus-within .p10-faixa-trilho { animation-play-state: paused; }
        .p10-faixa-set { display: flex; align-items: center; gap: 42px; padding-right: 42px; flex: none; }
        .p10-faixa img {
          height: 48px; width: auto; display: block; flex: none;
          filter: grayscale(1) contrast(1.15); opacity: .8;
        }
        /* três conjuntos, um terço de percurso: o fim do ciclo repete o começo */
        @keyframes p10-faixa-anda { to { transform: translate3d(-33.3333%, 0, 0); } }

        @media (max-width: 640px) {
          .p10-faixa img { height: 34px; }
          .p10-faixa-set { gap: 28px; padding-right: 28px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .p10-faixa { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
          .p10-faixa-trilho { animation: none; }
          .p10-faixa-set:not(:first-child) { display: none; }
        }
      `}</style>

      <div className="p10-faixa-trilho">
        {COPIAS.map((c) => (
          <div className="p10-faixa-set" key={c} aria-hidden={c > 0 ? true : undefined}>
            {FAIXAS.map((f) => (
              <img
                key={f.src + c}
                src={f.src}
                width={f.w}
                height={f.h}
                alt={c === 0 ? f.alt : ""}
                aria-hidden={c > 0 ? true : undefined}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
