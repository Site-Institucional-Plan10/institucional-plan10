import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { blogArticles } from "@/data/blogArticles";
// Mapeia o hub antigo do artigo para a solução nova (nome + cor).
const CATS = [
  { id: "saude", label: "Saúde", color: "#2EA86E" },
  { id: "seguros", label: "Proteção", color: "#2B6CB0" },
  { id: "financas", label: "Financeiras", color: "#5BA3D9" },
  { id: "consorcios", label: "Crescimento", color: "#7B5BB5" },
  { id: "servicos", label: "Assistência", color: "#C45C2E" },
];
const catFor = (hub: string) => CATS.find((c) => c.id === hub) ?? { id: hub, label: hub, color: "#1C4E80" };
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const article = blogArticles.find((a) => a.slug === params.slug);
    const url = canonical(`/blog/${params.slug}`);
    const title = article ? `${article.title} | Blog Plan10` : "Blog Plan10";
    const description = article?.summary ?? "Conteúdos sobre seguros, saúde, consórcio e finanças.";
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
                description: article.summary,
                datePublished: article.date,
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

function BlogArticlePage() {
  const { slug } = Route.useParams();
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) return <Navigate to="/blog" />;

  const cat = catFor(article.hub);

  return (
    <article className="pt-32 pb-20">
      <div className="container-x max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-orange mb-8">
          <ArrowLeft size={16} /> Voltar para o blog
        </Link>

        <span
          className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase mb-4"
          style={{ backgroundColor: `${cat.color}14`, color: cat.color }}
        >
          {cat.label}
        </span>

        <h1 className="font-display mb-3">{article.title}</h1>
        <p className="text-sm text-neutral-500 mb-8">{article.date}</p>

        <div
          className="rounded-[5px] mb-10"
          style={{ aspectRatio: "16 / 9", background: "#EFEBE3", border: "1px solid #E6E1D6", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: ".22em", textTransform: "uppercase", fontSize: ".68rem", color: "#C9A83C" }}>Plan10</span>
        </div>

        <p className="text-lg text-neutral-800 leading-relaxed mb-6 font-medium">
          {article.summary}
        </p>
        <p className="text-base text-neutral-700 leading-relaxed">
          {article.body}
        </p>
      </div>
    </article>
  );
}
