import { createFileRoute, redirect } from "@tanstack/react-router";

// Página antiga aposentada. Redireciona para a solução nova equivalente
// (Serviços 24h -> Assistência pessoal e empresarial).
export const Route = createFileRoute("/servicos-24h")({
  beforeLoad: () => {
    throw redirect({ to: "/solucoes/$solucao", params: { solucao: "assistencia" }, replace: true });
  },
  component: () => null,
});
