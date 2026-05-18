import { createFileRoute } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { VerticalPageTemplate } from "@/components/vertical/VerticalPageTemplate";
import { financasPF, financasPJ } from "@/data/products";
import { getVertical } from "@/data/verticals";

export const Route = createFileRoute("/financas")({
  head: () => ({
    meta: [
      { title: "Produtos Financeiros | Plan10 — Crédito e Consultoria" },
      { name: "description", content: "Crédito, financiamento e soluções financeiras com análise consultiva." },
      { property: "og:title", content: "Finanças — Plan10" },
      { property: "og:description", content: "Consultoria independente em produtos financeiros." },
    ],
  }),
  component: FinancasPage,
});

function FinancasPage() {
  const v = getVertical("financas");
  return (
    <VerticalPageTemplate
      vertical={v}
      productsTitle="Produtos Financeiros"
      belowProducts={
        <section className="py-10 bg-white">
          <div className="container-x">
            <div className="rounded-2xl bg-amber/10 border border-amber/40 p-6 flex items-start gap-3">
              <Info className="text-amber mt-0.5" size={20} />
              <p className="text-sm text-neutral-700">
                A Plan10 não realiza empréstimos diretos. Atuamos como consultores independentes conectando você às melhores condições do mercado. Resultados sujeitos a análise de cada instituição financeira.
              </p>
            </div>
          </div>
        </section>
      }
      freeServices={[
        "Análise financeira do perfil",
        "Comparação entre instituições",
        "Simulações personalizadas",
        "Estratégias para redução de juros",
        "Reestruturação de dívidas",
        "Consultoria empresarial",
      ]}
      faqItems={[
        { title: "Vocês fazem empréstimo direto?", content: "Não. A Plan10 conecta você às instituições financeiras parceiras com as melhores condições." },
        { title: "Posso refinanciar dívidas?", content: "Sim. Avaliamos portabilidade e reestruturação caso a caso." },
        { title: "Atendem empresas?", content: "Sim. Crédito empresarial e consultoria financeira para PMEs e grandes empresas." },
      ]}
    />
  );
}
