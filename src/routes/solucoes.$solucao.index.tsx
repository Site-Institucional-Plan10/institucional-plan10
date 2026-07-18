import { createFileRoute, Link } from "@tanstack/react-router";
import { type Solucao } from "@/data/solutions";
import { Plan10Section, Eyebrow, Display, Breadcrumb } from "@/components/plan10/Shell";
import { FONTS } from "@/lib/plan10";
import { Route as SolucaoRoute } from "./solucoes.$solucao";

export const Route = createFileRoute("/solucoes/$solucao/")({
  component: SolucaoPage,
});

function SolucaoPage() {
  const { solucao } = SolucaoRoute.useLoaderData() as { solucao: Solucao };
  const activeCats = solucao.categorias.filter((c) => c.nucleos.length > 0);
  const wipCats = solucao.categorias.filter((c) => c.nucleos.length === 0);

  return (
    <>
      <Plan10Section cor={solucao.cor}>
        <Breadcrumb items={[{ label: "Soluções", to: "/solucoes" }, { label: solucao.nome }]} />
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 820 }}>
          <Eyebrow color={solucao.cor.accent}>Solução Plan10</Eyebrow>
          <Display>{solucao.hero}</Display>
          <p style={{ fontFamily: FONTS.body, fontSize: "1.1rem", lineHeight: 1.65, opacity: 0.84, margin: 0 }}>
            {solucao.subHero}
          </p>
          <p style={{ fontFamily: FONTS.body, fontSize: "1rem", lineHeight: 1.65, opacity: 0.7, margin: 0, borderLeft: `2px solid ${solucao.cor.accent}`, paddingLeft: 16 }}>
            {solucao.aberturaConsultiva}
          </p>
        </div>
      </Plan10Section>

      <section style={{ background: solucao.cor.soft, padding: "clamp(48px, 8vw, 96px) clamp(20px, 4vw, 40px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, marginBottom: 40 }}>
            <p style={{ fontFamily: FONTS.eyebrow, fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: solucao.cor.primary, margin: "0 0 12px" }}>
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
                params={{ solucao: solucao.slug, categoria: c.slug }}
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
                  borderTop: `2px solid ${solucao.cor.primary}`,
                  minHeight: 180,
                }}
              >
                <h3 style={{ fontFamily: FONTS.display, fontSize: "1.35rem", fontWeight: 500, margin: 0 }}>{c.nome}</h3>
                {c.hero && (
                  <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", lineHeight: 1.55, opacity: 0.75, margin: 0 }}>
                    {c.hero}
                  </p>
                )}
                <span style={{ marginTop: "auto", fontFamily: FONTS.eyebrow, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: solucao.cor.primary }}>
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