import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Plan10Button";
import { WHATSAPP_URL } from "@/components/common/WhatsAppButton";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  id: number | string;
  backgroundImage: string;
  backgroundPosition?: string;
  overlayLayer1: string;
  overlayLayer2: string;
  badge: string;
  headlineLines: string[];
  headlineAccent: string;
  subheadline: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  intervalMs?: number;
  minHeightClass?: string;
}

export function HeroCarousel({ slides, intervalMs = 6000, minHeightClass = "min-h-[560px]" }: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      if (!pausedRef.current) setActive((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [slides.length, intervalMs]);

  const current = slides[active];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {slides.map((slide, i) => {
        const isActive = i === active;
        return (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-[800ms] ease-in-out",
              isActive ? "opacity-100" : "opacity-0",
            )}
            style={{
              backgroundImage: `url(${slide.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: slide.backgroundPosition ?? "center",
              backgroundRepeat: "no-repeat",
            }}
            aria-hidden={!isActive}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: slide.overlayLayer1 }} />
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, background: slide.overlayLayer2 }} />
          </div>
        );
      })}

      <div className={cn("relative container-x grid gap-10 lg:grid-cols-2 lg:items-center py-20 md:py-28", minHeightClass)} style={{ zIndex: 10 }}>
        <div className="text-white" style={{ position: "relative", zIndex: 10 }}>
          <p
            className="mb-5 uppercase"
            style={{ color: "rgba(255,255,255,0.78)", letterSpacing: "0.1em", fontSize: "0.75rem", fontWeight: 600 }}
          >
            {current.badge}
          </p>
          <h1 className="font-display" style={{ fontWeight: 800 }}>
            {current.headlineLines.map((line, idx) => (
              <span
                key={idx}
                className="block"
                style={{ color: line === current.headlineAccent ? "#FF6B00" : "#FFFFFF" }}
              >
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 text-lg max-w-xl leading-[1.7]" style={{ color: "rgba(255,255,255,0.88)" }}>
            {current.subheadline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">
                <MessageCircle size={18} />
                Falar com Especialista
              </Button>
            </a>
            {current.ctaSecondaryHref && (
              <a href={current.ctaSecondaryHref}>
                <Button
                  variant="ghost"
                  size="lg"
                  style={{
                    border: "1.5px solid rgba(255,255,255,0.60)",
                    color: "#FFFFFF",
                    background: "transparent",
                  }}
                >
                  {current.ctaSecondaryLabel ?? "Saiba mais"}
                </Button>
              </a>
            )}
          </div>
        </div>

        <div className="absolute bottom-6 left-4 sm:left-6 lg:left-8 flex gap-2 z-10">
          {slides.map((_, i) => (
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
  );
}
