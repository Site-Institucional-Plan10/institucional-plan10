import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout da biblioteca de mobilidade. O hub vive em mobilidade.index.tsx e o
// detalhe do modelo em mobilidade.$montadora.$modelo.tsx.
export const Route = createFileRoute("/mobilidade")({
  component: () => <Outlet />,
});
