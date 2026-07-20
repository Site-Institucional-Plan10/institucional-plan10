import { createFileRoute } from "@tanstack/react-router";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { SolutionsShowcase } from "@/components/sections/SolutionsShowcase";
import { ProofNumbers } from "@/components/sections/ProofNumbers";
import { VerticalCards } from "@/components/sections/VerticalCards";
import { WhyPlan10 } from "@/components/sections/WhyPlan10";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { OnlineContracting } from "@/components/sections/OnlineContracting";
import { PartnersLogos } from "@/components/sections/PartnersLogos";
import { ContactForm } from "@/components/sections/ContactForm";
import { FAQSection } from "@/components/sections/FAQSection";
import { canonical, faqJsonLd } from "@/lib/seo";

const homeFaq = [
  { title: "A Plan10 é uma seguradora?", content: "Não. A Plan10 é uma corretora multimodal que conecta você às melhores seguradoras e instituições do país." },
  { title: "Quanto custa a consultoria?", content: "A consultoria Plan10 é gratuita. Você só paga pelo produto contratado, com o mesmo preço da seguradora." },
  { title: "Atendem todo o Brasil?", content: "Sim. O atendimento é digital e chega a todo o território nacional." },
  { title: "Como funciona o suporte em sinistro?", content: "Acompanhamos o processo do início ao fim, ajudando na documentação e comunicação com a seguradora." },
  { title: "Quais seguradoras vocês trabalham?", content: "Trabalhamos com as principais seguradoras do mercado brasileiro. Veja a lista completa na seção Parceiros." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Plan10 | Seguros, Saúde, Consórcio e Finanças" },
      { name: "description", content: "Mais de 40 soluções de proteção, saúde e planejamento em um só lugar." },
      { property: "og:title", content: "Plan10, Seu futuro muito mais tranquilo" },
      { property: "og:description", content: "Seguros, saúde, consórcio, finanças e serviços 24h." },
      { property: "og:url", content: canonical("/") },
    ],
    links: [
      { rel: "canonical", href: canonical("/") },
      { rel: "preload", as: "image", href: "/assets/banners/hero-home-1.png", fetchPriority: "high" },
    ],
    scripts: [{ type: "application/ld+json", children: faqJsonLd(homeFaq) }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroBanner />
      <VerticalCards />
      <ProofNumbers />
      <WhyPlan10 />
      <HowItWorks />
      <Testimonials />
      <OnlineContracting />
      <PartnersLogos />
      <div id="contato">
        <ContactForm source="home" subtitle="Em até 24h úteis um consultor entra em contato para entender seu cenário." />
      </div>
      <FAQSection whatsappContext="home" />
    </>
  );
}
