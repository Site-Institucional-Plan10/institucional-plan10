import { createFileRoute } from "@tanstack/react-router";
import { SegurosCategoryPage } from "@/components/seguros/SegurosCategoryPage";

export const Route = createFileRoute("/seguros/protecao-animal")({
  component: () => <SegurosCategoryPage categoryId="protecao-animal" />,
});
