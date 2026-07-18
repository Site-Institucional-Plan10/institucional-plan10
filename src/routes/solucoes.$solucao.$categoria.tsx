import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { findCategoria, type Solucao, type Categoria } from "@/data/solutions";
import { FONTS } from "@/lib/plan10";

export const Route = createFileRoute("/solucoes/$solucao/$categoria")({
  loader: ({ params }): { solucao: Solucao; categoria: Categoria } => {
    const found = findCategoria(params.solucao, params.categoria);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Categoria não encontrada" }, { name: "robots", content: "noindex" }] };
    const { solucao: s, categoria: c } = loaderData;
    const url = `https://plan10.com.br/solucoes/${s.slug}/${c.slug}`;
    return {
      meta: [
        { title: `${c.nome} | ${s.nome} | Plan10` },
        { name: "description", content: c.hero || s.subHero },
        { property: "og:title", content: `${c.nome} | Plan10` },
        { property: "og:description", content: c.hero || s.subHero },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: () => <Outlet />,
  notFoundComponent: () => (
    <div style={{ padding: 80, textAlign: "center", fontFamily: FONTS.body }}>Caminho não encontrado.</div>
  ),
});