import { createFileRoute } from "@tanstack/react-router";
import { SegurosCategoryPage } from "@/components/seguros/SegurosCategoryPage";

export const Route = createFileRoute("/seguros/mobilidade-inteligente")({
  component: () => <SegurosCategoryPage categoryId="mobilidade-inteligente" />,
});
