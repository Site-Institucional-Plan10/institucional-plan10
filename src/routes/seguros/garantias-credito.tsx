import { createFileRoute } from "@tanstack/react-router";
import { SegurosCategoryPage } from "@/components/seguros/SegurosCategoryPage";

export const Route = createFileRoute("/seguros/garantias-credito")({
  component: () => <SegurosCategoryPage categoryId="garantias-credito" />,
});
