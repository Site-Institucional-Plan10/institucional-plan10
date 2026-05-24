import { createFileRoute } from "@tanstack/react-router";
import { SegurosCategoryPage } from "@/components/seguros/SegurosCategoryPage";

export const Route = createFileRoute("/seguros/rural-agronegocio")({
  component: () => <SegurosCategoryPage categoryId="rural-agronegocio" />,
});
