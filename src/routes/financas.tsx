import { createFileRoute, redirect } from "@tanstack/react-router";

// Página antiga aposentada. Redireciona para a solução nova de Financeiras.
export const Route = createFileRoute("/financas")({
  beforeLoad: () => {
    throw redirect({ to: "/solucoes/$solucao", params: { solucao: "financeiras" }, replace: true });
  },
  component: () => null,
});
