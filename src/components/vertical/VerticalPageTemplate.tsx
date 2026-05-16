import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import type { VerticalConfig } from "@/data/verticals";
import { Button } from "@/components/ui/Plan10Button";
import { Toggle } from "@/components/ui/primitives";
import { ContactForm } from "@/components/sections/ContactForm";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQSection } from "@/components/sections/FAQSection";
import { SUSEPDisclaimer } from "@/components/common/SUSEPDisclaimer";
import { RedirectPopup } from "@/components/common/RedirectPopup";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { verticalHeroSlides } from "@/data/heroSlides";

interface VerticalPageProps {
  vertical: VerticalConfig;
  toggleEnabled?: boolean;
  toggleLabels?: { left: string; right: string };
  freeServices?: string[];
  steps?: { title: string; desc: string }[];
  faqItems?: { title: string; content: string }[];
  extraTop?: React.ReactNode;
  belowProducts?: React.ReactNode;
  productsTitle?: string;
  enableDirectContracting?: boolean;
}

export function VerticalPageTemplate({
  vertical,
  toggleEnabled,
  toggleLabels,
  freeServices,
  steps,
  faqItems,
  extraTop,
  belowProducts,
  productsTitle = "Nossos Produtos",
  enableDirectContracting,
}: VerticalPageProps) {
  const [tab, setTab] = useState("pf");
  const [popup, setPopup] = useState<{ url: string; partner: string } | null>(null);

  const defaultServices = freeServices || [
    "Análise de perfil gratuita",
    "Comparação entre instituições",
    "Suporte pós-contratação",
  ];
  const defaultSteps = steps || [
    { title: "Entendimento", desc: "Mapeamos seu cenário." },
    { title: "Comparação", desc: "Cotamos com várias parceiras." },
    { title: "Recomendação", desc: "Sugestão clara e objetiva." },
    { title: "Contratação", desc: "Acompanhamento completo." },
  ];

  const heroSlides = verticalHeroSlides[vertical.id];

  return (
    <>
      {/* 1. Hero carousel */}
      <section className="pt-20">
        <HeroCarousel slides={heroSlides} />
      </section>

      {extraTop}

      {/* 3. Toggle PF/PJ */}
      {toggleEnabled && (
        <section className="pt-16">
          <div className="container-x flex justify-center">
            <Toggle
              value={tab}
              onChange={setTab}
              options={[
                { value: "pf", label: toggleLabels?.left || "Pessoa Física" },
                { value: "pj", label: toggleLabels?.right || "Pessoa Jurídica" },
              ]}
            />
          </div>
        </section>
      )}

      {/* 4. Products grid */}
      <section className="section-y">
        <div className="container-x">
          <h2 className="font-h2 mb-8 text-center">{productsTitle}</h2>
          <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Produtos a inserir conforme planilha do cliente */}
            {[1, 2, 3, 4, 5, 6].map((n) => {
              const isMostWanted = n === 1;
              return (
                <div key={n} className="relative rounded-2xl border border-neutral-200 bg-white p-5">
                  {isMostWanted && (
                    <span className="absolute top-3 right-3 rounded-full bg-orange px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                      Mais Procurado
                    </span>
                  )}
                  <div
                    className="mb-4 w-full rounded-t-xl"
                    style={{
                      aspectRatio: "16 / 9",
                      backgroundColor: `${vertical.hubColor}26`,
                      borderRadius: "12px",
                    }}
                  />
                  <div
                    className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase mb-3"
                    style={{ backgroundColor: `${vertical.hubColor}1A`, color: vertical.hubColor }}
                  >
                    {tab === "pj" && toggleEnabled ? "PJ" : vertical.name}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Produto {n}</h3>
                  <p className="text-sm text-neutral-700 mb-5">Descrição breve do produto. Conteúdo placeholder.</p>
                  {enableDirectContracting ? (
                    <Button
                      variant="hub"
                      hubColor={vertical.hubColor}
                      size="sm"
                      onClick={() => setPopup({ url: "https://example.com", partner: `Parceiro ${vertical.name}` })}
                    >
                      Contratar <ArrowRight size={14} />
                    </Button>
                  ) : (
                    <a href="#contato">
                      <Button variant="hub" hubColor={vertical.hubColor} size="sm">
                        Solicitar proposta <ArrowRight size={14} />
                      </Button>
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          {vertical.id === "seguros" && (
            <div
              className="mt-6 rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              style={{
                backgroundColor: "rgba(255, 107, 0, 0.08)",
                borderLeft: "4px solid #FF6B00",
              }}
            >
              <div>
                <h3 className="font-semibold text-lg mb-1">Combine e economize</h3>
                <p className="text-sm text-neutral-700">
                  Contrate Auto + Residencial juntos e pague menos. Peça uma cotação combinada.
                </p>
              </div>
              <a href="#contato" className="flex-shrink-0">
                <Button variant="primary" size="sm">
                  Cotar combo <ArrowRight size={14} />
                </Button>
              </a>
            </div>
          )}
        </div>
      </section>

      {belowProducts}

      {/* 5. Free services */}
      <section className="section-y bg-neutral-100">
        <div className="container-x">
          <h2 className="font-h2 mb-8">Serviços inclusos sem custo adicional</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {defaultServices.map((s) => (
              <li key={s} className="flex items-start gap-3 rounded-xl bg-white p-4 border border-neutral-200">
                <Check className="mt-0.5 flex-shrink-0" style={{ color: vertical.hubColor }} size={20} />
                <span className="text-sm text-neutral-700">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. How it works */}
      <section className="section-y">
        <div className="container-x">
          <h2 className="font-h2 mb-10">Como funciona</h2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-4">
            {defaultSteps.map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-neutral-200 bg-white p-5">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white font-bold mb-4"
                  style={{ backgroundColor: vertical.hubColor }}
                >
                  {i + 1}
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-neutral-700">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <Testimonials filter={vertical.id} />

      {/* 8. Contact form */}
      <div id="contato">
        <ContactForm
          source={`vertical-${vertical.id}`}
          defaultSubject={vertical.name}
          lockedSubject
          title={`Fale com a área de ${vertical.name}`}
          subtitle="Em até 24h úteis um especialista te liga para entender seu cenário."
        />
      </div>

      {/* 9. FAQ */}
      <FAQSection items={faqItems} whatsappContext={vertical.id} />

      {/* 10. SUSEP disclaimer */}
      <section className="py-8 bg-neutral-100">
        <SUSEPDisclaimer />
      </section>

      <RedirectPopup
        isOpen={!!popup}
        onClose={() => setPopup(null)}
        targetUrl={popup?.url || ""}
        partnerName={popup?.partner || ""}
      />
    </>
  );
}
