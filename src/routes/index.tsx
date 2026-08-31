import { createFileRoute } from "@tanstack/react-router";
import { PremiumHero } from "@/components/home/PremiumHero";
import { BrandPromise } from "@/components/home/BrandPromise";
import { SolutionsShowcase } from "@/components/sections/SolutionsShowcase";
import { SolucoesOnline } from "@/components/home/SolucoesOnline";
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
      <BrandPromise />
      <SolucoesOnline />
      <section style={{ background: "#F4F2EC", padding: "72px 24px 72px" }}>
        <style>{`
          .home-editorial { margin: 0; border-radius: 14px; overflow: hidden; box-shadow: 0 30px 70px rgba(12,35,64,.16); max-width: 1080px; margin-inline: auto; position: relative; }
          .home-editorial img { display: block; width: 100%; object-fit: cover; object-position: center; aspect-ratio: 16 / 7; }
          .home-editorial figcaption {
            position: absolute; left: 0; bottom: 0; right: 0; padding: 52px 40px 34px;
            background: linear-gradient(0deg, rgba(6,16,26,.95) 0%, rgba(6,16,26,.82) 32%, rgba(6,16,26,.5) 62%, rgba(6,16,26,.14) 85%, transparent 100%);
            color: #FFFFFF;
          }
          .home-editorial figcaption p {
            font-family: 'Schibsted Grotesk','Inter',sans-serif; font-weight: 500;
            font-size: clamp(1.15rem, 2.2vw, 1.7rem); line-height: 1.25; letter-spacing: -.02em;
            margin: 0; max-width: 24ch; text-shadow: 0 2px 20px rgba(0,0,0,.35);
          }
          @media (max-width: 640px) { .home-editorial img { aspect-ratio: 4 / 5; } .home-editorial figcaption { padding: 26px 22px 22px; } }
        `}</style>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <figure className="home-editorial">
            <img
              src="/assets/images/familia-ao-entardecer.jpg"
              alt="Família reunida no jardim de casa moderna ao pôr do sol"
              loading="lazy"
            />
            <figcaption><p>Um futuro muito mais tranquilo, para a sua família e para o seu negócio.</p></figcaption>
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
