import { createFileRoute } from "@tanstack/react-router";
import { VerticalPageTemplate } from "@/components/vertical/VerticalPageTemplate";
import { saudePF, saudePJ } from "@/data/products";
import { getVertical } from "@/data/verticals";
import { canonical, faqJsonLd } from "@/lib/seo";

const saudeFaq = [
  { title: "Quais operadoras vocês trabalham?", content: "Bradesco Saúde, Amil, Hapvida, NotreDame, entre outras." },
  { title: "A consultoria tem custo?", content: "Não. A consultoria e a recomendação Plan10 são gratuitas." },
  { title: "Posso migrar de plano?", content: "Sim. Analisamos a migração com aproveitamento de carências sempre que possível." },
  { title: "Atendem empresas de qualquer porte?", content: "Sim. PME ideal para até 29 vidas; Empresarial para mais de 30 vidas." },
];

export const Route = createFileRoute("/saude")({
  head: () => ({
    meta: [
      { title: "Planos de Saúde | Plan10, PF, Família e Empresa" },
      { name: "description", content: "Planos de saúde e odontológicos para você, família e empresa." },
      { property: "og:title", content: "Planos de Saúde, Plan10" },
      { property: "og:description", content: "Encontre o plano ideal com orientação independente." },
      { property: "og:url", content: canonical("/saude") },
    ],
    links: [{ rel: "canonical", href: canonical("/saude") }],
    scripts: [{ type: "application/ld+json", children: faqJsonLd(saudeFaq) }],
  }),
  component: SaudePage,
});

function SaudePage() {
  const v = getVertical("saude");
  return (
    <VerticalPageTemplate
      vertical={v}
      toggleEnabled
      toggleLabels={{ left: "Para você", right: "Para empresa" }}
      productsTitle="Planos de Saúde e Odonto"
      productGroupsPF={saudePF}
      productGroupsPJ={saudePJ}
      freeServices={[
        "Análise de perfil para planos de saúde",
        "Comparação entre operadoras",
        "Simulações personalizadas",
        "Orientações sobre carências",
        "Acompanhamento de reajustes anuais",
        "Suporte pós-venda",
        "Gestão de benefícios para empresas",
      ]}
      faqItems={saudeFaq}
    />
  );
}
