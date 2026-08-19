import { createFileRoute } from "@tanstack/react-router";
import { PremiumHero } from "@/components/home/PremiumHero";
import { SolutionsShowcase } from "@/components/sections/SolutionsShowcase";
import { ComoFunciona } from "@/components/home/ComoFunciona";
import { ParceirosStrip } from "@/components/home/ParceirosStrip";
import { ContactForm } from "@/components/sections/ContactForm";
import { ImageSlot } from "@/components/plan10/ImageSlot";
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Plan10 | Proteção, saúde e planejamento" },
      { name: "description", content: "Consultoria de proteção, saúde e planejamento para pessoas, famílias e empresas. Seu futuro muito mais tranquilo." },
      { property: "og:title", content: "Plan10, Seu futuro muito mais tranquilo" },
      { property: "og:description", content: "Proteção, saúde e planejamento organizados com clareza e critério." },
      { property: "og:url", content: canonical("/") },
    ],
    links: [
      { rel: "canonical", href: canonical("/") },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <PremiumHero />
      <SolutionsShowcase />
      <ComoFunciona />
      <section style={{ background: "#fff", padding: "0 20px 88px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <ImageSlot
            ratio="21 / 9"
            label="Imagem editorial da marca"
            hint="Cena premium que traduz tranquilidade e cuidado: náutico da marca, ou família e patrimônio bem cuidados."
          />
        </div>
      </section>
      <ParceirosStrip />
      <div id="contato">
        <ContactForm source="home" subtitle="Em até 24h úteis um consultor entra em contato para entender seu cenário." />
      </div>
    </>
  );
}
