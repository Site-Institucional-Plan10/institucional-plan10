import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findSolucao, type Solucao } from "@/data/solutions";
import { Plan10Section, Eyebrow, Display, Breadcrumb } from "@/components/plan10/Shell";
import { FONTS } from "@/lib/plan10";

export const Route = createFileRoute("/solucoes/$solucao")({
  loader: ({ params }): { solucao: Solucao } => {
    const s = findSolucao(params.solucao);
    if (!s) throw notFound();
    return { solucao: s };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Solução não encontrada" }, { name: "robots", content: "noindex" }] };
    const s = loaderData.solucao;
    return {
      meta: [
        { title: `${s.nome} | Plan10` },
        { name: "description", content: s.subHero },
        { property: "og:title", content: `${s.nome} | Plan10` },
        { property: "og:description", content: s.subHero },
        { property: "og:url", content: `https://plan10.com.br/solucoes/${s.slug}` },
      ],
      links: [{ rel: "canonical", href: `https://plan10.com.br/solucoes/${s.slug}` }],
    };
  },
  component: SolucaoPage,
  notFoundComponent: () => (
    <div style={{ padding: 80, textAlign: "center", fontFamily: FONTS.body }}>Solução não encontrada.</div>
  ),
});

function SolucaoPage() {
  const { solucao: s } = Route.useLoaderData() as { solucao: Solucao };
  const activeCats = s.categorias.filter((c) => c.nucleos.length > 0);
  const wipCats = s.categorias.filter((c) => c.nucleos.length === 0);

  return (
    <>
      <Plan10Section cor={s.cor}>
        <Breadcrumb items={[{ label: "Soluções", to: "/solucoes" }, { label: s.nome }]} />
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 820 }}>
          <Eyebrow color={s.cor.accent}>Solução Plan10</Eyebrow>
          <Display>{s.hero}</Display>
          <p style={{ fontFamily: FONTS.body, fontSize: "1.1rem", lineHeight: 1.65, opacity: 0.84, margin: 0 }}>
            {s.subHero}
          </p>
          <p style={{ fontFamily: FONTS.body, fontSize: "1rem", lineHeight: 1.65, opacity: 0.7, margin: 0, borderLeft: `2px solid ${s.cor.accent}`, paddingLeft: 16 }}>
            {s.aberturaConsultiva}
          </p>
        </div>
      </Plan10Section>

      <section style={{ background: s.cor.soft, padding: "clamp(48px, 8vw, 96px) clamp(20px, 4vw, 40px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, marginBottom: 40 }}>
            <p style={{ fontFamily: FONTS.eyebrow, fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: s.cor.primary, margin: "0 0 12px" }}>
              Caminhos disponíveis
            </p>
            <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", lineHeight: 1.2, fontWeight: 500, color: "#10141A", margin: 0 }}>
              Escolha por onde começar
            </h2>
          </div>
          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {activeCats.map((c) => (
              <Link
                key={c.slug}
                to="/solucoes/$solucao/$categoria"
                params={{ solucao: s.slug, categoria: c.slug }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  padding: 28,
                  borderRadius: 8,
                  background: "#FFFFFF",
                  color: "#10141A",
                  textDecoration: "none",
                  border: "1px solid rgba(16,20,26,0.08)",
                  borderTop: `2px solid ${s.cor.primary}`,
                  minHeight: 180,
                }}
              >
                <h3 style={{ fontFamily: FONTS.display, fontSize: "1.35rem", fontWeight: 500, margin: 0 }}>{c.nome}</h3>
                {c.hero && (
                  <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", lineHeight: 1.55, opacity: 0.75, margin: 0 }}>
                    {c.hero}
                  </p>
                )}
                <span style={{ marginTop: "auto", fontFamily: FONTS.eyebrow, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: s.cor.primary }}>
                  Explorar →
                </span>
              </Link>
            ))}
            {wipCats.map((c) => (
              <div
                key={c.slug}
                style={{
                  padding: 28,
                  borderRadius: 8,
                  background: "#FFFFFF",
                  color: "#10141A",
                  border: "1px dashed rgba(16,20,26,0.15)",
                  opacity: 0.55,
                  minHeight: 180,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <h3 style={{ fontFamily: FONTS.display, fontSize: "1.25rem", fontWeight: 500, margin: 0 }}>{c.nome}</h3>
                <span style={{ marginTop: "auto", fontFamily: FONTS.eyebrow, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.8 }}>
                  Em preparação
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
