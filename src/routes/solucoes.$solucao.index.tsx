import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { findSolucao, type Solucao } from "@/data/solutions";
import { Route as SolucaoRoute } from "./solucoes.$solucao";
import { PageTheme, logoFor } from "@/components/plan10/PageTheme";
import { heroSolucao, contextoDe } from "@/lib/imagery";
import { FIN_HUB } from "@/lib/financasImagery";
import { canonical } from "@/lib/seo";


export const Route = createFileRoute("/solucoes/$solucao/")({
  loader: ({ params }): { solucao: Solucao } => {
    const s = findSolucao(params.solucao);
    if (!s) throw notFound();
    return { solucao: s };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const s = loaderData.solucao;
    const url = canonical(`/solucoes/${s.slug}`);
    return {
      meta: [
        { title: `${s.nome} | Plan10` },
        { name: "description", content: s.subHero },
        { property: "og:title", content: `${s.nome} | Plan10` },
        { property: "og:description", content: s.subHero },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Plan10" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: SolucaoPage,
});

function SolucaoPage() {
  const { solucao } = SolucaoRoute.useLoaderData() as { solucao: Solucao };
  
  // Financeiro tem imagens temáticas próprias; as demais soluções seguem o pool.
  const heroImg = solucao.slug === "financeiras" ? FIN_HUB.hero : heroSolucao(solucao.slug);
  const ctxImg = solucao.slug === "financeiras" ? FIN_HUB.ctx : contextoDe(solucao.slug, 0, heroImg.src);
  const activeCats = solucao.categorias.filter((c) => c.nucleos.length > 0);
  const wipCats = solucao.categorias.filter((c) => c.nucleos.length === 0);
  const logo = logoFor(solucao.slug);

  return (
    <PageTheme slug={solucao.slug}>
      <header className="p10-hero has-img">
        <div className="p10-hero-bg" aria-hidden>
          <img src={heroImg.src} alt="" loading="eager" />
        </div>
        <div className="p10-hero-inner">
          {logo && <img src={logo} alt={`Logo ${solucao.nome}`} className="p10-hero-logo" />}
          <p className="eyebrow">Solução Plan10</p>
          <h1>{solucao.hero}</h1>
          <p className="lede">{solucao.subHero}</p>
        </div>
      </header>

      <nav className="p10-crumb" aria-label="Trilha">
        <div className="p10-crumb-inner">
          <Link to="/solucoes">Soluções</Link>
          <span className="sep">/</span>
          <span className="current">{solucao.nome}</span>
        </div>
      </nav>

      {/* Caminhos disponíveis, logo abaixo do hero */}
      <section className="sec">
        <div className="wrap">
          <p className="eyebrow">Caminhos disponíveis</p>
          <h2 className="p10-h2" style={{ marginBottom: 28 }}>Escolha por onde começar</h2>
          <div className="p10-cards">
            {activeCats.map((c) => (
              <Link
                key={c.slug}
                to="/solucoes/$solucao/$categoria"
                params={{ solucao: solucao.slug, categoria: c.slug }}
                className="p10-card"
              >
                <h3>{c.nome}</h3>
                <span className="arrow">Explorar →</span>
              </Link>
            ))}
            {wipCats.map((c) => (
              <div key={c.slug} className="p10-card disabled" aria-disabled="true">
                <h3>{c.nome}</h3>
                <span className="arrow">Em breve</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contexto: abertura consultiva + imagem editorial */}
      <section className="sec sec-alt">
        <div className="wrap p10-split">
          <p style={{ fontFamily: "var(--fd)", fontSize: "clamp(1.35rem, 2.6vw, 2rem)", lineHeight: 1.3, fontWeight: 500, color: "var(--preto)", letterSpacing: "-.015em", margin: 0 }}>
            {solucao.aberturaConsultiva}
          </p>
          <figure className="p10-fig">
            <img src={ctxImg.src} alt={ctxImg.alt} loading="lazy" />
          </figure>
        </div>
      </section>
    </PageTheme>
  );
}
