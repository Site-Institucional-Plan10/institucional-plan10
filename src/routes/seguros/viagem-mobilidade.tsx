import { createFileRoute } from "@tanstack/react-router";
import { SegurosCategoryPage } from "@/components/seguros/SegurosCategoryPage";

export const Route = createFileRoute("/seguros/viagem-mobilidade")({
  component: () => <SegurosCategoryPage categoryId="viagem-mobilidade" />,
});
