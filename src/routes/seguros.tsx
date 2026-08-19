import { createFileRoute, redirect } from "@tanstack/react-router";

// Página antiga aposentada. Redireciona para a solução nova equivalente
// (Seguros -> Proteção). Decisão do cliente na auditoria de 11/08/2026.
export const Route = createFileRoute("/seguros")({
  beforeLoad: () => {
    throw redirect({ to: "/solucoes/$solucao", params: { solucao: "protecao" }, replace: true });
  },
  component: () => null,
});
