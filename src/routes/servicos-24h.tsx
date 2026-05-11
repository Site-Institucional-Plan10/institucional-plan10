import { createFileRoute } from "@tanstack/react-router";
import { Truck, Circle, Key, Zap, Droplets, Clock } from "lucide-react";
import { VerticalPageTemplate } from "@/components/vertical/VerticalPageTemplate";
import { getVertical } from "@/data/verticals";

const services = [
  { Icon: Truck, label: "Guincho" },
  { Icon: Circle, label: "Troca de pneu" },
  { Icon: Key, label: "Chaveiro" },
  { Icon: Zap, label: "Elétrica" },
  { Icon: Droplets, label: "Encanamento" },
];

export const Route = createFileRoute("/servicos-24h")({
  head: () => ({
    meta: [
      { title: "Serviços 24h | Plan10 — Assistência Veicular e Residencial" },
      { name: "description", content: "Assistência rápida para residência e veículos, 24/7." },
      { property: "og:title", content: "Serviços 24h — Plan10" },
      { property: "og:description", content: "Atendimento em 30 a 50 minutos." },
    ],
  }),
  component: Servicos24hPage,
});

function Servicos24hPage() {
  const v = getVertical("servicos");
  return (
    <VerticalPageTemplate
      vertical={v}
      productsTitle="Planos de Assistência"
      extraTop={
        <section className="py-10 bg-white">
          <div className="container-x grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl p-6" style={{ backgroundColor: `${v.hubColor}1A` }}>
              {/* confirmar número com cliente */}
              <div className="text-3xl font-extrabold" style={{ color: v.hubColor }}>+2.000 atendimentos realizados</div>
              <p className="text-sm text-neutral-700 mt-2">Histórico real da operação Plan10.</p>
            </div>
            <div className="rounded-2xl p-6 bg-ink text-white flex items-center gap-4">
              <Clock size={36} />
              <div>
                {/* confirmar com equipe */}
                <div className="text-xl font-bold">Tempo médio de chegada</div>
                <div className="text-sm text-white/80">30 a 50 minutos</div>
              </div>
            </div>
          </div>
        </section>
      }
      belowProducts={
        <section className="section-y bg-white">
          <div className="container-x">
            <h2 className="font-h2 mb-8">Serviços disponíveis</h2>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {services.map(({ Icon, label }) => (
                <div key={label} className="rounded-2xl border border-neutral-200 bg-white p-6 text-center">
                  <div
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full mb-3"
                    style={{ backgroundColor: `${v.hubColor}1A`, color: v.hubColor }}
                  >
                    <Icon size={26} />
                  </div>
                  <div className="font-semibold">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      }
      freeServices={[
        "Atendimento 24/7",
        "Equipe própria e parceira credenciada",
        "Acompanhamento em tempo real",
      ]}
      faqItems={[
        { title: "Preciso ter seguro para contratar?", content: "Não. Os serviços podem ser contratados de forma avulsa ou vinculada a um seguro." },
        { title: "O atendimento é realmente 24/7?", content: "Sim. Operamos todos os dias do ano, 24 horas." },
        { title: "Quais serviços estão incluídos?", content: "Guincho, troca de pneu, chaveiro, elétrica, encanamento e mais." },
      ]}
    />
  );
}
