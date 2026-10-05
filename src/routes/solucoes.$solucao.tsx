import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { findSolucao, type Solucao } from "@/data/solutions";
import { FONTS } from "@/lib/plan10";

export const Route = createFileRoute("/solucoes/$solucao")({
  /**
   * `?abrir=categoria/caminho` é o endereço de uma sanfona dentro da página da
   * vertical. Fica validado aqui, no layout, porque o mega menu e a busca
   * apontam para `/solucoes/$solucao` e o parâmetro precisa existir no esquema
   * dessa rota; as páginas filhas o herdam e simplesmente ignoram.
   */
  validateSearch: (busca: Record<string, unknown>): { abrir?: string } => ({
    abrir: typeof busca.abrir === "string" && busca.abrir ? busca.abrir : undefined,
  }),
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