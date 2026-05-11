import { createFileRoute } from "@tanstack/react-router";
import { VerticalPageTemplate } from "@/components/vertical/VerticalPageTemplate";
import { getVertical } from "@/data/verticals";

export const Route = createFileRoute("/consorcios")({
  head: () => ({
    meta: [
      { title: "Consórcio sem Juros | Plan10 — Imóveis, Veículos e Serviços" },
      { name: "description", content: "Planejamento sem juros para imóveis, veículos e serviços." },
      { property: "og:title", content: "Consórcio — Plan10" },
      { property: "og:description", content: "Financiamento tem juros. Consórcio não." },
    ],
  }),
  component: ConsorciosPage,
});

function ConsorciosPage() {
  const v = getVertical("consorcios");
  return (
    <VerticalPageTemplate
      vertical={v}
      productsTitle="Segmentos de Consórcio"
      extraTop={
        <section className="py-8 bg-white">
          <div className="container-x">
            <div
              className="rounded-2xl p-8 text-center text-white"
              style={{ background: "linear-gradient(135deg, #9857F2 0%, #6D2FBF 100%)" }}
            >
              <h2 className="font-h2" style={{ color: "#fff" }}>
                Financiamento tem juros. Consórcio não.
              </h2>
            </div>
          </div>
        </section>
      }
      belowProducts={
        <section className="section-y bg-neutral-100">
          <div className="container-x max-w-3xl text-center">
            <h2 className="font-h2 mb-4">Simulador de Consórcio</h2>
            <p className="text-neutral-700 mb-6">Calcule sua carta de crédito ideal.</p>
            {/* Integrar simulador de consórcio existente — aguardar endpoint e URL */}
            <div className="rounded-2xl border-2 border-dashed border-neutral-300 bg-white p-12">
              <p className="text-neutral-500">Simulador a ser integrado</p>
            </div>
          </div>
        </section>
      }
      freeServices={[
        "Simulação personalizada",
        "Comparação entre administradoras",
        "Análise de lance",
        "Orientação para uso de FGTS",
        "Consultoria para investimento via consórcio",
      ]}
      faqItems={[
        { title: "Consórcio tem juros?", content: "Não. O consórcio cobra apenas taxa de administração e fundo de reserva — sem juros." },
        { title: "Posso usar FGTS?", content: "Sim. O FGTS pode ser usado em consórcios imobiliários nas condições previstas." },
        { title: "Quanto tempo leva para ser contemplado?", content: "Depende do plano e do tipo de contemplação. Avaliamos isso na consultoria." },
      ]}
    />
  );
}
