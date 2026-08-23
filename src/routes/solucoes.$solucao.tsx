import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { findSolucao, type Solucao } from "@/data/solutions";
import { FONTS } from "@/lib/plan10";

export const Route = createFileRoute("/solucoes/$solucao")({
  loader: ({ params }): { solucao: Solucao } => {
    const s = findSolucao(params.solucao);
    if (!s) throw notFound();
    return { solucao: s };
  },
  // O head (title/canonical/og) fica nas rotas .index e no núcleo, para não
  // emitir canonical duplicado nas páginas filhas (o layout vaza para elas).
  component: () => <Outlet />,
  notFoundComponent: () => (
    <div style={{ padding: 80, textAlign: "center", fontFamily: FONTS.body }}>Solução não encontrada.</div>
  ),
});