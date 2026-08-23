import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { findCategoria, type Solucao, type Categoria } from "@/data/solutions";
import { FONTS } from "@/lib/plan10";

export const Route = createFileRoute("/solucoes/$solucao/$categoria")({
  loader: ({ params }): { solucao: Solucao; categoria: Categoria } => {
    const found = findCategoria(params.solucao, params.categoria);
    if (!found) throw notFound();
    return found;
  },
  // head fica na rota .index (evita canonical duplicado nas páginas filhas).
  component: () => <Outlet />,
  notFoundComponent: () => (
    <div style={{ padding: 80, textAlign: "center", fontFamily: FONTS.body }}>Caminho não encontrado.</div>
  ),
});