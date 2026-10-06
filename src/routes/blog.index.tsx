import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { blogArticles, blogCategories, blogCategoryFor } from "@/data/blogArticles";
import { canonical } from "@/lib/seo";
import { PageTheme, PALETTES } from "@/components/plan10/PageTheme";
import { fotoDoArtigo } from "@/lib/blogImagery";
import { dim } from "@/lib/dimensoes";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog Plan10 | Conteúdo e biblioteca editorial" },
      { name: "description", content: "Leituras consultivas sobre proteção, saúde, crescimento, finanças, assistência e alto padrão, por Plan10." },
      { property: "og:title", content: "Blog Plan10" },
      { property: "og:description", content: "Conteúdo consultivo e biblioteca editorial." },
      { property: "og:url", content: canonical("/blog") },
    ],
    links: [{ rel: "canonical", href: canonical("/blog") }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [active, setActive] = useState<string>("todos");

  const filtered = useMemo(() => {
    if (active === "todos") return blogArticles;
    return blogArticles.filter((a) => a.category === active);
  }, [active]);

  return (
    <PageTheme palette={PALETTES.institucional}>
      <style>{`
        .plan10-scope .blog-capa { aspect-ratio: 16 / 9; background: var(--vs); border-bottom: 1px solid var(--c2); overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .plan10-scope .blog-capa img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s cubic-bezier(.2,.7,.3,1); }
        .plan10-scope article:hover .blog-capa img { transform: scale(1.04); }
        .plan10-scope .blog-capa-selo { font-family: var(--fl); letter-spacing: .22em; text-transform: uppercase; font-size: 0.68rem; color: var(--gold); }
      `}</style>
      <header className="p10-hero">
        <div className="p10-hero-inner">
          <p className="eyebrow">Conteúdo Plan10</p>
          <h1>Leituras que ajudam a decidir com critério</h1>
          <p className="lede">Biblioteca editorial da Plan10, organizada por solução e tema.</p>
        </div>
      </header>

      <section className="py-6 sticky top-20 z-30 border-b" style={{ background: "var(--vs)", borderColor: "var(--c2)" }}>
        <div className="wrap flex flex-wrap gap-2">
          <button
            onClick={() => setActive("todos")}
            className="rounded-full px-5 py-2 text-sm font-semibold transition border"
            style={{
              borderColor: active === "todos" ? "#143A61" : "#D8D2C6",
              backgroundColor: active === "todos" ? "#143A61" : "transparent",
              color: active === "todos" ? "#fff" : "#5A5A5A",
            }}
          >
            Todos
          </button>
          {blogCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className="rounded-full px-5 py-2 text-sm font-semibold transition border"
              style={{
                borderColor: active === c.id ? c.color : "#D8D2C6",
                backgroundColor: active === c.id ? c.color : "transparent",
                color: active === c.id ? "#fff" : "#5A5A5A",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          {filtered.length === 0 ? (
            <p className="text-neutral-600">Nenhum artigo nesta categoria ainda.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article) => {
                const cat = blogCategoryFor(article.category);
                const foto = fotoDoArtigo(article.slug);
                return (
                  <article key={article.slug} className="rounded-[5px] border bg-white overflow-hidden transition flex flex-col hover:border-[#143A61]" style={{ borderColor: "var(--c2)" }}>
                    <div className="blog-capa">
                      {foto ? (
                        <img src={foto.src} alt={foto.alt} {...dim(foto.src)} loading="lazy" decoding="async" />
                      ) : (
                        <span className="blog-capa-selo">Plan10</span>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
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
                      <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "1.15rem", lineHeight: 1.3, color: "#1A1A1A", marginBottom: 8 }}>
                        {article.title}
                      </h3>
                      <p className="text-sm text-neutral-700 mb-4 flex-1">{article.summary}</p>
                      <div className="flex items-center justify-between text-xs text-neutral-500">
                        <span>{article.readingTime}</span>
                        <Link
                          to="/blog/$slug"
                          params={{ slug: article.slug }}
                          className="font-semibold"
                          style={{ color: cat.color }}
                        >
                          Ler mais →
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </PageTheme>
  );
}
