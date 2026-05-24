import { createFileRoute, notFound } from "@tanstack/react-router";
import { seguroCategories } from "@/data/seguros";
import { SegurosCategoryPage } from "@/components/seguros/SegurosCategoryPage";

export const Route = createFileRoute("/seguros/$categoryId")({
  component: SegurosCategoryPageRoute,
  loader: ({ params }) => {
    const cat = seguroCategories.find((c) => c.id === params.categoryId);
    if (!cat) throw notFound();
    return cat;
  },
  notFoundComponent: () => (
    <div className="pt-32 pb-20 container-x text-center">
      <h1 className="font-h2 mb-3">Categoria não encontrada</h1>
      <p className="text-neutral-700">Verifique o link e tente novamente.</p>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="pt-32 pb-20 container-x text-center">
      <h1 className="font-h2 mb-3">Erro ao carregar a categoria</h1>
      <p className="text-neutral-700">{error.message}</p>
    </div>
  ),
});

function SegurosCategoryPageRoute() {
  const { categoryId } = Route.useParams();
  return <SegurosCategoryPage categoryId={categoryId} />;
}
