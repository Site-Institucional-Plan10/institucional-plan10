import { createFileRoute } from "@tanstack/react-router";
import { SegurosCategoryPage } from "@/components/seguros/SegurosCategoryPage";

export const Route = createFileRoute("/seguros/protecao-digital")({
  component: () => <SegurosCategoryPage categoryId="protecao-digital" />,
});
