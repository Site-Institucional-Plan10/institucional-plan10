import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { verticals } from "@/data/verticals";
import { blogArticles } from "@/data/blogArticles";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog Plan10 | Biblioteca e Cases" },
      { name: "description", content: "Conteúdos sobre seguros, saúde, consórcio e finanças por Plan10." },
      { property: "og:title", content: "Blog Plan10" },
      { property: "og:description", content: "Conteúdo, biblioteca e cases reais." },
    ],
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
          <p className="font-eyebrow text-orange mb-3">Conteúdo</p>
          <h1 className="font-display">Blog Plan10 | Biblioteca | Cases</h1>
        </div>
      </section>

      <section className="py-8 sticky top-20 bg-white z-30 border-b border-neutral-200">
        <div className="container-x flex flex-wrap gap-2">
          <button
            onClick={() => setActive("todos")}
            className="rounded-full px-5 py-2 text-sm font-semibold transition border-2"
            style={{
              borderColor: "#1A1A1A",
              backgroundColor: active === "todos" ? "#1A1A1A" : "transparent",
              color: active === "todos" ? "#fff" : "#1A1A1A",
            }}
          >
            Todos
          </button>
          {verticals.map((v) => (
            <button
              key={v.id}
              onClick={() => setActive(v.id)}
              className="rounded-full px-5 py-2 text-sm font-semibold transition border-2"
              style={{
                borderColor: v.hubColor,
                backgroundColor: active === v.id ? v.hubColor : "transparent",
                color: active === v.id ? "#fff" : v.hubColor,
              }}
            >
              {v.name}
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
                const v = verticals.find((vv) => vv.id === article.hub)!;
                return (
                  <article key={article.slug} className="rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:shadow-md transition flex flex-col">
                    <div className="aspect-video bg-neutral-100" />
                    <div className="p-6 flex-1 flex flex-col">
                      <span
                        className="inline-block self-start rounded-full px-3 py-1 text-xs font-bold uppercase mb-3"
                        style={{ backgroundColor: `${v.hubColor}1A`, color: v.hubColor }}
                      >
                        {v.name}
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
