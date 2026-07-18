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

// Solution palettes (DS Plan10 v3.1)
export const PALETTES: Record<string, Palette> = {
  saude:       { hero: "#071C15", ve: "#0E3D2C", card: "#0C3325", alt: "#C8EDD9", vs: "#EDF8F2", vp: "#2EA86E", va: "#6BCCA0" },
  protecao:    { hero: "#091A2E", ve: "#1C4E80", card: "#0F2E52", alt: "#D6E8F7", vs: "#F0F6FC", vp: "#2B6CB0", va: "#5BA3D9" },
  financeiras: { hero: "#060E18", ve: "#0A1929", card: "#061018", alt: "#D6E8F7", vs: "#EBF3FA", vp: "#5BA3D9", va: "#7EC8E3" },
  crescimento: { hero: "#1A0F30", ve: "#3D2870", card: "#221535", alt: "#DDD5F0", vs: "#F2EEF9", vp: "#7B5BB5", va: "#9B7ED4" },
  assistencia: { hero: "#1A0800", ve: "#3D1A00", card: "#2A1200", alt: "#F0D4C2", vs: "#FAF0EA", vp: "#C45C2E", va: "#E07840" },
};

// Hub institucional (página /solucoes)
export const HUB_PALETTE: Palette = {
  hero: "#0D0A00",
  ve: "#1A1200",
  card: "#221800",
  alt: "#F5EBC7",
  vs: "#FAF5E4",
  vp: "#C9A83C",
  va: "#E8CA6A",
};

export function paletteFor(slug: string): Palette {
  return PALETTES[slug] ?? PALETTES.saude;
}

