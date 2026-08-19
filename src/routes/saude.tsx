import { createFileRoute, redirect } from "@tanstack/react-router";

// Página antiga aposentada. Redireciona para a solução nova de Saúde.
export const Route = createFileRoute("/saude")({
  beforeLoad: () => {
    throw redirect({ to: "/solucoes/$solucao", params: { solucao: "saude" }, replace: true });
  },
  component: () => null,
});
