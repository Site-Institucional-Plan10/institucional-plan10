import { createFileRoute } from "@tanstack/react-router";
import { SegurosCategoryPage } from "@/components/seguros/SegurosCategoryPage";

export const Route = createFileRoute("/seguros/vida-legado-familiar")({
  component: () => <SegurosCategoryPage categoryId="vida-legado-familiar" />,
});
