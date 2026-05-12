import { useEffect, useState } from "react";
import { HeroCarousel, type HeroSlide } from "./HeroCarousel";

const homeSlides: HeroSlide[] = [
  {
    id: 1,
    backgroundImage: "/assets/banners/hero-home-1.png",
    backgroundPosition: "center 35%",
    overlayLayer1: "rgba(0, 0, 0, 0.48)",
    overlayLayer2: "linear-gradient(105deg, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.08) 55%, rgba(0,0,0,0.00) 100%)",
    badge: "Corretora multimodal · Credenciada SUSEP",
    headlineLines: ["Seu futuro", "muito mais", "tranquilo."],
    headlineAccent: "tranquilo.",
    subheadline: "Mais de 40 produtos em um só lugar: seguros, saúde, consórcio e finanças.",
    ctaSecondaryLabel: "Conhecer Soluções",
    ctaSecondaryHref: "#verticais",
  },
  {
    id: 2,
    backgroundImage: "/assets/banners/hero-home-2.jpg",
    backgroundPosition: "center 50%",
    overlayLayer1: "rgba(0, 5, 20, 0.55)",
    overlayLayer2: "linear-gradient(105deg, rgba(0,5,20,0.45) 0%, rgba(26,79,160,0.20) 60%, rgba(0,0,0,0.00) 100%)",
    badge: "Proteção completa para sua família",
    headlineLines: ["Proteção,", "saúde e", "planejamento."],
    headlineAccent: "planejamento.",
    subheadline: "Consultoria independente para pessoa física e jurídica em 5 grandes áreas.",
    ctaSecondaryLabel: "Conhecer Soluções",
    ctaSecondaryHref: "#verticais",
  },
];

const stripBanners = [
  { kind: "Institucional", text: "Seu futuro muito mais tranquilo." },
  { kind: "Destaque", text: "[Produto em destaque — placeholder]" },
  { kind: "Promoção", text: "[Promoção da semana — placeholder]" },
  { kind: "Novidade", text: "[Novidade — placeholder]" },
  { kind: "Aviso", text: "[Avisos — placeholder]" },
];

export function HeroBanner() {
  const [stripIdx, setStripIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStripIdx((i) => (i + 1) % stripBanners.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="pt-20">
      <HeroCarousel slides={homeSlides} />

      {/* Banner strip — rotating */}
      <div className="bg-ink text-white">
        <div className="container-x py-4 flex items-center gap-4 overflow-hidden">
          <span className="font-eyebrow text-orange flex-shrink-0">{stripBanners[stripIdx].kind}</span>
          <p key={stripIdx} className="text-sm md:text-base truncate">
            {stripBanners[stripIdx].text}
          </p>
          <div className="ml-auto hidden md:flex gap-1.5 flex-shrink-0">
            {stripBanners.map((_, i) => (
              <span
                key={i}
                className="h-1.5 w-6 rounded-full transition"
                style={{ backgroundColor: i === stripIdx ? "#FF6B00" : "rgba(255,255,255,0.2)" }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
