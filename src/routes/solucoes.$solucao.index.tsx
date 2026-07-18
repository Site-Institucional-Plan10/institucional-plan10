import { createFileRoute, Link } from "@tanstack/react-router";
import { type Solucao } from "@/data/solutions";
import { Route as SolucaoRoute } from "./solucoes.$solucao";
import { PageTheme, logoFor } from "@/components/plan10/PageTheme";

export const Route = createFileRoute("/solucoes/$solucao/")({
  component: SolucaoPage,
});

function SolucaoPage() {
  const { solucao } = SolucaoRoute.useLoaderData() as { solucao: Solucao };
  const activeCats = solucao.categorias.filter((c) => c.nucleos.length > 0);
  const wipCats = solucao.categorias.filter((c) => c.nucleos.length === 0);
  const logo = logoFor(solucao.slug);

  return (
    <PageTheme slug={solucao.slug}>
      <header className="p10-hero">
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

      {/* Abertura consultiva */}
      <section className="sec sec-alt">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "var(--vp)" }}>Abertura consultiva</p>
          <p className="p10-lede" style={{ fontSize: "1.05rem", color: "var(--preto)", maxWidth: 820 }}>
            {solucao.aberturaConsultiva}
          </p>
        </div>
      </section>

      {/* Categorias */}
      <section className="sec">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "var(--vp)" }}>Caminhos disponíveis</p>
          <h2 className="p10-h2" style={{ marginBottom: 24 }}>Escolha por onde começar</h2>
          <div className="p10-cards">
            {activeCats.map((c) => (
              <Link
                key={c.slug}
                to="/solucoes/$solucao/$categoria"
                params={{ solucao: solucao.slug, categoria: c.slug }}
                className="p10-card"
              >
                <p className="eyebrow" style={{ color: "var(--vp)" }}>Categoria</p>
                <h3>{c.nome}</h3>
                {c.hero && <p>{c.hero}</p>}
                <span className="arrow">Explorar →</span>
              </Link>
            ))}
            {wipCats.map((c) => (
              <div key={c.slug} className="p10-card disabled" aria-disabled="true">
                <p className="eyebrow">Em preparação</p>
                <h3>{c.nome}</h3>
                <span className="arrow">Em breve</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTheme>
  );
}
