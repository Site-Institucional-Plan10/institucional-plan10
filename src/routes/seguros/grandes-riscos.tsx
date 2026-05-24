import { createFileRoute } from "@tanstack/react-router";
import { SegurosCategoryPage } from "@/components/seguros/SegurosCategoryPage";

export const Route = createFileRoute("/seguros/grandes-riscos")({
  component: () => <SegurosCategoryPage categoryId="grandes-riscos" />,
});
