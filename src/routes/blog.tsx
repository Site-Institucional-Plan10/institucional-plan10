import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { blogArticles } from "@/data/blogArticles";
import { canonical } from "@/lib/seo";

// Mapeia o hub antigo de cada artigo para a solução nova (nome + cor da paleta).
const CATS = [
  { id: "saude", label: "Saúde", color: "#2EA86E" },
  { id: "seguros", label: "Proteção", color: "#2B6CB0" },
  { id: "financas", label: "Financeiras", color: "#5BA3D9" },
  { id: "consorcios", label: "Crescimento", color: "#7B5BB5" },
  { id: "servicos", label: "Assistência", color: "#C45C2E" },
];
const catFor = (hub: string) => CATS.find((c) => c.id === hub) ?? { id: hub, label: hub, color: "#1C4E80" };

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog Plan10 | Biblioteca e Cases" },
      { name: "description", content: "Conteúdos sobre seguros, saúde, consórcio e finanças por Plan10." },
      { property: "og:title", content: "Blog Plan10" },
      { property: "og:description", content: "Conteúdo, biblioteca e cases reais." },
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
    return blogArticles.filter((a) => a.hub === active);
  }, [active]);

  return (
    <>
      <section className="pt-32 pb-12 bg-neutral-100">
        <div className="container-x">
          <p className="font-eyebrow text-orange mb-3">Conteúdo Plan10</p>
          <h1 className="font-display">Fique por dentro do mercado</h1>
        </div>
      </section>

      <section className="py-8 sticky top-20 bg-white z-30 border-b border-neutral-200">
        <div className="container-x flex flex-wrap gap-2">
          <button
            onClick={() => setActive("todos")}
            className="rounded-full px-5 py-2 text-sm font-semibold transition border"
            style={{
              borderColor: active === "todos" ? "#1C4E80" : "#D8D2C6",
              backgroundColor: active === "todos" ? "#1C4E80" : "transparent",
              color: active === "todos" ? "#fff" : "#5A5A5A",
            }}
          >
            Todos
          </button>
          {CATS.map((c) => (
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

      <section className="section-y">
        <div className="container-x">
          {filtered.length === 0 ? (
            <p className="text-neutral-600">Nenhum artigo nesta categoria ainda.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article) => {
                const cat = catFor(article.hub);
                return (
                  <article key={article.slug} className="rounded-[5px] border bg-white overflow-hidden transition flex flex-col" style={{ borderColor: "#E6E1D6" }}>
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
                      <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                      <p className="text-sm text-neutral-700 mb-4 flex-1">{article.summary}</p>
                      <div className="flex items-center justify-between text-xs text-neutral-500">
                        <span>{article.date}</span>
                        <Link
                          to="/blog/$slug"
                          params={{ slug: article.slug }}
                          className="font-semibold text-orange"
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
