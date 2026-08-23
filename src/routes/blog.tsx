import { createFileRoute, Outlet } from "@tanstack/react-router";

// Rota de layout do blog. O conteúdo do índice vive em blog.index.tsx e o
// artigo em blog.$slug.tsx; aqui só renderizamos o filho ativo.
export const Route = createFileRoute("/blog")({
  component: () => <Outlet />,
});
