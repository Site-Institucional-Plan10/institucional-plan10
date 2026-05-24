import { createFileRoute } from "@tanstack/react-router";
import { SegurosCategoryPage } from "@/components/seguros/SegurosCategoryPage";

export const Route = createFileRoute("/seguros/previdencia-acumulacao")({
  component: () => <SegurosCategoryPage categoryId="previdencia-acumulacao" />,
});
