import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { blogArticles, blogCategories, blogCategoryFor } from "@/data/blogArticles";
import { canonical } from "@/lib/seo";

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
    <>
      <section className="pt-32 pb-12" style={{ background: "linear-gradient(160deg, #0C2340 0%, #143A61 100%)" }}>
        <div className="container-x">
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", fontSize: ".8rem", color: "#E8CA6A", margin: 0 }}>
            Conteúdo Plan10
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "#fff", margin: "12px 0 8px" }}>
            Leituras que ajudam a decidir com critério
          </h1>
          <p style={{ color: "rgba(255,255,255,.72)", maxWidth: "52ch", margin: 0 }}>
            Biblioteca editorial da Plan10, organizada por solução e tema.
          </p>
        </div>
      </section>

      <section className="py-6 sticky top-20 z-30 border-b" style={{ background: "#F7F5F2", borderColor: "#E6E1D6" }}>
        <div className="container-x flex flex-wrap gap-2">
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

      <section className="section-y" style={{ background: "#F7F5F2" }}>
        <div className="container-x">
          {filtered.length === 0 ? (
            <p className="text-neutral-600">Nenhum artigo nesta categoria ainda.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article) => {
                const cat = blogCategoryFor(article.category);
                return (
                  <article key={article.slug} className="rounded-[5px] border bg-white overflow-hidden transition flex flex-col hover:border-[#143A61]" style={{ borderColor: "#E6E1D6" }}>
                    <div
                      style={{
                        aspectRatio: "16 / 9",
                        background: "#EFEBE3",
                        borderBottom: "1px solid #E6E1D6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: ".22em", textTransform: "uppercase", fontSize: ".62rem", color: "#C9A83C" }}>
                        Plan10
                      </span>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <span
                        className="inline-block self-start rounded-full px-3 py-1 text-xs font-bold uppercase mb-3"
                        style={{ backgroundColor: `${cat.color}14`, color: cat.color }}
                      >
                        {cat.label}
                      </span>
                      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "1.15rem", lineHeight: 1.3, color: "#1A1A1A", marginBottom: 8 }}>
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
    </>
  );
}