// Global stylesheet — injected once by PageTheme. Scoped under .plan10-scope.
const CSS = `
.plan10-scope {
  --navy: #1C4E80;
  --laranja: #E05A20;
  --laranja-hov: #C94D17;
  --wa: #25D366;
  --wa-hov: #1EAE52;
  --creme: #F7F5F2;
  --c1: #F4F4F4;
  --c2: #E2E2E2;
  --ctxt: #5A5A5A;
  --preto: #1A1A1A;
  --fd: 'Playfair Display', Georgia, serif;
  --fb: 'Inter', system-ui, sans-serif;
  --fl: 'Barlow Condensed', sans-serif;
  --r: 12px;
  --rs: 8px;
  --rx: 5px;
  --t: .22s ease;
  --sh: 0 2px 14px rgba(0,0,0,.08);

  background: var(--creme);
  color: var(--preto);
  font-family: var(--fb);
  min-height: 100vh;
}

.plan10-scope * { box-sizing: border-box; }

/* Container */
.plan10-scope .wrap { max-width: 1100px; margin: 0 auto; }

/* Hero */
.plan10-scope .p10-hero {
  background: linear-gradient(150deg, var(--hero) 0%, var(--card) 55%, var(--vp) 100%);
  color: #fff;
  padding: 52px 20px 44px;
}
.plan10-scope .p10-hero-inner { max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; gap: 18px; }
.plan10-scope .p10-hero h1 {
  font-family: var(--fd);
  font-size: clamp(1.85rem, 4.4vw, 3rem);
  line-height: 1.1;
  letter-spacing: -.01em;
  font-weight: 500;
  margin: 0;
  color: #fff;
}
.plan10-scope .p10-hero .lede {
  font-family: var(--fb);
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(255,255,255,.65);
  margin: 0;
  max-width: 720px;
}
.plan10-scope .p10-hero .eyebrow { color: var(--va); }

/* Eyebrow / Barlow Condensed */
.plan10-scope .eyebrow {
  font-family: var(--fl);
  font-weight: 600;
  font-size: .78rem;
  letter-spacing: .18em;
  text-transform: uppercase;
  margin: 0;
}

/* Breadcrumb */
.plan10-scope .p10-crumb {
  background: var(--vs);
  border-bottom: 1px solid var(--c2);
  padding: 9px 20px;
  font-family: var(--fb);
  font-size: .72rem;
  color: var(--ctxt);
}
.plan10-scope .p10-crumb-inner { max-width: 1100px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.plan10-scope .p10-crumb a { color: var(--ctxt); text-decoration: none; transition: color var(--t); }
.plan10-scope .p10-crumb a:hover { color: var(--vp); }
.plan10-scope .p10-crumb .sep { opacity: .5; }
.plan10-scope .p10-crumb .current { color: var(--preto); font-weight: 500; }

/* Sections */
.plan10-scope .sec { padding: 36px 20px; }
@media (min-width: 768px) { .plan10-scope .sec { padding: 40px 20px; } }
.plan10-scope .sec-alt { background: var(--vs); }
.plan10-scope .sec-dark { background: var(--ve); color: #fff; }
.plan10-scope .sec-dark .eyebrow { color: var(--va); }
.plan10-scope .sec-dark h2, .plan10-scope .sec-dark h3 { color: #fff; }
.plan10-scope .sec-dark p { color: rgba(255,255,255,.72); }

/* Section titles */
.plan10-scope h2.p10-h2 {
  font-family: var(--fd);
  font-weight: 500;
  font-size: clamp(1.5rem, 3vw, 2.15rem);
  line-height: 1.2;
  margin: 10px 0 0;
  letter-spacing: -.005em;
  color: var(--preto);
}
.plan10-scope .sec-dark h2.p10-h2 { color: #fff; }
.plan10-scope .p10-lede {
  font-family: var(--fb);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--ctxt);
  margin: 12px 0 0;
  max-width: 720px;
}
.plan10-scope .sec-dark .p10-lede { color: rgba(255,255,255,.7); }

/* Pills */
.plan10-scope .pill {
  display: inline-flex;
  align-items: center;
  background: #fff;
  border: 1px solid var(--c2);
  border-radius: 20px;
  padding: 6px 12px;
  font-family: var(--fb);
  font-size: .76rem;
  color: var(--preto);
  gap: 6px;
}
.plan10-scope .pill::before { content: '·'; color: var(--va); font-weight: 900; font-size: 1.1rem; line-height: 0; }
.plan10-scope .pills { display: flex; flex-wrap: wrap; gap: 8px; }

/* Toggle Para você / Para empresa */
.plan10-scope .p10-toggle {
  display: inline-flex;
  width: fit-content;
  border: 1.5px solid var(--c2);
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}
.plan10-scope .p10-toggle button {
  padding: 8px 18px;
  font-family: var(--fb);
  font-size: .8rem;
  font-weight: 700;
  color: var(--ctxt);
  background: #fff;
  border: 0;
  cursor: pointer;
  transition: background var(--t), color var(--t);
}
.plan10-scope .p10-toggle button[aria-selected="true"] { background: var(--vp); color: #fff; }

/* Product list (compact) */
.plan10-scope .prod-list { display: flex; flex-direction: column; gap: 10px; }
.plan10-scope .prod-item {
  background: #fff;
  border: 1px solid var(--c2);
  border-radius: var(--r);
  padding: 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: var(--sh);
  transition: transform var(--t), box-shadow var(--t);
}
.plan10-scope .prod-item:hover { transform: translateY(-1px); box-shadow: 0 4px 22px rgba(0,0,0,.10); }
.plan10-scope .prod-item .prod-head { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 10px; }
.plan10-scope .prod-item h3 { font-family: var(--fd); font-weight: 500; font-size: 1.2rem; margin: 0; color: var(--preto); line-height: 1.25; }
.plan10-scope .prod-item .desc { font-family: var(--fb); font-size: .93rem; line-height: 1.55; color: var(--ctxt); margin: 0; }
.plan10-scope .prod-item .prod-meta { font-family: var(--fb); font-size: .82rem; color: var(--ctxt); }
.plan10-scope .prod-item .prod-meta strong { color: var(--preto); font-weight: 600; }
.plan10-scope .prod-item ul { margin: 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 4px 12px; font-family: var(--fb); font-size: .84rem; color: var(--ctxt); }
.plan10-scope .prod-item ul li::before { content: '·'; color: var(--va); margin-right: 6px; }
.plan10-scope .prod-item .prod-ctas { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
.plan10-scope .prod-item .badge {
  font-family: var(--fl);
  font-size: .68rem;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--vp);
  padding: 3px 10px;
  border: 1px solid var(--vp);
  border-radius: 999px;
  font-weight: 600;
}

/* Buttons */
.plan10-scope .btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  border-radius: 8px;
  font-family: var(--fb);
  font-weight: 700;
  font-size: .83rem;
  cursor: pointer;
  border: 1px solid transparent;
  text-decoration: none;
  transition: background var(--t), border-color var(--t), color var(--t), opacity var(--t);
  line-height: 1;
}
.plan10-scope .btn-primary { background: var(--laranja); color: #fff; }
.plan10-scope .btn-primary:hover { background: var(--laranja-hov); }
.plan10-scope .btn-wa { background: var(--wa); color: #fff; }
.plan10-scope .btn-wa:hover { background: var(--wa-hov); }
.plan10-scope .btn-outline-dark { background: transparent; color: #fff; border-color: rgba(255,255,255,.35); }
.plan10-scope .btn-outline-dark:hover { opacity: .75; }
.plan10-scope .btn-outline-light { background: transparent; color: var(--navy); border-color: var(--navy); }
.plan10-scope .btn-outline-light:hover { background: var(--navy); color: #fff; }

/* Focus rings */
.plan10-scope a:focus-visible, .plan10-scope button:focus-visible, .plan10-scope input:focus-visible, .plan10-scope textarea:focus-visible {
  outline: 2px solid var(--va);
  outline-offset: 2px;
}

/* Form panel (inside sec-dark) */
.plan10-scope .p10-form {
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 12px;
  padding: 20px 16px;
  display: grid;
  gap: 14px;
}
.plan10-scope .p10-form label { display: block; }
.plan10-scope .p10-form .eyebrow { color: rgba(255,255,255,.72); margin-bottom: 6px; }
.plan10-scope .p10-form input, .plan10-scope .p10-form textarea {
  width: 100%;
  padding: 11px 12px;
  border-radius: 8px;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.18);
  color: #fff;
  font-family: var(--fb);
  font-size: .95rem;
  outline: none;
  transition: border-color var(--t), background var(--t);
}
.plan10-scope .p10-form input:focus, .plan10-scope .p10-form textarea:focus { border-color: var(--va); background: rgba(255,255,255,.08); }
.plan10-scope .p10-form input::placeholder, .plan10-scope .p10-form textarea::placeholder { color: rgba(255,255,255,.4); }
.plan10-scope .p10-form .row { display: grid; gap: 14px; grid-template-columns: 1fr; }
@media (min-width: 640px) { .plan10-scope .p10-form .row { grid-template-columns: 1fr 1fr; } }
.plan10-scope .p10-form .actions { display: flex; flex-direction: column; gap: 10px; }
@media (min-width: 640px) { .plan10-scope .p10-form .actions { flex-direction: row; } }
.plan10-scope .p10-form .actions .btn { justify-content: center; flex: 1; }
.plan10-scope .p10-form .check { display: flex; gap: 10px; align-items: flex-start; font-size: .85rem; color: rgba(255,255,255,.75); line-height: 1.5; }
.plan10-scope .p10-form .check input { width: auto; margin-top: 3px; }

/* FAQ */
.plan10-scope .p10-faq { display: flex; flex-direction: column; gap: 10px; }
.plan10-scope .p10-faq details {
  background: #fff;
  border: 1px solid var(--c2);
  border-radius: 10px;
  padding: 0;
  transition: box-shadow var(--t);
}
.plan10-scope .p10-faq details[open] { box-shadow: var(--sh); }
.plan10-scope .p10-faq summary {
  list-style: none;
  cursor: pointer;
  padding: 14px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  font-family: var(--fb);
  font-weight: 600;
  font-size: .98rem;
  color: var(--preto);
}
.plan10-scope .p10-faq summary::-webkit-details-marker { display: none; }
.plan10-scope .p10-faq summary::after { content: '+'; color: var(--vp); font-size: 1.4rem; line-height: 1; }
.plan10-scope .p10-faq details[open] summary::after { content: '−'; }
.plan10-scope .p10-faq .ans { padding: 0 18px 16px; font-family: var(--fb); font-size: .93rem; line-height: 1.65; color: var(--ctxt); }

/* Cards (categoria / nucleo) */
.plan10-scope .p10-cards { display: grid; gap: 16px; grid-template-columns: 1fr; }
@media (min-width: 720px) { .plan10-scope .p10-cards { grid-template-columns: repeat(2, minmax(0,1fr)); } }
@media (min-width: 1024px) { .plan10-scope .p10-cards { grid-template-columns: repeat(3, minmax(0,1fr)); } }
.plan10-scope .p10-card {
  background: #fff;
  border: 1px solid var(--c2);
  border-radius: var(--r);
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-decoration: none;
  color: var(--preto);
  min-height: 180px;
  border-top: 3px solid var(--vp);
  transition: transform var(--t), box-shadow var(--t), border-color var(--t);
  box-shadow: var(--sh);
}
.plan10-scope .p10-card:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,0,0,.10); }
.plan10-scope .p10-card h3 { font-family: var(--fd); font-weight: 500; font-size: 1.25rem; margin: 4px 0 0; color: var(--preto); line-height: 1.22; }
.plan10-scope .p10-card p { font-family: var(--fb); font-size: .92rem; line-height: 1.55; color: var(--ctxt); margin: 0; }
.plan10-scope .p10-card .arrow { margin-top: auto; font-family: var(--fl); font-size: .74rem; letter-spacing: .12em; text-transform: uppercase; color: var(--vp); font-weight: 700; }
.plan10-scope .p10-card.disabled { border-top-color: var(--c2); background: var(--c1); opacity: .75; cursor: default; }
.plan10-scope .p10-card.disabled:hover { transform: none; box-shadow: var(--sh); }
.plan10-scope .p10-card.disabled .arrow { color: var(--ctxt); }

/* Cross-selling chips */
.plan10-scope .cross { display: flex; flex-wrap: wrap; gap: 8px; }
.plan10-scope .cross a {
  padding: 9px 16px;
  border-radius: 999px;
  border: 1px solid var(--c2);
  background: #fff;
  color: var(--preto);
  font-family: var(--fb);
  font-size: .86rem;
  text-decoration: none;
  transition: border-color var(--t), color var(--t);
}
.plan10-scope .cross a:hover { border-color: var(--vp); color: var(--vp); }

/* Institucional top bar + Nav global */
.plan10-scope .p10-topbar {
  background: linear-gradient(90deg, #1A1200 0%, #0D0A00 100%);
  padding: 8px 20px;
  color: #fff;
  font-family: var(--fl);
  font-size: .68rem;
  letter-spacing: .14em;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
}
.plan10-scope .p10-topbar .brand { font-weight: 800; color: #fff; letter-spacing: .06em; font-size: .82rem; }
.plan10-scope .p10-topbar .brand .ten { color: #C9A83C; }
.plan10-scope .p10-topbar .trilho { color: rgba(201,168,60,.6); }
.plan10-scope .p10-nav {
  position: sticky;
  top: 0;
  z-index: 30;
  background: var(--navy);
  color: #fff;
  height: 52px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
.plan10-scope .p10-nav-inner { max-width: 1100px; margin: 0 auto; width: 100%; display: flex; align-items: center; justify-content: space-between; }
.plan10-scope .p10-nav .brand {
  font-family: var(--fl);
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: .04em;
  color: #fff;
  text-decoration: none;
}
.plan10-scope .p10-nav .brand .ten { color: var(--vp); }
.plan10-scope .p10-nav a.nav-link {
  color: rgba(255,255,255,.85);
  text-decoration: none;
  font-family: var(--fb);
  font-size: .86rem;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background var(--t), color var(--t);
}
.plan10-scope .p10-nav a.nav-link:hover { background: rgba(255,255,255,.1); color: #fff; }

/* Block spacing rhythm */
.plan10-scope .rhythm > * + * { margin-top: 52px; }

/* Prevent horizontal scroll */
.plan10-scope { overflow-x: hidden; }
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
