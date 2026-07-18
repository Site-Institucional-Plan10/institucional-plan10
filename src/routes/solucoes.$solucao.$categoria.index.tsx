import { createFileRoute, Link } from "@tanstack/react-router";
import { type Solucao, type Categoria } from "@/data/solutions";
import { Route as CategoriaRoute } from "./solucoes.$solucao.$categoria";
import { PageTheme } from "@/components/plan10/PageTheme";

export const Route = createFileRoute("/solucoes/$solucao/$categoria/")({
  component: CategoriaPage,
});

function CategoriaPage() {
  const { solucao: s, categoria: c } = CategoriaRoute.useLoaderData() as { solucao: Solucao; categoria: Categoria };
  return (
    <PageTheme slug={s.slug}>
      <header className="p10-hero">
        <div className="p10-hero-inner">
          <p className="eyebrow">{s.nome}</p>
          <h1>{c.nome}</h1>
          {c.hero && <p className="lede">{c.hero}</p>}
        </div>
      </header>

      <nav className="p10-crumb" aria-label="Trilha">
        <div className="p10-crumb-inner">
          <Link to="/solucoes">Soluções</Link>
          <span className="sep">/</span>
          <Link to="/solucoes/$solucao" params={{ solucao: s.slug }}>{s.nome}</Link>
          <span className="sep">/</span>
          <span className="current">{c.nome}</span>
        </div>
      </nav>

      <section className="sec sec-alt">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "var(--vp)" }}>Núcleos</p>
          <h2 className="p10-h2" style={{ marginBottom: 24 }}>Escolha um núcleo para explorar</h2>
          <div className="p10-cards">
            {c.nucleos.map((n) => (
              <Link
                key={n.slug}
                to="/solucoes/$solucao/$categoria/$nucleo"
                params={{ solucao: s.slug, categoria: c.slug, nucleo: n.slug }}
                className="p10-card"
              >
                <p className="eyebrow" style={{ color: "var(--vp)" }}>Núcleo</p>
                <h3>{n.nome}</h3>
                <p>{n.hero}</p>
                <span className="arrow">Ver opções →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageTheme>
  );
}
