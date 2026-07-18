import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { findSolucao, type Solucao } from "@/data/solutions";
import { FONTS } from "@/lib/plan10";

export const Route = createFileRoute("/solucoes/$solucao")({
  loader: ({ params }): { solucao: Solucao } => {
    const s = findSolucao(params.solucao);
    if (!s) throw notFound();
    return { solucao: s };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Solução não encontrada" }, { name: "robots", content: "noindex" }] };
    const s = loaderData.solucao;
    return {
      meta: [
        { title: `${s.nome} | Plan10` },
        { name: "description", content: s.subHero },
        { property: "og:title", content: `${s.nome} | Plan10` },
        { property: "og:description", content: s.subHero },
        { property: "og:url", content: `https://plan10.com.br/solucoes/${s.slug}` },
      ],
      links: [{ rel: "canonical", href: `https://plan10.com.br/solucoes/${s.slug}` }],
    };
  },
  component: () => <Outlet />,
  notFoundComponent: () => (
    <div style={{ padding: 80, textAlign: "center", fontFamily: FONTS.body }}>Solução não encontrada.</div>
  ),
});