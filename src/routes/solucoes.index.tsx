import { createFileRoute, Link } from "@tanstack/react-router";
import { solutions } from "@/data/solutions";
import { PageTheme, HUB_PALETTE, paletteFor } from "@/components/plan10/PageTheme";
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/solucoes/")({
  head: () => ({
    meta: [
      { title: "Soluções Plan10, consultoria em proteção e planejamento" },
      { name: "description", content: "As 5 Soluções Plan10, saúde, proteção, financeiras, crescimento e assistência, conectadas em uma jornada consultiva." },
      { property: "og:title", content: "Soluções Plan10" },
      { property: "og:description", content: "As 5 Soluções Plan10 para pessoas, famílias e empresas." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Plan10" },
      { property: "og:url", content: canonical("/solucoes") },
    ],
    links: [{ rel: "canonical", href: canonical("/solucoes") }],
  }),
  component: SolucoesIndex,
});

function SolucoesIndex() {
  return (
    <PageTheme palette={HUB_PALETTE}>
      {/* Hero, fala premium oficial (arquivo 05) */}
      <header className="p10-hero">
        <div className="p10-hero-inner">
          <p className="eyebrow">As Soluções Plan10</p>
          <h1>Soluções Plan10 para cada fase da vida e dos negócios.</h1>
          <p className="lede">
            Saúde, proteção, finanças, crescimento e assistência conectados em uma única
            jornada consultiva, para pessoas, famílias e empresas.
          </p>
        </div>
      </header>

      {/* Cards das soluções, sobre creme */}
      <section className="sec">
        <div className="wrap p10-cards">
          {solutions.map((s) => {
            const ativa = s.categorias.some((c) => c.nucleos.length > 0);
            const p = paletteFor(s.slug);
            const cardVars = {
              "--vp": p.vp,
              "--va": p.va,
            } as React.CSSProperties;
            if (ativa) {
              return (
                <Link
                  key={s.slug}
                  to="/solucoes/$solucao"
                  params={{ solucao: s.slug }}
                  className="p10-card"
                  style={cardVars}
                >
                  <h3>{s.nome}</h3>
                  <p>{s.subHero}</p>
                  <span className="arrow" style={{ color: p.vp }}>Conhecer →</span>
                </Link>
              );
            }
            return (
              <div key={s.slug} className="p10-card disabled" aria-disabled="true">
                <p className="eyebrow" style={{ color: "#8A7A3A" }}>Em preparação</p>
                <h3>{s.nome}</h3>
                <p>{s.subHero}</p>
                <span className="arrow">Em breve</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Fecho editorial */}
      <section className="sec sec-dark">
        <div className="wrap">
          <p className="eyebrow">Método Plan10</p>
          <h2 className="p10-h2">Consultoria orientada por método</h2>
          <p className="p10-lede">
            A Plan10 trabalha com escuta, contexto e critério. Cada solução é apresentada com abertura
            consultiva, para que a escolha seja informada e alinhada ao seu momento.
          </p>
        </div>
      </section>
    </PageTheme>
  );
}
