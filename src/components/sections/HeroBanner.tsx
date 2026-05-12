import { useEffect, useRef, useState } from "react";
import { MessageCircle, Check, Shield } from "lucide-react";
import { Plan10Logo } from "@/components/ui/Plan10Logo";
import { Button } from "@/components/ui/Plan10Button";
import { WHATSAPP_URL } from "@/components/common/WhatsAppButton";
import { cn } from "@/lib/utils";

interface HeroSlide {
  id: number;
  backgroundImage: string | null;
  placeholderBg: string;
  badge: string;
  headline: string[];
  headlineAccent: string;
  subheadline: string;
}

const heroBanners: HeroSlide[] = [
  {
    id: 1,
    backgroundImage: null,
    placeholderBg: "linear-gradient(135deg, #1A4FA0 0%, #0D2B6E 100%)",
    badge: "Corretora multimodal · Credenciada SUSEP",
    headline: ["Seu futuro", "muito mais", "tranquilo."],
    headlineAccent: "tranquilo.",
    subheadline: "Mais de 40 produtos em um só lugar: seguros, saúde, consórcio e finanças.",
  },
  {
    id: 2,
    backgroundImage: null,
    placeholderBg: "linear-gradient(135deg, #0D2B6E 0%, #1A4FA0 100%)",
    badge: "Proteção completa para sua família",
    headline: ["Proteção,", "saúde e", "planejamento."],
    headlineAccent: "planejamento.",
    subheadline: "Consultoria independente para pessoa física e jurídica em 5 grandes áreas.",
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
  const [active, setActive] = useState(0);
  const [stripIdx, setStripIdx] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      if (!pausedRef.current) setActive((i) => (i + 1) % heroBanners.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setStripIdx((i) => (i + 1) % stripBanners.length), 4000);
    return () => clearInterval(t);
  }, []);

  const scrollToVerticals = () => {
    document.getElementById("verticais")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pt-20">
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {heroBanners.map((slide, i) => {
          const isActive = i === active;
          const bgStyle: React.CSSProperties = slide.backgroundImage
            ? { backgroundImage: `url(${slide.backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }
            : { background: slide.placeholderBg };
          return (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-[800ms] ease-in-out",
                isActive ? "opacity-100" : "opacity-0",
              )}
              style={bgStyle}
              aria-hidden={!isActive}
            >
              {/* Symbol watermark */}
              <div className="absolute inset-0 flex items-center justify-end opacity-[0.08] pointer-events-none">
                <Plan10Logo variant="symbol" size={600} />
              </div>
            </div>
          );
        })}

        {/* Foreground content — driven by active slide */}
        <div className="relative container-x grid gap-10 lg:grid-cols-2 lg:items-center py-20 md:py-28 min-h-[560px]">
          <div className="text-white">
            <p className="font-eyebrow text-orange mb-5">{heroBanners[active].badge}</p>
            <h1 className="font-display">
              {heroBanners[active].headline.map((line, idx) => (
                <span key={idx} className="block">
                  {line === heroBanners[active].headlineAccent ? (
                    <span className="text-orange">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>
            <p className="mt-6 text-lg text-white/85 max-w-lg leading-[1.7]">
              {heroBanners[active].subheadline}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
              {["Análise gratuita", "Atendimento humano", "Compare antes de contratar"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <Check size={16} className="text-orange" /> {t}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  <MessageCircle size={18} />
                  Falar com Especialista
                </Button>
              </a>
              <Button
                variant="ghost"
                size="lg"
                onClick={scrollToVerticals}
                className="bg-white/10 text-white hover:bg-white/20 border border-white/30"
              >
                Conhecer Soluções
              </Button>
            </div>
          </div>

          <div className="hidden lg:flex justify-end">
            <div className="rounded-2xl bg-white p-5 shadow-xl flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange/10">
                <Shield className="text-orange" size={24} />
              </div>
              <div>
                <div className="font-bold text-xl text-ink">+5.000 clientes</div>
                <div className="text-sm text-neutral-700">confiam na Plan10</div>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-6 left-4 sm:left-6 lg:left-8 flex gap-2 z-10">
            {heroBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                className={cn(
                  "h-2 w-2 rounded-full border border-white transition",
                  i === active ? "bg-white" : "bg-transparent",
                )}
              />
            ))}
          </div>
        </div>
      </div>

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
