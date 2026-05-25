import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SegurosCategoriesGrid } from "@/components/seguros/SegurosCategoriesGrid";
import { SegurosCategoryPage } from "@/components/seguros/SegurosCategoryPage";
import { getVertical } from "@/data/verticals";
import { canonical, faqJsonLd } from "@/lib/seo";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { verticalHeroSlides } from "@/data/heroSlides";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactForm } from "@/components/sections/ContactForm";
import { MobileCarousel } from "@/components/common/MobileCarousel";

const segurosFaq = [
  { title: "Quais seguradoras vocês trabalham?", content: "Trabalhamos com Porto Seguro, SulAmérica, Mapfre, AIG, Liberty e AGF, entre outras." },
  { title: "A consultoria tem custo?", content: "Não. A análise e a recomendação Plan10 são gratuitas." },
  { title: "Como funciona o suporte em sinistro?", content: "Acompanhamos toda a comunicação com a seguradora e a documentação até a finalização." },
];

export const Route = createFileRoute("/seguros")({
  validateSearch: (search: Record<string, unknown>) => ({
    cat: typeof search.cat === "string" ? search.cat : null,
  }),
  head: () => ({
    meta: [
      { title: "Seguros Gerais | Plan10, Auto, Vida e Residencial" },
      { name: "description", content: "Proteção patrimonial completa: auto, vida, residencial, viagem e empresarial." },
      { property: "og:title", content: "Seguros Gerais, Plan10" },
      { property: "og:description", content: "Compare entre seguradoras com a Plan10." },
      { property: "og:url", content: canonical("/seguros") },
    ],
    links: [{ rel: "canonical", href: canonical("/seguros") }],
    scripts: [{ type: "application/ld+json", children: faqJsonLd(segurosFaq) }],
  }),
  component: SegurosRouteComponent,
});

function SegurosRouteComponent() {
  const { cat } = Route.useSearch();
  if (cat) return <SegurosCategoryPage categoryId={cat} />;
  return <SegurosPage />;
}

function SegurosPage() {
  const v = getVertical("seguros");
  const heroSlides = verticalHeroSlides[v.id];

  const freeServices = [
    "Análise gratuita do perfil de risco",
    "Comparação entre seguradoras",
    "Suporte em sinistros do início ao fim",
    "Acompanhamento de renovação anual",
    "Orientação sobre coberturas",
    "Atendimento humano por consultores",
  ];

  const steps = [
    { title: "Entendimento", desc: "Mapeamos seu cenário." },
    { title: "Comparação", desc: "Cotamos com várias parceiras." },
    { title: "Recomendação", desc: "Sugestão clara e objetiva." },
    { title: "Contratação", desc: "Acompanhamento completo." },
  ];

  return (
    <>
      <section className="pt-20">
        <HeroCarousel slides={heroSlides} />
      </section>

      <SegurosCategoriesGrid />

      {/* Por que escolher / Free services */}
      <section className="section-y bg-neutral-100">
        <div className="container-x">
          <h2 className="font-h2 mb-8">Por que escolher a Plan10</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {freeServices.map((s) => (
              <li key={s} className="flex items-start gap-3 rounded-xl bg-white p-4 border border-neutral-200">
                <Check className="mt-0.5 flex-shrink-0" style={{ color: v.hubColor }} size={20} />
                <span className="text-sm text-neutral-700">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Como funciona */}
      <section className="section-y">
        <div className="container-x">
          <div className="mb-10">
            <p className="font-eyebrow text-orange mb-3">O processo</p>
            <h2 className="font-h2">Como funciona nossa consultoria</h2>
          </div>
          <div className="hidden md:grid gap-4 md:gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-neutral-200 bg-white p-5">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white font-bold mb-4"
                  style={{ backgroundColor: v.hubColor }}
                >
                  {i + 1}
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-neutral-700">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="-mx-4 md:hidden">
            <MobileCarousel
              ariaLabel="Como funciona"
              items={steps.map((s, i) => (
                <div className="rounded-2xl border border-neutral-200 bg-white p-5 h-full">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white font-bold mb-4"
                    style={{ backgroundColor: v.hubColor }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-neutral-700">{s.desc}</p>
                </div>
              ))}
            />
          </div>
        </div>
      </section>

      <Testimonials />

      <div id="contato">
        <ContactForm
          source={`vertical-${v.id}`}
          defaultSubject={v.name}
          lockedSubject
          title={`Fale com a área de ${v.name}`}
          subtitle="Em até 24h úteis um consultor entra em contato para entender seu cenário."
        />
      </div>

      <FAQSection items={segurosFaq} whatsappContext={v.id} />
    </>
  );
}
