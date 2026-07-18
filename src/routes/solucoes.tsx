import { createFileRoute, Link } from "@tanstack/react-router";
import { solutions } from "@/data/solutions";
import { Plan10Section, Eyebrow, Display, H2 } from "@/components/plan10/Shell";
import { FONTS } from "@/lib/plan10";

export const Route = createFileRoute("/solucoes")({
  head: () => ({
    meta: [
      { title: "Soluções Plan10, consultoria em proteção e planejamento" },
      {
        name: "description",
        content:
          "As 5 Soluções Plan10, saúde, proteção, financeiras, crescimento e assistência.",
      },
      { property: "og:title", content: "Soluções Plan10" },
      { property: "og:description", content: "As 5 Soluções Plan10 para pessoas, famílias e empresas." },
      { property: "og:url", content: "https://plan10.com.br/solucoes" },
    ],
    links: [{ rel: "canonical", href: "https://plan10.com.br/solucoes" }],
  }),
  component: SolucoesIndex,
});

const dark = "#10141A";

function SolucoesIndex() {
  return (
    <>
      <Plan10Section cor={{ bg: dark, primary: "#5A6B7B", accent: "#C9A83C", soft: "#F1EFE9" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 780 }}>
          <Eyebrow color="#C9A83C">As Soluções Plan10</Eyebrow>
          <Display>Cinco caminhos para organizar proteção, saúde e planejamento com critério</Display>
          <p style={{ fontFamily: FONTS.body, fontSize: "1.1rem", lineHeight: 1.6, opacity: 0.82, margin: 0 }}>
            Cada solução reúne caminhos e opções cuidadosamente organizados para atender o momento
            de pessoas, famílias e empresas.
          </p>
        </div>
      </Plan10Section>

      <section style={{ background: "#F6F1E7", padding: "clamp(48px, 8vw, 96px) clamp(20px, 4vw, 40px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {solutions.map((s) => (
            <Link
              key={s.slug}
              to="/solucoes/$solucao"
              params={{ solucao: s.slug }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                padding: 32,
                background: s.cor.bg,
                color: "#F6F1E7",
                borderRadius: 8,
                textDecoration: "none",
                borderTop: `2px solid ${s.cor.accent}`,
                minHeight: 220,
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.eyebrow,
                  fontSize: "0.72rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: s.cor.accent,
                }}
              >
                Solução
              </span>
              <h2 style={{ fontFamily: FONTS.display, fontSize: "1.6rem", fontWeight: 500, margin: 0, lineHeight: 1.15 }}>
                {s.nome}
              </h2>
              <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", lineHeight: 1.55, opacity: 0.82, margin: 0 }}>
                {s.subHero}
              </p>
              <span style={{ marginTop: "auto", fontFamily: FONTS.eyebrow, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: s.cor.accent }}>
                Conhecer →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Plan10Section cor={{ bg: dark, primary: "#5A6B7B", accent: "#C9A83C", soft: "#F1EFE9" }}>
        <H2>Consultoria orientada por método</H2>
        <p style={{ fontFamily: FONTS.body, fontSize: "1.05rem", lineHeight: 1.65, opacity: 0.82, maxWidth: 720, marginTop: 20 }}>
          A Plan10 trabalha com escuta, contexto e critério. Cada solução é apresentada com abertura
          consultiva, para que a escolha seja informada e alinhada ao seu momento.
        </p>
      </Plan10Section>
    </>
  );
}
