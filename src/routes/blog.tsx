import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { verticals } from "@/data/verticals";

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
  const [active, setActive] = useState<string>("seguros");
  const current = verticals.find((v) => v.id === active)!;

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
          {/* TODO: conectar ao CMS quando disponível */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <article key={n} className="rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:shadow-md transition">
                <div className="aspect-video bg-neutral-100" />
                <div className="p-6">
                  <span
                    className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase mb-3"
                    style={{ backgroundColor: `${current.hubColor}1A`, color: current.hubColor }}
                  >
                    {current.name}
                  </span>
                  <h3 className="font-semibold text-lg mb-2">Título do artigo {n} — placeholder</h3>
                  <p className="text-sm text-neutral-700 mb-4">Resumo do artigo. Conteúdo placeholder para layout.</p>
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>11 de maio de 2026</span>
                    <a href="#" className="font-semibold text-orange">Ler mais →</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
