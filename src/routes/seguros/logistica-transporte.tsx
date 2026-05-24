import { createFileRoute } from "@tanstack/react-router";
import { SegurosCategoryPage } from "@/components/seguros/SegurosCategoryPage";

export const Route = createFileRoute("/seguros/logistica-transporte")({
  component: () => <SegurosCategoryPage categoryId="logistica-transporte" />,
});
