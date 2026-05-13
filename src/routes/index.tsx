import { createFileRoute } from "@tanstack/react-router";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { ProofNumbers } from "@/components/sections/ProofNumbers";
import { VerticalCards } from "@/components/sections/VerticalCards";
import { WhyPlan10 } from "@/components/sections/WhyPlan10";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { OnlineContracting } from "@/components/sections/OnlineContracting";
import { PartnersLogos } from "@/components/sections/PartnersLogos";
import { ContactForm } from "@/components/sections/ContactForm";
import { FAQSection } from "@/components/sections/FAQSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Plan10 | Seguros, Saúde, Consórcio e Finanças — Corretora Multimodal" },
      { name: "description", content: "Mais de 40 produtos em um só lugar. Corretora multimodal credenciada pela SUSEP." },
      { property: "og:title", content: "Plan10 — Seu futuro muito mais tranquilo" },
      { property: "og:description", content: "Seguros, saúde, consórcio, finanças e serviços 24h." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroBanner />
      <ProofNumbers />
      <VerticalCards />
      <WhyPlan10 />
      <HowItWorks />
      <Testimonials />
      <OnlineContracting />
      <PartnersLogos />
      <div id="contato">
        <ContactForm source="home" subtitle="Conte seu cenário. Em até 24h úteis um especialista te retorna." />
      </div>
      <FAQSection whatsappContext="home" />
    </>
  );
}
