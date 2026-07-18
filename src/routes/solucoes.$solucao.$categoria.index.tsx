import { createFileRoute, Link } from "@tanstack/react-router";
import { type Solucao, type Categoria } from "@/data/solutions";
import { Plan10Section, Eyebrow, Display, Breadcrumb } from "@/components/plan10/Shell";
import { FONTS } from "@/lib/plan10";
import { Route as CategoriaRoute } from "./solucoes.$solucao.$categoria";

export const Route = createFileRoute("/solucoes/$solucao/$categoria/")({
  component: CategoriaPage,
});

function CategoriaPage() {
  const { solucao: s, categoria: c } = CategoriaRoute.useLoaderData() as { solucao: Solucao; categoria: Categoria };
  return (
    <>
      <Plan10Section cor={s.cor}>
        <Breadcrumb
          items={[
            { label: "Soluções", to: "/solucoes" },
            { label: s.nome, to: "/solucoes/$solucao", params: { solucao: s.slug } },
            { label: c.nome },
          ]}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 820 }}>
          <Eyebrow color={s.cor.accent}>{s.nome}</Eyebrow>
          <Display>{c.nome}</Display>
          {c.hero && (
            <p style={{ fontFamily: FONTS.body, fontSize: "1.1rem", lineHeight: 1.65, opacity: 0.84, margin: 0 }}>
              {c.hero}
            </p>
          )}
        </div>
      </Plan10Section>

      <section style={{ background: s.cor.soft, padding: "clamp(48px, 8vw, 96px) clamp(20px, 4vw, 40px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {c.nucleos.map((n) => (
            <Link
              key={n.slug}
              to="/solucoes/$solucao/$categoria/$nucleo"
              params={{ solucao: s.slug, categoria: c.slug, nucleo: n.slug }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                padding: 32,
                background: "#FFFFFF",
                color: "#10141A",
                textDecoration: "none",
                borderRadius: 8,
                border: "1px solid rgba(16,20,26,0.08)",
                borderTop: `2px solid ${s.cor.primary}`,
                minHeight: 220,
              }}
            >
              <h2 style={{ fontFamily: FONTS.display, fontSize: "1.5rem", fontWeight: 500, margin: 0, lineHeight: 1.2 }}>
                {n.nome}
              </h2>
              <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", lineHeight: 1.6, opacity: 0.78, margin: 0 }}>
                {n.hero}
              </p>
              <span style={{ marginTop: "auto", fontFamily: FONTS.eyebrow, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: s.cor.primary }}>
                Ver opções →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}