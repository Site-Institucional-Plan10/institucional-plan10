import { createFileRoute, redirect } from "@tanstack/react-router";

// Página antiga aposentada. Redireciona para a solução nova equivalente
// (Consórcios -> Crescimento e mobilidade).
export const Route = createFileRoute("/consorcios")({
  beforeLoad: () => {
    throw redirect({ to: "/solucoes/$solucao", params: { solucao: "crescimento" }, replace: true });
  },
  component: () => null,
});
