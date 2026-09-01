import type { CSSProperties, ReactNode } from "react";

export type Palette = {
  hero: string;
  ve: string;
  card: string;
  alt: string;
  vs: string;
  vp: string;
  va: string;
};

// Solution palettes: repaginação premium com emoção. hero/card = tom escuro
// sóbrio da solução; vp/va = acento da solução (ouro no financeiro). vs = ivory
// morno único (mata o excesso de pastel/cinza-frio; a riqueza vem de foto + ouro).
export const PALETTES: Record<string, Palette> = {
  saude:       { hero: "#0E2A22", ve: "#123A2E", card: "#0B221B", alt: "#C8EDD9", vs: "#F1EFE8", vp: "#4F7D60", va: "#C6A24A" },
  protecao:    { hero: "#0E2438", ve: "#12324E", card: "#0B1D2E", alt: "#D6E8F7", vs: "#F1EFE8", vp: "#345876", va: "#C6A24A" },
  financeiras: { hero: "#0A1929", ve: "#12324E", card: "#081422", alt: "#D6E8F7", vs: "#F1EFE8", vp: "#A9843C", va: "#C6A24A" },
  crescimento: { hero: "#241A38", ve: "#2E2348", card: "#1A1330", alt: "#DDD5F0", vs: "#F1EFE8", vp: "#5F4E7B", va: "#C6A24A" },
  assistencia: { hero: "#2A1608", ve: "#3A2416", card: "#1F1005", alt: "#F0D4C2", vs: "#F1EFE8", vp: "#A2602F", va: "#C6A24A" },
};

// Hub institucional (página /solucoes)
export const HUB_PALETTE: Palette = {
  hero: "#0E2438", ve: "#12324E", card: "#0B1D2E", alt: "#F5EBC7", vs: "#F1EFE8", vp: "#A9843C", va: "#C6A24A",
};

export function paletteFor(slug: string): Palette {
  return PALETTES[slug] ?? PALETTES.saude;
}

export const SOLUTION_LOGOS: Record<string, string> = {
  saude: "/assets/logos/logo-saude-odonto.png",
  protecao: "/assets/logos/logo-seguros.png",
  financeiras: "/assets/logos/logo-financas.png",
  crescimento: "/assets/logos/logo-consorcios.png",
  assistencia: "/assets/logos/logo-servicos.png",
};

export function logoFor(slug: string): string | undefined {
  return SOLUTION_LOGOS[slug];
}

