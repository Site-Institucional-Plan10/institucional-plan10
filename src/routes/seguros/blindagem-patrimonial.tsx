import { createFileRoute } from "@tanstack/react-router";
import { SegurosCategoryPage } from "@/components/seguros/SegurosCategoryPage";

export const Route = createFileRoute("/seguros/blindagem-patrimonial")({
  component: () => <SegurosCategoryPage categoryId="blindagem-patrimonial" />,
});
