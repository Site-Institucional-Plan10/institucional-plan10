import { createFileRoute } from "@tanstack/react-router";
import { VerticalPageTemplate } from "@/components/vertical/VerticalPageTemplate";
import { getVertical } from "@/data/verticals";

export const Route = createFileRoute("/seguros")({
  head: () => ({
    meta: [
      { title: "Seguros Gerais | Plan10 — Auto, Vida, Residencial e Empresarial" },
      { name: "description", content: "Proteção patrimonial completa: auto, vida, residencial, viagem e empresarial." },
      { property: "og:title", content: "Seguros Gerais — Plan10" },
      { property: "og:description", content: "Compare entre seguradoras com a Plan10." },
    ],
  }),
  component: SegurosPage,
});

function SegurosPage() {
  const v = getVertical("seguros");
  return (
    <VerticalPageTemplate
      vertical={v}
      toggleEnabled
      toggleLabels={{ left: "Pessoa Física", right: "Pessoa Jurídica" }}
      productsTitle="Categorias de Seguros"
      enableDirectContracting
      freeServices={[
        "Análise gratuita do perfil de risco",
        "Comparação entre seguradoras",
        "Suporte em sinistros do início ao fim",
        "Acompanhamento de renovação anual",
        "Orientação sobre coberturas",
        "Atendimento humano por consultores",
      ]}
      faqItems={[
        { title: "Quais seguradoras vocês trabalham?", content: "Trabalhamos com Porto Seguro, SulAmérica, Mapfre, AIG, Liberty e AGF, entre outras." },
        { title: "A consultoria tem custo?", content: "Não. A análise e a recomendação Plan10 são gratuitas." },
        { title: "Como funciona o suporte em sinistro?", content: "Acompanhamos toda a comunicação com a seguradora e a documentação até a finalização." },
      ]}
    />
  );
}
