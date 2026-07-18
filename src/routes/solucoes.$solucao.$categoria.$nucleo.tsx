import { useMemo, useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { findNucleo } from "@/data/solutions";
import { Plan10Section, Eyebrow, Display, H2, Breadcrumb, Pill } from "@/components/plan10/Shell";
import { PerfilToggle } from "@/components/plan10/PerfilToggle";
import { ProductCard } from "@/components/plan10/ProductCard";
import { LeadForm } from "@/components/plan10/LeadForm";
import { FaqAccordion } from "@/components/plan10/FaqAccordion";
import { FONTS, whatsappUrl } from "@/lib/plan10";

export const Route = createFileRoute("/solucoes/$solucao/$categoria/$nucleo")({
  loader: ({ params }) => {
    const found = findNucleo(params.solucao, params.categoria, params.nucleo);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Não encontrado" }, { name: "robots", content: "noindex" }] };
    const { solucao: s, categoria: c, nucleo: n } = loaderData;
    const url = `https://plan10.com.br/solucoes/${s.slug}/${c.slug}/${n.slug}`;
    return {
      meta: [
        { title: `${n.nome} | ${c.nome} | Plan10` },
        { name: "description", content: n.hero },
        { property: "og:title", content: `${n.nome} | Plan10` },
        { property: "og:description", content: n.hero },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: NucleoPage,
  notFoundComponent: () => (
    <div style={{ padding: 80, textAlign: "center", fontFamily: FONTS.body }}>Página não encontrada.</div>
  ),
});

function NucleoPage() {
  const { solucao: s, categoria: c, nucleo: n } = Route.useLoaderData() as {
    solucao: Solucao;
    categoria: Categoria;
    nucleo: Nucleo;
  };
  const [perfil, setPerfil] = useState<"PF" | "PJ">("PF");
  const filtered = useMemo(() => n.products.filter((p) => p.perfil === perfil), [n, perfil]);

  const faqAll = useMemo(
    () => n.products.flatMap((p) => p.faq),
    [n],
  );

  const scrollTo = (id: string) => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* 1. Breadcrumb + Hero */}
      <Plan10Section cor={s.cor}>
        <Breadcrumb
          items={[
            { label: "Soluções", to: "/solucoes" },
            { label: s.nome, to: "/solucoes/$solucao", params: { solucao: s.slug } },
            { label: c.nome, to: "/solucoes/$solucao/$categoria", params: { solucao: s.slug, categoria: c.slug } },
            { label: n.nome },
          ]}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 820 }}>
          <Eyebrow color={s.cor.accent}>{c.nome}</Eyebrow>
          <Display>{n.nome}</Display>
          <p style={{ fontFamily: FONTS.body, fontSize: "1.15rem", lineHeight: 1.6, opacity: 0.88, margin: 0 }}>
            {n.hero}
          </p>
        </div>

        {/* 2. Abertura consultiva */}
        <div
          style={{
            marginTop: 40,
            padding: "24px 28px",
            borderLeft: `2px solid ${s.cor.accent}`,
            background: "rgba(246,241,231,0.04)",
            borderRadius: "0 8px 8px 0",
            maxWidth: 820,
          }}
        >
          <p style={{ fontFamily: FONTS.body, fontSize: "1rem", lineHeight: 1.65, margin: 0, opacity: 0.82 }}>
            {n.aberturaConsultiva}
          </p>
        </div>

        {/* 3. Seletor */}
        <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={{ fontFamily: FONTS.eyebrow, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(246,241,231,0.6)", margin: 0 }}>
            Perfil
          </p>
          <PerfilToggle value={perfil} onChange={setPerfil} accent={s.cor.accent} />
        </div>

        {/* 4. Bloco de valor */}
        {n.blocoValor.length > 0 && (
          <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {n.blocoValor.map((b) => (
              <Pill key={b} color={s.cor.accent}>{b}</Pill>
            ))}
          </div>
        )}
      </Plan10Section>

      {/* 5. Produtos embutidos */}
      <Plan10Section cor={s.cor} style={{ paddingTop: 0 }}>
        <div id="opcoes" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 20, flexWrap: "wrap" }}>
            <H2>Opções disponíveis</H2>
            <span style={{ fontFamily: FONTS.eyebrow, fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.6 }}>
              {filtered.length} {filtered.length === 1 ? "opção" : "opções"} para {perfil === "PF" ? "você" : "empresa"}
            </span>
          </div>
          {filtered.length === 0 ? (
            <p style={{ fontFamily: FONTS.body, opacity: 0.7, margin: 0 }}>
              Ainda não há opções nesse perfil. Troque o seletor ou fale com um consultor.
            </p>
          ) : (
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  accent={s.cor.accent}
                  primary={s.cor.primary}
                  nucleoNome={n.nome}
                  onPrimary={() => scrollTo("contato")}
                />
              ))}
            </div>
          )}
        </div>
      </Plan10Section>

      {/* 6 e 7. Por que + fechamento */}
      <section style={{ background: s.cor.soft, padding: "clamp(56px, 9vw, 112px) clamp(20px, 4vw, 40px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}>
          <p style={{ fontFamily: FONTS.eyebrow, fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: s.cor.primary, margin: 0 }}>
            Por que este caminho
          </p>
          <p style={{ fontFamily: FONTS.display, fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)", lineHeight: 1.35, fontWeight: 500, color: "#10141A", margin: 0 }}>
            {n.porque}
          </p>
          <p style={{ fontFamily: FONTS.body, fontSize: "1.05rem", lineHeight: 1.65, color: "rgba(16,20,26,0.72)", margin: 0, borderTop: `1px solid ${s.cor.primary}33`, paddingTop: 20 }}>
            {n.fechamento}
          </p>
        </div>
      </section>

      {/* 8. Formulário */}
      <Plan10Section cor={s.cor}>
        <div id="contato" style={{ display: "grid", gap: 40, gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            <Eyebrow color={s.cor.accent}>Fale com a Plan10</Eyebrow>
            <H2>Um consultor retorna com o próximo passo</H2>
            <p style={{ fontFamily: FONTS.body, fontSize: "1rem", lineHeight: 1.65, opacity: 0.82, margin: 0 }}>
              Conte seu momento. A resposta é orientada, sem excesso comercial.
            </p>
          </div>
          <LeadForm
            interesse={n.nome}
            perfilInicial={perfil}
            accent={s.cor.accent}
            primary={s.cor.primary}
            origem={`/solucoes/${s.slug}/${c.slug}/${n.slug}`}
          />
        </div>
      </Plan10Section>

      {/* 9. Cross-selling */}
      {(() => {
        const cross = Array.from(new Set(n.products.flatMap((p) => p.crossSelling))).slice(0, 2);
        if (!cross.length) return null;
        return (
          <section style={{ background: "#10141A", padding: "clamp(40px, 6vw, 72px) clamp(20px, 4vw, 40px)", color: "#F6F1E7" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ fontFamily: FONTS.eyebrow, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#C9A83C", margin: 0 }}>
                Conexões próximas
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {cross.map((cs) => (
                  <a
                    key={cs}
                    href={whatsappUrl(`Olá! Também tenho interesse em ${cs}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "10px 18px",
                      borderRadius: 8,
                      border: "1px solid rgba(246,241,231,0.2)",
                      color: "#F6F1E7",
                      fontFamily: FONTS.body,
                      fontSize: "0.9rem",
                      textDecoration: "none",
                    }}
                  >
                    {cs}
                  </a>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* 10. FAQ */}
      {faqAll.length > 0 && (
        <Plan10Section cor={s.cor}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 860 }}>
            <Eyebrow color={s.cor.accent}>Perguntas frequentes</Eyebrow>
            <H2>Antes de decidir</H2>
            <FaqAccordion items={faqAll} accent={s.cor.accent} />
          </div>
        </Plan10Section>
      )}
    </>
  );
}