// Global stylesheet, injected once by PageTheme. Scoped under .plan10-scope.
const CSS = `
.plan10-scope {
  --gold: #C6A24A;
  --gold-hi: #D8B879;
  --wa: #25D366;
  --wa-hov: #1EAE52;
  --ivory: #F4F2EC;
  --c1: #FCFAF5;
  --c2: #E7E2D6;
  --ctxt: #565049;
  --preto: #0E2438;
  --fd: 'Schibsted Grotesk', 'Inter', sans-serif;
  --fb: 'Inter', system-ui, sans-serif;
  --fl: 'JetBrains Mono', ui-monospace, monospace;
  --r: 14px;
  --rs: 10px;
  --rx: 10px;
  --t: .24s ease;
  --sh: 0 14px 34px rgba(12,35,64,.09);

  background: var(--ivory);
  color: var(--preto);
  font-family: var(--fb);
  min-height: 100vh;
}
.plan10-scope * { box-sizing: border-box; }
.plan10-scope { overflow-x: hidden; }
.plan10-scope .wrap { max-width: 1080px; width: 100%; margin: 0 auto; min-width: 0; }

/* Hero: navy calmo, título grotesk, eyebrow mono */
.plan10-scope .p10-hero {
  background: linear-gradient(150deg, var(--hero) 0%, var(--card) 100%);
  color: #F1EFEA;
  padding: 128px 24px 68px;
}
@media (min-width: 768px) { .plan10-scope .p10-hero { padding: 144px 40px 84px; } }
.plan10-scope .p10-hero-inner { max-width: 1080px; margin: 0 auto; display: flex; flex-direction: column; align-items: flex-start; gap: 18px; }
.plan10-scope .p10-hero-logo { display: none; }
.plan10-scope .p10-hero h1 {
  font-family: var(--fd); font-size: clamp(2rem, 4.6vw, 3.4rem);
  line-height: 1.08; letter-spacing: -.028em; font-weight: 500; margin: 0; color: #F1EFEA; max-width: 20ch;
}
.plan10-scope .p10-hero .lede { font-family: var(--fb); font-size: clamp(1rem,1.4vw,1.18rem); line-height: 1.6; color: rgba(241,239,234,.74); margin: 0; max-width: 48ch; }
.plan10-scope .p10-hero .eyebrow { color: rgba(241,239,234,.6); }
.plan10-scope .p10-hero .eyebrow::before { content: ""; width: 26px; height: 1px; background: var(--gold); display: inline-block; vertical-align: middle; margin-right: 12px; }
.plan10-scope .p10-hero .pills { margin-top: 4px; }

/* Hero com fotografia de fundo: profundidade e emoção, sem cara de cor chapada */
.plan10-scope .p10-hero.has-img { position: relative; overflow: hidden; isolation: isolate; }
.plan10-scope .p10-hero .p10-hero-bg { position: absolute; inset: 0; z-index: -2; }
.plan10-scope .p10-hero .p10-hero-bg img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
.plan10-scope .p10-hero.has-img::after {
  content: ""; position: absolute; inset: 0; z-index: -1;
  background: linear-gradient(102deg, var(--hero) 0%, rgba(8,20,34,.93) 42%, rgba(8,20,34,.62) 78%, rgba(8,20,34,.42) 100%);
}
.plan10-scope .p10-hero.has-img .p10-hero-inner { position: relative; }

/* Eyebrow em mono */
.plan10-scope .eyebrow {
  font-family: var(--fl); font-weight: 500; font-size: .7rem;
  letter-spacing: .28em; text-transform: uppercase; margin: 0; color: #9A7B23;
}

/* Breadcrumb */
.plan10-scope .p10-crumb { background: var(--c1); border-bottom: 1px solid var(--c2); padding: 11px 24px; font-family: var(--fl); font-size: .66rem; letter-spacing: .06em; text-transform: uppercase; color: var(--ctxt); }
.plan10-scope .p10-crumb-inner { max-width: 1080px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.plan10-scope .p10-crumb a { color: var(--ctxt); text-decoration: none; transition: color var(--t); }
.plan10-scope .p10-crumb a:hover { color: var(--vp); }
.plan10-scope .p10-crumb .sep { opacity: .5; }
.plan10-scope .p10-crumb .current { color: var(--preto); }

/* Sections: compacto premium */
.plan10-scope .sec { padding: 60px 24px; }
@media (min-width: 768px) { .plan10-scope .sec { padding: 84px 40px; } }
.plan10-scope .sec-alt { background: var(--vs); }
.plan10-scope .sec-dark { background: linear-gradient(150deg, var(--hero) 0%, var(--card) 100%); color: #F1EFEA; }
.plan10-scope .sec-dark .eyebrow { color: rgba(241,239,234,.6); }
.plan10-scope .sec-dark h2, .plan10-scope .sec-dark h3 { color: #F1EFEA; }
.plan10-scope .sec-dark p { color: rgba(241,239,234,.74); }

/* Section titles em grotesk */
.plan10-scope h2.p10-h2 { font-family: var(--fd); font-weight: 600; font-size: clamp(1.6rem, 3vw, 2.4rem); line-height: 1.12; letter-spacing: -.025em; margin: 12px 0 0; color: var(--preto); }
.plan10-scope .sec-dark h2.p10-h2 { color: #F1EFEA; }
.plan10-scope .p10-lede { font-family: var(--fb); font-size: 1.02rem; line-height: 1.62; color: var(--ctxt); margin: 14px 0 0; max-width: 640px; }
.plan10-scope .sec-dark .p10-lede { color: rgba(241,239,234,.72); }

/* Pills */
.plan10-scope .pill { display: inline-flex; align-items: center; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.16); border-radius: 999px; padding: 6px 13px; font-family: var(--fl); font-size: .66rem; letter-spacing: .08em; text-transform: uppercase; color: rgba(241,239,234,.85); gap: 7px; }
.plan10-scope .p10-hero .pill { color: rgba(241,239,234,.82); }
.plan10-scope .pills { display: flex; flex-wrap: wrap; gap: 8px; max-width: 100%; }

/* Toggle PF/PJ: calmo, único lugar com "Para você / Para empresa" */
.plan10-scope .p10-toggle { display: inline-flex; width: fit-content; max-width: 100%; flex-wrap: wrap; border: 1px solid var(--c2); border-radius: 999px; overflow: hidden; background: #fff; padding: 4px; gap: 4px; }
.plan10-scope .p10-toggle button { padding: 8px 20px; border-radius: 999px; font-family: var(--fb); font-size: .84rem; font-weight: 600; color: var(--ctxt); background: transparent; border: 0; cursor: pointer; transition: background var(--t), color var(--t); }
.plan10-scope .p10-toggle button[aria-selected="true"] { background: var(--preto); color: #F1EFEA; }

/* Produtos: grade compacta de tiles (visualização rápida, sem rolagem longa) */
.plan10-scope .prod-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 10px; min-width: 0; }
.plan10-scope .prod-tile {
  --c: var(--vp);
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  text-align: left; text-decoration: none; cursor: pointer;
  background: var(--c1); border: 1px solid var(--c2); border-radius: 12px;
  padding: 15px 15px 15px 16px; position: relative; min-width: 0; width: 100%; font: inherit;
  transition: border-color var(--t), background var(--t), transform var(--t), box-shadow var(--t);
}
.plan10-scope .prod-tile::before { content: ""; position: absolute; left: 0; top: 12px; bottom: 12px; width: 3px; border-radius: 3px; background: var(--c); opacity: 0; transition: opacity var(--t); }
.plan10-scope .prod-tile:hover { border-color: var(--c); background: #fff; transform: translateY(-2px); box-shadow: var(--sh); }
.plan10-scope .prod-tile:hover::before { opacity: 1; }
.plan10-scope .prod-tile-name { font-family: var(--fd); font-weight: 600; font-size: .98rem; line-height: 1.22; letter-spacing: -.01em; color: var(--preto); overflow-wrap: anywhere; }
.plan10-scope .prod-tile-go { flex: none; color: var(--vp); display: inline-flex; opacity: 0; transform: translateX(-5px); transition: opacity var(--t), transform var(--t); }
.plan10-scope .prod-tile:hover .prod-tile-go { opacity: 1; transform: none; }

/* Produtos: linhas premium legadas (mantidas para outras soluções) */
.plan10-scope .prod-list { border-top: 1px solid var(--c2); min-width: 0; }
.plan10-scope .prod-item {
  --c: var(--vp);
  border-bottom: 1px solid var(--c2);
  padding: 26px 14px 26px 8px; position: relative; min-width: 0; max-width: 100%;
  transition: background var(--t), padding-left var(--t);
}
.plan10-scope .prod-item::before { content: ""; position: absolute; left: 0; top: 24px; bottom: 24px; width: 3px; background: var(--c); border-radius: 3px; opacity: 0; transition: opacity var(--t); }
.plan10-scope .prod-item:hover { background: var(--c1); padding-left: 18px; }
.plan10-scope .prod-item:hover::before { opacity: 1; }
.plan10-scope .prod-item .prod-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px; }
.plan10-scope .prod-item h3 { font-family: var(--fd); font-weight: 600; font-size: 1.22rem; margin: 0; color: var(--preto); line-height: 1.2; letter-spacing: -.015em; }
.plan10-scope .prod-item .desc { font-family: var(--fb); font-size: .95rem; line-height: 1.58; color: var(--ctxt); margin: 6px 0 0; max-width: 68ch; }
.plan10-scope .prod-item .prod-meta { font-family: var(--fb); font-size: .84rem; color: var(--ctxt); margin: 8px 0 0; }
.plan10-scope .prod-item .prod-meta strong { color: var(--preto); font-weight: 600; }
.plan10-scope .prod-item ul { margin: 10px 0 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 6px 18px; font-family: var(--fb); font-size: .85rem; color: var(--ctxt); min-width: 0; }
.plan10-scope .prod-item ul li { min-width: 0; max-width: 100%; overflow-wrap: anywhere; }
.plan10-scope .prod-item ul li::before { content: '·'; color: var(--vp); margin-right: 6px; font-weight: 700; }
.plan10-scope .prod-item .prod-ctas { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.plan10-scope .prod-cta { background: none; border: 0; cursor: pointer; padding: 0; font-family: var(--fl); font-size: .68rem; letter-spacing: .1em; text-transform: uppercase; font-weight: 500; color: var(--vp); display: inline-flex; align-items: center; gap: 8px; transition: gap var(--t), color var(--t); }
.plan10-scope .prod-cta:hover { gap: 12px; color: var(--preto); }
.plan10-scope .prod-cta svg { transition: transform var(--t); }
.plan10-scope .prod-cta:hover svg { transform: translateX(2px); }

.plan10-scope .prod-item .prod-faq { border-top: 1px solid var(--c2); padding-top: 12px; margin-top: 16px; }
.plan10-scope .prod-item .prod-faq > summary { cursor: pointer; list-style: none; font-family: var(--fl); font-size: .66rem; letter-spacing: .12em; text-transform: uppercase; font-weight: 500; color: var(--vp); display: flex; align-items: center; gap: 8px; }
.plan10-scope .prod-item .prod-faq > summary::-webkit-details-marker { display: none; }
.plan10-scope .prod-item .prod-faq > summary::after { content: '+'; margin-left: auto; font-size: 1.1rem; line-height: 1; color: var(--vp); }
.plan10-scope .prod-item .prod-faq[open] > summary::after { content: '−'; }
.plan10-scope .prod-item .prod-faq-list { display: flex; flex-direction: column; gap: 12px; margin-top: 14px; }
.plan10-scope .prod-item .prod-faq-item .q { font-family: var(--fb); font-size: .88rem; font-weight: 600; color: var(--preto); margin: 0 0 4px; }
.plan10-scope .prod-item .prod-faq-item .a { font-family: var(--fb); font-size: .86rem; line-height: 1.55; color: var(--ctxt); margin: 0; }
.plan10-scope .prod-item h3, .plan10-scope .prod-item .desc, .plan10-scope .prod-item .prod-meta,
.plan10-scope .prod-item .prod-faq-item .q, .plan10-scope .prod-item .prod-faq-item .a { overflow-wrap: anywhere; word-break: break-word; }

/* Buttons */
.plan10-scope .btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 999px; font-family: var(--fb); font-weight: 600; font-size: .9rem; cursor: pointer; border: 1px solid transparent; text-decoration: none; transition: background var(--t), border-color var(--t), color var(--t), transform var(--t); line-height: 1; }
.plan10-scope .btn-primary { background: var(--gold); color: #0E2438; }
.plan10-scope .btn-primary:hover { background: var(--gold-hi); transform: translateY(-1px); }
.plan10-scope .btn-wa { background: transparent; color: var(--preto); border-color: var(--c2); }
.plan10-scope .btn-wa:hover { border-color: var(--wa); color: var(--wa-hov); }
.plan10-scope .sec-dark .btn-wa { color: #F1EFEA; border-color: rgba(241,239,234,.3); }
.plan10-scope .sec-dark .btn-wa:hover { border-color: #F1EFEA; color: #fff; }
.plan10-scope .btn-outline-dark { background: transparent; color: #F1EFEA; border-color: rgba(241,239,234,.35); }
.plan10-scope .btn-outline-dark:hover { border-color: #fff; }
.plan10-scope .btn-outline-light { background: transparent; color: var(--preto); border-color: var(--preto); }
.plan10-scope .btn-outline-light:hover { background: var(--preto); color: #F1EFEA; }

/* Focus rings */
.plan10-scope a:focus-visible, .plan10-scope button:focus-visible, .plan10-scope input:focus-visible, .plan10-scope textarea:focus-visible, .plan10-scope select:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }

/* Form (inside sec-dark) */
.plan10-scope .p10-form { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.12); border-radius: 14px; padding: 22px 18px; display: grid; gap: 14px; }
.plan10-scope .p10-form label { display: block; }
.plan10-scope .p10-form .eyebrow { color: rgba(241,239,234,.7); margin-bottom: 6px; }
.plan10-scope .p10-form-ctx { border: 1px solid rgba(255,255,255,.14); border-radius: var(--rs); padding: 12px 14px; background: rgba(255,255,255,.04); }
.plan10-scope .p10-form-ctx .eyebrow { color: var(--va); margin-bottom: 4px; }
.plan10-scope .p10-form-ctx p { font-family: var(--fb); font-size: .95rem; color: #fff; margin: 0; line-height: 1.4; }
.plan10-scope .p10-form-add { align-self: flex-start; justify-self: start; background: none; border: none; padding: 9px 4px 9px 0; cursor: pointer; font-family: var(--fl); font-weight: 500; letter-spacing: .06em; text-transform: uppercase; font-size: .7rem; color: var(--va); }
.plan10-scope .p10-form-add:hover { color: #fff; }
.plan10-scope .p10-form input, .plan10-scope .p10-form textarea, .plan10-scope .p10-form select { width: 100%; padding: 12px 13px; border-radius: 10px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.18); color: #fff; font-family: var(--fb); font-size: .95rem; outline: none; transition: border-color var(--t), background var(--t); }
.plan10-scope .p10-form select { appearance: none; -webkit-appearance: none; cursor: pointer; padding-right: 42px; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13' height='9' viewBox='0 0 13 9' fill='none' stroke='%23C7A468' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M1.5 2l5 5 5-5'/%3E%3C/svg%3E"); background-position: right 16px center; background-repeat: no-repeat; }
.plan10-scope .p10-form select:hover { border-color: rgba(255,255,255,.32); }
.plan10-scope .p10-form select option { color: #1a1a1a; }
.plan10-scope .p10-form input:focus, .plan10-scope .p10-form textarea:focus, .plan10-scope .p10-form select:focus { border-color: var(--va); background: rgba(255,255,255,.08); }
.plan10-scope .p10-form input::placeholder, .plan10-scope .p10-form textarea::placeholder { color: rgba(255,255,255,.4); }
.plan10-scope .p10-form .row { display: grid; gap: 14px; grid-template-columns: 1fr; }
@media (min-width: 640px) { .plan10-scope .p10-form .row { grid-template-columns: 1fr 1fr; } }
.plan10-scope .p10-form .actions { display: flex; flex-direction: column; gap: 10px; }
@media (min-width: 640px) { .plan10-scope .p10-form .actions { flex-direction: row; } }
.plan10-scope .p10-form .actions .btn { justify-content: center; flex: 1; }
.plan10-scope .p10-form .check { display: flex; gap: 10px; align-items: flex-start; font-size: .85rem; color: rgba(241,239,234,.78); line-height: 1.5; }
.plan10-scope .p10-form .check input { width: auto; margin-top: 3px; }

/* FAQ */
.plan10-scope .p10-faq { display: flex; flex-direction: column; gap: 8px; }
.plan10-scope .p10-faq details { background: #fff; border: 1px solid var(--c2); border-radius: 12px; transition: box-shadow var(--t); }
.plan10-scope .p10-faq details[open] { box-shadow: var(--sh); }
.plan10-scope .p10-faq summary { list-style: none; cursor: pointer; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; gap: 14px; font-family: var(--fd); font-weight: 500; font-size: 1rem; color: var(--preto); }
.plan10-scope .p10-faq summary::-webkit-details-marker { display: none; }
.plan10-scope .p10-faq summary::after { content: '+'; color: var(--vp); font-size: 1.4rem; line-height: 1; }
.plan10-scope .p10-faq details[open] summary::after { content: '−'; }
.plan10-scope .p10-faq .ans { padding: 0 20px 18px; font-family: var(--fb); font-size: .93rem; line-height: 1.65; color: var(--ctxt); overflow-wrap: anywhere; }

/* Escolha de caminho ao tocar num produto: WhatsApp ou formulario */
.plan10-scope .p10-chooser { position: fixed; inset: 0; z-index: 120; display: grid; place-items: center; padding: 20px; background: rgba(9,16,26,.62); backdrop-filter: blur(3px); animation: p10-fade .16s ease-out; }
.plan10-scope .p10-chooser-card { position: relative; width: min(460px, 100%); max-height: 88vh; overflow-y: auto; background: #FBFAF7; border: 1px solid var(--c2); border-radius: 18px; padding: 26px 26px 22px; box-shadow: 0 24px 60px rgba(9,16,26,.28); animation: p10-rise .2s cubic-bezier(.2,.7,.3,1); }
.plan10-scope .p10-chooser-card .eyebrow { color: var(--vp); }
.plan10-scope .p10-chooser-card h3 { font-family: var(--fd); font-weight: 600; font-size: clamp(1.15rem, 2.4vw, 1.4rem); line-height: 1.25; letter-spacing: -.015em; color: var(--preto); margin: 6px 0 0; }
.plan10-scope .p10-chooser-desc { font-family: var(--fb); font-size: .92rem; line-height: 1.6; color: var(--ctxt); margin: 10px 0 0; }
.plan10-scope .p10-chooser-pergunta { font-family: var(--fb); font-weight: 600; font-size: .88rem; color: var(--preto); margin: 20px 0 10px; }
.plan10-scope .p10-chooser-acoes { display: grid; gap: 10px; }
.plan10-scope .p10-chooser-acoes .btn { justify-content: center; width: 100%; }
.plan10-scope .p10-chooser-nota { font-family: var(--fb); font-size: .78rem; line-height: 1.5; color: var(--ctxt); text-align: center; margin: 14px 0 0; }
.plan10-scope .p10-chooser-x { position: absolute; top: 12px; right: 12px; width: 32px; height: 32px; display: grid; place-items: center; border-radius: 999px; border: 1px solid var(--c2); background: #fff; color: var(--ctxt); cursor: pointer; transition: color var(--t), border-color var(--t); }
.plan10-scope .p10-chooser-x:hover { color: var(--preto); border-color: var(--preto); }
@keyframes p10-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes p10-rise { from { opacity: 0; transform: translateY(10px) scale(.99); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .plan10-scope .p10-chooser, .plan10-scope .p10-chooser-card { animation: none; } }

/* Produto pre-selecionado no formulario, vindo da escolha feita no tile */
.plan10-scope .p10-form-pre { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 12px 14px; border: 1px solid rgba(212,175,110,.45); background: rgba(212,175,110,.1); border-radius: 12px; }
.plan10-scope .p10-form-pre .lbl { font-family: var(--fm); font-size: .66rem; letter-spacing: .12em; text-transform: uppercase; color: rgba(241,239,234,.65); }
.plan10-scope .p10-form-pre .val { font-family: var(--fb); font-weight: 600; font-size: .92rem; color: #fff; flex: 1; min-width: 140px; }
.plan10-scope .p10-form-pre button { background: none; border: 0; padding: 0; font-family: var(--fb); font-size: .8rem; color: rgba(241,239,234,.7); text-decoration: underline; cursor: pointer; }
.plan10-scope .p10-form-pre button:hover { color: #fff; }

/* Navegação hub/categoria: linhas premium (sem card de caixa) */
.plan10-scope .p10-cards { border-top: 1px solid var(--c2); }
.plan10-scope .p10-card {
  --c: var(--vp);
  display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 8px 24px;
  padding: 17px 14px 17px 8px; border-bottom: 1px solid var(--c2);
  text-decoration: none; color: var(--preto); position: relative; min-width: 0;
  transition: background var(--t), padding-left var(--t);
}
.plan10-scope .p10-card::before { content: ""; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 0; background: var(--c); border-radius: 3px; transition: height var(--t); }
.plan10-scope .p10-card:hover { background: var(--c1); padding-left: 18px; }
.plan10-scope .p10-card:hover::before { height: 58%; }
.plan10-scope .p10-card .eyebrow { grid-column: 1 / -1; }
.plan10-scope .p10-card h3 { font-family: var(--fd); font-weight: 600; font-size: clamp(1.2rem, 2vw, 1.5rem); margin: 0; color: var(--preto); line-height: 1.16; letter-spacing: -.02em; overflow-wrap: anywhere; }
.plan10-scope .p10-card p { font-family: var(--fb); font-size: .95rem; line-height: 1.55; color: var(--ctxt); margin: 5px 0 0; max-width: 62ch; overflow-wrap: anywhere; }
.plan10-scope .p10-card .arrow { grid-column: 2; grid-row: 1 / span 3; align-self: center; font-family: var(--fl); font-size: .66rem; letter-spacing: .1em; text-transform: uppercase; color: var(--vp); font-weight: 500; white-space: nowrap; transition: transform var(--t); }
.plan10-scope .p10-card:hover .arrow { transform: translateX(3px); }
.plan10-scope .p10-card.disabled { opacity: .5; cursor: default; }
.plan10-scope .p10-card.disabled:hover { background: transparent; padding-left: 8px; }
.plan10-scope .p10-card.disabled .arrow { color: var(--ctxt); }

/* Cross-selling chips */
.plan10-scope .cross { display: flex; flex-wrap: wrap; gap: 8px; }
.plan10-scope .cross a { padding: 9px 16px; border-radius: 999px; border: 1px solid var(--c2); background: #fff; color: var(--preto); font-family: var(--fb); font-size: .86rem; text-decoration: none; transition: border-color var(--t), color var(--t); }
.plan10-scope .cross a:hover { border-color: var(--vp); color: var(--vp); }

/* Split (texto + imagem) e figura editorial */
.plan10-scope .p10-split { display: grid; gap: 30px; grid-template-columns: 1fr; align-items: center; }
@media (min-width: 860px) { .plan10-scope .p10-split { grid-template-columns: 1.02fr .98fr; gap: 48px; } }
.plan10-scope .p10-fig { margin: 0; border-radius: 14px; overflow: hidden; box-shadow: var(--sh); border: 1px solid var(--c2); }
.plan10-scope .p10-fig img { display: block; width: 100%; object-fit: cover; aspect-ratio: 4 / 3; }

/* Callout consultivo: filete dourado, tom editorial (critérios / texto consultivo) */
.plan10-scope .p10-note { border-left: 2px solid var(--gold); padding: 2px 0 2px 22px; margin: 0; max-width: 720px; }
.plan10-scope .p10-note p { font-family: var(--fd); font-weight: 500; font-size: clamp(1.15rem, 2vw, 1.5rem); line-height: 1.4; letter-spacing: -.01em; color: var(--preto); margin: 0; }
.plan10-scope .sec-dark .p10-note p { color: #F4F0E8; }

/* Placards: etapas de valor (texto "·" vira cartões finos) */
.plan10-scope .p10-placards { display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 26px; }
@media (min-width: 640px) { .plan10-scope .p10-placards { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 940px) { .plan10-scope .p10-placards.cols-4 { grid-template-columns: repeat(4, 1fr); } }
.plan10-scope .p10-placard { border: 1px solid var(--c2); border-radius: 12px; background: var(--c1); padding: 16px 16px 18px; position: relative; }
.plan10-scope .p10-placard .n { font-family: var(--fl); font-size: .64rem; letter-spacing: .14em; color: var(--gold); display: block; margin-bottom: 8px; }
.plan10-scope .p10-placard .txt { font-family: var(--fd); font-weight: 500; font-size: 1rem; line-height: 1.28; color: var(--preto); letter-spacing: -.01em; }

/* Strip: lista "·" inline discreta (modalidades / mapa) */
.plan10-scope .p10-strip { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
.plan10-scope .p10-strip span { font-family: var(--fb); font-size: .8rem; color: var(--ctxt); border: 1px solid var(--c2); border-radius: 999px; padding: 6px 13px; background: var(--c1); }

/* Duas colunas de texto (abertura + subhero) */
.plan10-scope .p10-two { display: grid; gap: 18px 46px; grid-template-columns: 1fr; }
@media (min-width: 820px) { .plan10-scope .p10-two { grid-template-columns: 1.1fr .9fr; } }

/* Block spacing rhythm */
.plan10-scope .rhythm > * + * { margin-top: 48px; }
`;

export function PageTheme({
  slug,
  palette,
  children,
  className,
  style,
}: {
  slug?: string;
  palette?: Palette;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const p = palette ?? (slug ? paletteFor(slug) : PALETTES.saude);
  const vars = {
    "--hero": p.hero,
    "--ve": p.ve,
    "--card": p.card,
    "--alt": p.alt,
    "--vs": p.vs,
    "--vp": p.vp,
    "--va": p.va,
  } as CSSProperties;
  return (
    <div className={`plan10-scope ${className ?? ""}`} style={{ ...vars, ...style }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {children}
    </div>
  );
}
