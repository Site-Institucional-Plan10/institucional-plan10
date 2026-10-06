/**
 * Folha única das seções novas da Home, da revisão pedida no pacote de
 * integração. Fica num lugar só para as dez seções compartilharem respiro,
 * escala e cor sem repetir regra, e é montada uma vez pela Home.
 */
export function EstiloFase1() {
  return (
    <style>{`
      .f1 { font-family: var(--font-sans); color: #16222F; }
      .f1-sec { padding: 56px 24px; }
      @media (min-width: 768px) { .f1-sec { padding: 76px 40px; } }
      .f1-wrap { max-width: 1180px; margin: 0 auto; }
      .f1-alt { background: #F4F2EC; }
      .f1-dark { background: linear-gradient(150deg, #0E2438 0%, #0B1D2E 100%); color: #F1EFEA; }
      .f1-dark .f1-lede, .f1-dark p { color: rgba(241,239,234,.78); }

      .f1-eyebrow {
        font-size: .72rem; font-weight: 700; letter-spacing: .14em;
        text-transform: uppercase; color: #9A7B23; margin: 0 0 10px;
        display: inline-flex; align-items: center; gap: 10px;
      }
      .f1-eyebrow::before { content: ""; width: 22px; height: 1px; background: currentColor; }
      .f1-dark .f1-eyebrow { color: #D8B879; }
      /* A cor precisa ser explícita: a regra base de h1..h6 pinta de tinta escura
         e vence a herança da seção, então na faixa escura o título sumiria. */
      .f1-h2 {
        font-size: clamp(1.7rem, 3.4vw, 2.5rem); font-weight: 600; line-height: 1.12;
        letter-spacing: -.02em; margin: 0; text-wrap: balance; color: #16222F;
      }
      .f1-dark .f1-h2, .f1-dark h3 { color: #F1EFEA; }
      .f1-lede { font-size: 1.04rem; line-height: 1.6; color: #4A5668; margin: 14px 0 0; max-width: 62ch; }

      /* especialidades: título branco sobre a foto, descrição abaixo */
      /* A grade do wireframe: colunas em múltiplos de dois, cada card ocupando
         duas. É o que centraliza a última fileira, que tem dois cards e não
         três. Sem isso, os dois últimos encostavam na esquerda. */
      .f1-esp {
        display: grid; gap: 36px; margin-top: 34px;
        grid-template-columns: 1fr; max-width: 420px; margin-inline: auto;
      }
      @media (min-width: 720px) {
        .f1-esp { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px 20px; max-width: none; }
        .f1-card { grid-column: span 2; }
        .f1-card:nth-child(5) { grid-column: 2 / span 2; }
      }
      @media (min-width: 1080px) {
        .f1-esp { grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 38px 28px; }
        .f1-card:nth-child(4) { grid-column: 2 / span 2; }
        .f1-card:nth-child(5) { grid-column: 4 / span 2; }
      }
      .f1-card {
        display: flex; flex-direction: column; background: #fff; border: 1px solid #E6E1D6;
        border-radius: 12px; overflow: hidden; text-decoration: none; color: inherit;
        transition: border-color .22s ease, transform .22s ease, box-shadow .22s ease;
      }
      .f1-card:hover { border-color: var(--acento); transform: translateY(-2px); box-shadow: 0 16px 34px rgba(12,35,64,.10); }
      .f1-card:focus-visible { outline: 2px solid var(--acento); outline-offset: 3px; }
      .f1-capa { position: relative; aspect-ratio: 1; overflow: hidden; }
      .f1-capa img { width: 100%; height: 100%; object-fit: cover; display: block; }
      /* degradê discreto só para o título branco ter contraste garantido */
      .f1-capa::after {
        content: ""; position: absolute; inset: 0;
        background: linear-gradient(0deg, rgba(8,20,32,.82) 0%, rgba(8,20,32,.42) 38%, rgba(8,20,32,.06) 72%, transparent 100%);
      }
      .f1-capa h3 {
        position: absolute; left: 20px; right: 20px; bottom: 16px; z-index: 1;
        color: #fff; font-size: 1.22rem; font-weight: 600; letter-spacing: -.01em; margin: 0;
        text-shadow: 0 2px 14px rgba(0,0,0,.4);
      }
      .f1-corpo { padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
      .f1-corpo > p { font-size: .95rem; line-height: 1.55; color: #4A5668; margin: 0; }
      .f1-chips { display: flex; flex-wrap: wrap; gap: 6px; }
      .f1-chips span {
        font-size: .74rem; color: #5B6472; border: 1px solid #E6E1D6;
        border-radius: 999px; padding: 4px 11px; background: #FBFAF6;
      }
      .f1-ir { margin-top: auto; font-size: .84rem; font-weight: 700; color: var(--acento); }

      /* blocos de quatro: critérios e método */
      .f1-quatro { display: grid; gap: 16px; margin-top: 30px; grid-template-columns: 1fr; }
      @media (min-width: 640px) { .f1-quatro { grid-template-columns: repeat(2, 1fr); } }
      @media (min-width: 1024px) { .f1-quatro { grid-template-columns: repeat(4, 1fr); } }
      .f1-item {
        background: #fff; border: 1px solid #E6E1D6; border-radius: 10px;
        padding: 20px 18px; display: flex; flex-direction: column; gap: 8px;
      }
      .f1-dark .f1-item { background: rgba(255,255,255,.05); border-color: rgba(255,255,255,.14); }
      .f1-num {
        font-size: .72rem; font-weight: 700; letter-spacing: .1em; color: #9A7B23;
      }
      .f1-dark .f1-num { color: #D8B879; }
      .f1-item h3 { font-size: 1.04rem; font-weight: 600; margin: 0; }
      .f1-item p { font-size: .9rem; line-height: 1.5; color: #5B6472; margin: 0; }
      .f1-dark .f1-item p { color: rgba(241,239,234,.74); }

      /* botões */
      .f1-btn {
        display: inline-flex; align-items: center; gap: 8px; border-radius: 999px;
        padding: 12px 22px; font-size: .9rem; font-weight: 700; text-decoration: none;
        border: 1px solid transparent; cursor: pointer; transition: all .2s ease;
      }
      .f1-btn-p { background: #C6A24A; color: #0E2438; }
      .f1-btn-p:hover { background: #D8B879; transform: translateY(-1px); }
      .f1-btn-s { background: transparent; color: #16222F; border-color: #CBC4B6; }
      .f1-btn-s:hover { border-color: #16222F; }
      .f1-dark .f1-btn-s { color: #F1EFEA; border-color: rgba(241,239,234,.35); }
      .f1-dark .f1-btn-s:hover { border-color: #F1EFEA; }
      .f1-btn:focus-visible { outline: 2px solid #C45016; outline-offset: 3px; }

      /* dois perfis */
      .f1-perfis { display: grid; gap: 18px; margin-top: 30px; grid-template-columns: 1fr; }
      @media (min-width: 860px) { .f1-perfis { grid-template-columns: repeat(2, 1fr); } }
      .f1-perfil {
        border: 1px solid #E6E1D6; border-radius: 12px; padding: 26px 24px;
        background: #fff; display: flex; flex-direction: column; gap: 12px;
      }
      .f1-perfil h3 { font-size: 1.26rem; font-weight: 600; margin: 0; letter-spacing: -.01em; }
      .f1-perfil p { font-size: .96rem; line-height: 1.55; color: #4A5668; margin: 0; }

      @media (prefers-reduced-motion: reduce) {
        .f1-card:hover, .f1-btn-p:hover { transform: none; }
      }
    `}</style>
  );
}
