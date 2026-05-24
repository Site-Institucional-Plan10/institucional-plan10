import { createFileRoute } from "@tanstack/react-router";
import { SegurosCategoryPage } from "@/components/seguros/SegurosCategoryPage";

export const Route = createFileRoute("/seguros/responsabilidade-profissional")({
  component: () => <SegurosCategoryPage categoryId="responsabilidade-profissional" />,
});
