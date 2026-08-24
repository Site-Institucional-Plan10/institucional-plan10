import { createFileRoute } from "@tanstack/react-router";
import { PremiumHero } from "@/components/home/PremiumHero";
import { SolutionsShowcase } from "@/components/sections/SolutionsShowcase";
import { ComoFunciona } from "@/components/home/ComoFunciona";
import { ParceirosStrip } from "@/components/home/ParceirosStrip";
import { ContactForm } from "@/components/sections/ContactForm";
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
      <section style={{ background: "#fff", padding: "84px 20px 96px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <figure
            style={{
              margin: 0,
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid #E6E1D6",
              boxShadow: "0 24px 60px rgba(12,35,64,.12)",
            }}
          >
            <img
              src="/assets/images/hero-veleiro.jpg"
              alt="Veleiro ao entardecer em águas calmas, a imagem editorial da Plan10"
              style={{ display: "block", width: "100%", aspectRatio: "21 / 9", objectFit: "cover" }}
              loading="lazy"
            />
          </figure>
        </div>
      </section>
      <ParceirosStrip />
      <div id="contato">
        <ContactForm source="home" subtitle="Em até 24h úteis um consultor entra em contato para entender seu cenário." />
      </div>
    </>
  );
}
