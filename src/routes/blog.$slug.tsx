import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { blogArticles, blogCategoryFor } from "@/data/blogArticles";
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const article = blogArticles.find((a) => a.slug === params.slug);
    const url = canonical(`/blog/${params.slug}`);
    const title = article ? `${article.seoTitle || article.title} | Blog Plan10` : "Blog Plan10";
    const description = article?.metaDescription || article?.summary || "Conteúdo consultivo por Plan10.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: article?.title ?? "Blog Plan10" },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: article
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: article.title,
                description: article.metaDescription || article.summary,
                datePublished: article.date,
                articleSection: article.editoria,
                author: { "@type": "Organization", name: "Plan10" },
                publisher: { "@type": "Organization", name: "Plan10" },
                mainEntityOfPage: url,
              }),
            },
          ]
        : [],
    };
  },
  component: BlogArticlePage,
});

// Uma linha é subtítulo quando é curta e não termina em pontuação de frase.
function isHeading(line: string) {
  return line.length <= 90 && !/[.!?]$/.test(line);
}

function renderBlocks(text: string, color: string) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line, i) =>
      isHeading(line) ? (
        <h2
          key={i}
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "1.35rem", color: "#143A61", margin: "34px 0 12px", lineHeight: 1.3, borderLeft: `3px solid ${color}`, paddingLeft: 14 }}
        >
          {line}
        </h2>
      ) : (
        <p key={i} style={{ fontSize: "1.02rem", lineHeight: 1.75, color: "#333", margin: "0 0 18px" }}>
          {line}
        </p>
      ),
    );
}

function BlogArticlePage() {
  const { slug } = Route.useParams();
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) return <Navigate to="/blog" />;

  const cat = blogCategoryFor(article.category);
  const related = blogArticles.filter((a) => a.category === article.category && a.slug !== article.slug).slice(0, 3);

  // Bloco de produto: primeira linha é o título, o restante é corpo.
  const prodLines = article.productBlock.split("\n").map((l) => l.trim()).filter(Boolean);
  const prodTitle = prodLines[0] ?? "";
  const prodBody = prodLines.slice(1);

  return (
    <article className="pt-32 pb-20" style={{ background: "#F7F5F2" }}>
      <div className="container-x" style={{ maxWidth: 760 }}>
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold mb-8" style={{ color: cat.color }}>
          <ArrowLeft size={16} /> Voltar para o blog
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase"
            style={{ backgroundColor: `${cat.color}14`, color: cat.color }}
          >
            {cat.label}
          </span>
          {article.kind === "setorial" && (
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase"
              style={{ border: "1px solid #D8D2C6", color: "#8A8172" }}
            >
              Mercado
            </span>
          )}
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "clamp(1.9rem, 4vw, 2.6rem)", lineHeight: 1.2, color: "#1A1A1A", margin: "0 0 14px" }}>
          {article.title}
        </h1>
        {article.dek && (
          <p style={{ fontSize: "1.2rem", lineHeight: 1.5, color: "#5A5A5A", margin: "0 0 18px", fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}>
            {article.dek}
          </p>
        )}
        <p className="text-sm text-neutral-500 mb-8">{article.date} · {article.readingTime} de leitura</p>

        <div
          className="rounded-[5px] mb-10"
          style={{ aspectRatio: "16 / 9", background: "#EFEBE3", border: "1px solid #E6E1D6", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: ".22em", textTransform: "uppercase", fontSize: ".68rem", color: "#C9A83C" }}>Plan10</span>
        </div>

        {article.keyTakeaway && (
          <aside
            style={{ background: "#fff", border: "1px solid #E6E1D6", borderLeft: `3px solid ${cat.color}`, borderRadius: 5, padding: "20px 24px", margin: "0 0 32px" }}
          >
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", fontSize: ".72rem", color: cat.color, margin: "0 0 8px" }}>
              Em resumo
            </p>
            <p style={{ fontSize: "1.02rem", lineHeight: 1.65, color: "#333", margin: 0 }}>{article.keyTakeaway}</p>
          </aside>
        )}

        <div>{renderBlocks(article.body, cat.color)}</div>

        {prodTitle && (
          <section style={{ background: "#0C2340", color: "#fff", borderRadius: 8, padding: "32px 28px", margin: "40px 0 0" }}>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", fontSize: ".72rem", color: "#E8CA6A", margin: "0 0 8px" }}>
              A solução Plan10
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "1.4rem", margin: "0 0 14px", lineHeight: 1.3, color: "#fff" }}>
              {prodTitle}
            </h2>
            {prodBody.map((p, i) => (
              <p key={i} style={{ fontSize: "1rem", lineHeight: 1.7, color: "rgba(255,255,255,.82)", margin: "0 0 14px" }}>{p}</p>
            ))}
            <Link
              to="/fale-conosco"
              className="inline-flex items-center gap-2 mt-2"
              style={{ background: "#E05A20", color: "#fff", textDecoration: "none", fontWeight: 600, borderRadius: 9, padding: "13px 26px" }}
            >
              {article.cta || "Falar com um consultor"}
            </Link>
          </section>
        )}

        {!prodTitle && article.cta && (
          <section style={{ background: "#fff", border: "1px solid #E6E1D6", borderLeft: `3px solid ${cat.color}`, borderRadius: 5, padding: "24px 26px", margin: "40px 0 0", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500, fontSize: "1.15rem", color: "#143A61", margin: 0, maxWidth: "40ch" }}>
              Quer entender o que isso muda no seu caso?
            </p>
            <Link
              to="/fale-conosco"
              className="inline-flex items-center gap-2"
              style={{ background: "#E05A20", color: "#fff", textDecoration: "none", fontWeight: 600, borderRadius: 9, padding: "13px 26px", whiteSpace: "nowrap" }}
            >
              {article.cta}
            </Link>
          </section>
        )}

        {related.length > 0 && (
          <section style={{ marginTop: 56, borderTop: "1px solid #E6E1D6", paddingTop: 32 }}>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", fontSize: ".74rem", color: cat.color, margin: "0 0 18px" }}>
              Continue lendo
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  style={{ display: "block", background: "#fff", border: "1px solid #E6E1D6", borderRadius: 5, padding: "16px 18px", textDecoration: "none" }}
                >
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500, fontSize: "1rem", color: "#143A61", display: "block", lineHeight: 1.3 }}>{r.title}</span>
                  <span style={{ fontSize: ".82rem", color: "#777", display: "block", marginTop: 6 }}>{r.readingTime}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
