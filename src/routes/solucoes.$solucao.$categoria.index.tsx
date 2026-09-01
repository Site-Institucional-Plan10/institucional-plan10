import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { findCategoria, type Solucao, type Categoria } from "@/data/solutions";
import { Route as CategoriaRoute } from "./solucoes.$solucao.$categoria";
import { PageTheme } from "@/components/plan10/PageTheme";
import { finContentFor } from "@/data/financasContent";
import { heroCategoria, contextoDe } from "@/lib/imagery";
import { finCategoriaImgs } from "@/lib/financasImagery";
import { canonical } from "@/lib/seo";


const splitDots = (s: string) => s.split("·").map((x) => x.trim()).filter(Boolean);
const hasDots = (s: string) => s.includes("·");

export const Route = createFileRoute("/solucoes/$solucao/$categoria/")({
  loader: ({ params }): { solucao: Solucao; categoria: Categoria } => {
    const found = findCategoria(params.solucao, params.categoria);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { solucao: s, categoria: c } = loaderData;
    const url = canonical(`/solucoes/${s.slug}/${c.slug}`);
    const fin = finContentFor(c.slug);
    const desc = (fin?.hero || c.hero || s.subHero).slice(0, 300);
    return {
      meta: [
        { title: `${c.nome} | ${s.nome} | Plan10` },
        { name: "description", content: desc },
        { property: "og:title", content: `${c.nome} | ${s.nome} | Plan10` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Plan10" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: CategoriaPage,
});

function CategoriaPage() {
  const { solucao: s, categoria: c } = CategoriaRoute.useLoaderData() as { solucao: Solucao; categoria: Categoria };
  const fin = s.slug === "financeiras" ? finContentFor(c.slug) : undefined;

  // Financeiro usa imagens temáticas por categoria; as demais soluções seguem o pool.
  const iCat = Math.max(0, s.categorias.findIndex((x) => x.slug === c.slug));
  const finImgs = s.slug === "financeiras" ? finCategoriaImgs(c.slug) : null;
  const heroImg = finImgs?.hero ?? heroCategoria(s.slug, iCat);
  const ctxImg = finImgs?.ctx ?? contextoDe(s.slug, iCat, heroImg.src);

  const nucleos = (
    <div className="p10-cards">
      {c.nucleos.map((n) => (
        <Link
          key={n.slug}
          to="/solucoes/$solucao/$categoria/$nucleo"
          params={{ solucao: s.slug, categoria: c.slug, nucleo: n.slug }}
          className="p10-card"
        >
          <h3>{n.nome}</h3>
          {n.hero && <p>{n.hero}</p>}
          <span className="arrow">Ver opções →</span>
        </Link>
      ))}
    </div>
  );

  // Layout genérico (demais soluções, sem conteúdo consultivo dedicado ainda).
  if (!fin) {
    return (
      <PageTheme slug={s.slug}>
        <header className="p10-hero has-img">
          <div className="p10-hero-bg" aria-hidden>
            <img src={heroImg.src} alt="" loading="eager" />
          </div>
          <div className="p10-hero-inner">
            <p className="eyebrow">{s.nome}</p>
            <h1>{c.nome}</h1>
            {c.hero && <p className="lede">{c.hero}</p>}
          </div>
        </header>
        <Crumb s={s} c={c} />
        <section className="sec sec-alt">
          <div className="wrap">
            <p className="eyebrow" style={{ color: "var(--vp)" }}>Modalidades</p>
            <h2 className="p10-h2" style={{ marginBottom: 24 }}>Escolha uma modalidade para explorar</h2>
            {nucleos}
          </div>
        </section>
      </PageTheme>
    );
  }

  // Layout financeiro enriquecido, funil consultivo.
  const modal = splitDots(fin.modalidades);
  const valorPlacards = hasDots(fin.valor) ? splitDots(fin.valor) : null;
  const primeiroNucleo = c.nucleos[0];

  return (
    <PageTheme slug={s.slug}>
      <header className="p10-hero has-img">
        <div className="p10-hero-bg" aria-hidden>
          <img src={heroImg.src} alt="" loading="eager" />
        </div>
        <div className="p10-hero-inner">
          <p className="eyebrow">Soluções financeiras</p>
          <h1>{c.nome}</h1>
          <p className="lede">{fin.hero}</p>
        </div>
      </header>

      <Crumb s={s} c={c} />

      {/* Caminhos: conversão primeiro, logo abaixo do hero */}
      <section className="sec">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "var(--vp)" }}>
            {c.nucleos.length > 1 ? "Escolha um caminho" : "Comece por aqui"}
          </p>
          <h2 className="p10-h2" style={{ marginBottom: 26 }}>
            {c.nucleos.length > 1 ? "Por onde você quer começar" : "Veja as opções disponíveis"}
          </h2>
          {nucleos}
        </div>
      </section>

      {/* Entenda a decisão: abertura, sub-hero, imagem, critérios e modalidades */}
      <section className="sec sec-alt">
        <div className="wrap rhythm">
          <div className="p10-split">
            <div>
              <p className="eyebrow" style={{ color: "var(--vp)" }}>Entenda a decisão</p>
              <p style={{ fontFamily: "var(--fd)", fontSize: "clamp(1.2rem, 2.2vw, 1.65rem)", lineHeight: 1.38, fontWeight: 500, color: "var(--preto)", letterSpacing: "-.015em", margin: "12px 0 0" }}>{fin.abertura}</p>
              {fin.subHero && <p className="p10-lede" style={{ marginTop: 16 }}>{fin.subHero}</p>}
            </div>
            <figure className="p10-fig">
              <img src={ctxImg.src} alt={ctxImg.alt} loading="lazy" />
            </figure>
          </div>
          <div>
            <p className="eyebrow" style={{ color: "var(--vp)" }}>Quando faz sentido</p>
            <div className="p10-note" style={{ marginTop: 12 }}><p>{fin.criterios}</p></div>
            {modal.length > 0 && (
              <div className="p10-strip">
                {modal.map((m) => <span key={m}>{m}</span>)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* O que você ganha: bloco de valor em faixa escura (contraste e vida) */}
      <section className="sec sec-dark">
        <div className="wrap">
          <p className="eyebrow">O que você ganha</p>
          {valorPlacards ? (
            <>
              <h2 className="p10-h2" style={{ marginBottom: 4 }}>Uma decisão com mais controle</h2>
              <div className={`p10-placards${valorPlacards.length === 4 ? " cols-4" : ""}`}>
                {valorPlacards.map((v, i) => (
                  <div key={v} className="p10-placard">
                    <span className="n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="txt">{v}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h2 className="p10-h2" style={{ maxWidth: "20ch" }}>{fin.valor}</h2>
          )}
          {fin.textoConsultivo && <p className="p10-lede" style={{ marginTop: 18 }}>{fin.textoConsultivo}</p>}
        </div>
      </section>

      {/* FAQ */}
      {fin.faq.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <p className="eyebrow" style={{ color: "var(--vp)" }}>Perguntas frequentes</p>
            <h2 className="p10-h2" style={{ marginBottom: 26 }}>Antes de decidir</h2>
            <div className="p10-faq">
              {fin.faq.map((f, i) => (
                <details key={i}>
                  <summary>{f.q}</summary>
                  <div className="ans">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Próximo passo + conexões */}
      <section className="sec sec-dark">
        <div className="wrap" style={{ display: "grid", gap: 28 }}>
          <div>
            <p className="eyebrow">Próximo passo</p>
            <h2 className="p10-h2">Veja as opções com orientação</h2>
            <p className="p10-lede">Escolha uma linha e avance com o apoio de um consultor, sem compromisso.</p>
          </div>
          {primeiroNucleo && (
            <Link
              to="/solucoes/$solucao/$categoria/$nucleo"
              params={{ solucao: s.slug, categoria: c.slug, nucleo: primeiroNucleo.slug }}
              className="btn btn-primary"
              style={{ justifySelf: "start" }}
            >
              Ver as opções →
            </Link>
          )}
          {fin.cross.length > 0 && (
            <div style={{ borderTop: "1px solid rgba(244,240,232,.16)", paddingTop: 22 }}>
              <p className="eyebrow" style={{ marginBottom: 12 }}>Também pode fazer sentido</p>
              <div style={{ display: "grid", gap: 10, maxWidth: 760 }}>
                {fin.cross.map((cx) => (
                  <p key={cx} style={{ fontFamily: "var(--fb)", fontSize: ".95rem", lineHeight: 1.55, color: "rgba(244,240,232,.78)", margin: 0 }}>{cx}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageTheme>
  );
}

function Crumb({ s, c }: { s: Solucao; c: Categoria }) {
  return (
    <nav className="p10-crumb" aria-label="Trilha">
      <div className="p10-crumb-inner">
        <Link to="/solucoes">Soluções</Link>
        <span className="sep">/</span>
        <Link to="/solucoes/$solucao" params={{ solucao: s.slug }}>{s.nome}</Link>
        <span className="sep">/</span>
        <span className="current">{c.nome}</span>
      </div>
    </nav>
  );
}
