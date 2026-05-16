import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import { MessageCircle, Shield, Heart, Building2, TrendingUp, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/Plan10Button";
import { cn, getWhatsAppUrl, getVerticalContextFromPath } from "@/lib/utils";

type IconName = "Shield" | "Heart" | "Building2" | "TrendingUp" | "Clock";
const iconMap: Record<IconName, typeof Shield> = { Shield, Heart, Building2, TrendingUp, Clock };

export interface HeroSlideCentered {
  id: string | number;
  layout: "centered";
  backgroundImage?: string;
  backgroundPosition?: string;
  overlayLayer1?: string;
  overlayLayer2?: string;
  eyebrow: string;
  headlineLines: string[];
  headlineAccent?: string;
  subheadline: string;
  pills?: { icon: IconName; label: string; color: string }[];
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
}

export interface HeroSlideSplit {
  id: string | number;
  layout: "split";
  background: string; // full CSS background (gradient)
  hubColor: string;
  circleImage: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  microcopy: string[];
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
}

// Legacy shape (still used by some pages) — treated as centered
export interface HeroSlideLegacy {
  id: string | number;
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

export type HeroSlide = HeroSlideCentered | HeroSlideSplit | HeroSlideLegacy;

interface HeroCarouselProps {
  slides: HeroSlide[];
  intervalMs?: number;
  minHeightClass?: string;
}

function normalizeSlide(s: HeroSlide): HeroSlideCentered | HeroSlideSplit {
  if ("layout" in s) return s;
  return {
    id: s.id,
    layout: "centered",
    backgroundImage: s.backgroundImage,
    backgroundPosition: s.backgroundPosition,
    overlayLayer1: s.overlayLayer1,
    overlayLayer2: s.overlayLayer2,
    eyebrow: s.badge,
    headlineLines: s.headlineLines,
    headlineAccent: s.headlineAccent,
    subheadline: s.subheadline,
    ctaSecondaryLabel: s.ctaSecondaryLabel,
    ctaSecondaryHref: s.ctaSecondaryHref,
  };
}

export function HeroCarousel({ slides, intervalMs = 7000, minHeightClass = "min-h-[560px] md:min-h-[640px]" }: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const { pathname } = useLocation();
  const waHref = getWhatsAppUrl(getVerticalContextFromPath(pathname));
  const pausedRef = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      if (!pausedRef.current) setActive((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [slides.length, intervalMs]);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div className={cn("relative", minHeightClass)}>
        {slides.map((raw, i) => {
          const slide = normalizeSlide(raw);
          const isActive = i === active;
          return (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-[700ms] ease-in-out",
                isActive ? "opacity-100 z-[5]" : "opacity-0 z-0 pointer-events-none",
              )}
              aria-hidden={!isActive}
            >
              {slide.layout === "centered" ? (
                <CenteredSlide slide={slide} waHref={waHref} minHeightClass={minHeightClass} />
              ) : (
                <SplitSlide slide={slide} waHref={waHref} minHeightClass={minHeightClass} />
              )}
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 lg:left-8 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className={cn(
              "h-2 w-2 rounded-full border border-white/80 transition",
              i === active ? "bg-white" : "bg-transparent",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function SlideShell({ children, background, bgImage, bgPosition, overlay1, overlay2, minHeightClass }: {
  children: ReactNode;
  background?: string;
  bgImage?: string;
  bgPosition?: string;
  overlay1?: string;
  overlay2?: string;
  minHeightClass: string;
}) {
  return (
    <div
      className={cn("relative w-full h-full", minHeightClass)}
      style={
        bgImage
          ? {
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: bgPosition ?? "center",
              backgroundRepeat: "no-repeat",
            }
          : { background }
      }
    >
      {overlay1 && <div className="absolute inset-0 pointer-events-none" style={{ background: overlay1, zIndex: 1 }} />}
      {overlay2 && <div className="absolute inset-0 pointer-events-none" style={{ background: overlay2, zIndex: 2 }} />}
      <div className="relative" style={{ zIndex: 10 }}>{children}</div>
    </div>
  );
}

function CenteredSlide({ slide, waHref, minHeightClass }: { slide: HeroSlideCentered; waHref: string; minHeightClass: string }) {
  return (
    <SlideShell
      bgImage={slide.backgroundImage}
      bgPosition={slide.backgroundPosition}
      overlay1={slide.overlayLayer1 ?? "rgba(5, 8, 35, 0.88)"}
      overlay2={slide.overlayLayer2 ?? "radial-gradient(ellipse at center, rgba(26,79,160,0.25) 0%, transparent 70%)"}
      minHeightClass={minHeightClass}
    >
      <div className={cn("container-x flex flex-col items-center justify-center text-center text-white py-16 md:py-24", minHeightClass)}>
        <p
          className="mb-5 uppercase"
          style={{ color: "#FF6B00", letterSpacing: "0.15em", fontSize: "0.75rem", fontWeight: 700 }}
        >
          {slide.eyebrow}
        </p>
        <h1
          className="font-extrabold tracking-tight"
          style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", lineHeight: 1.14 }}
        >
          {slide.headlineLines.map((line, idx) => (
            <span key={idx} className="block" style={{ color: line === slide.headlineAccent ? "#FF6B00" : "#FFFFFF" }}>
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-5 text-base md:text-lg" style={{ color: "rgba(255,255,255,0.75)", maxWidth: 560, lineHeight: 1.6 }}>
          {slide.subheadline}
        </p>

        {slide.pills && slide.pills.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
            {slide.pills.map((p) => {
              const Ico = iconMap[p.icon];
              return (
                <span
                  key={p.label}
                  className="inline-flex items-center justify-center gap-2"
                  style={{
                    padding: "10px 20px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.20)",
                    background: "rgba(255,255,255,0.07)",
                    backdropFilter: "blur(8px)",
                    color: "white",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                  }}
                >
                  {Ico && <Ico size={16} style={{ color: p.color }} strokeWidth={2} />}
                  {p.label}
                </span>
              );
            })}
          </div>
        )}

        <div className="mt-7 flex flex-col sm:flex-row flex-wrap justify-center gap-3 w-full sm:w-auto">
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto justify-center">
              <MessageCircle size={18} />
              Falar com Especialista
            </Button>
          </a>
          {slide.ctaSecondaryHref && (
            <a href={slide.ctaSecondaryHref} className="w-full sm:w-auto">
              <Button
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto justify-center"
                style={{ border: "1.5px solid rgba(255,255,255,0.60)", color: "#FFFFFF", background: "transparent" }}
              >
                {slide.ctaSecondaryLabel ?? "Saiba mais"}
              </Button>
            </a>
          )}
        </div>
      </div>
    </SlideShell>
  );
}

function SplitSlide({ slide, waHref, minHeightClass }: { slide: HeroSlideSplit; waHref: string; minHeightClass: string }) {
  return (
    <SlideShell background={slide.background} minHeightClass={minHeightClass}>
      <div className={cn("container-x grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center py-14 md:py-20", minHeightClass)}>
        {/* Circle image — mobile first (above text), desktop right */}
        <div className="order-1 lg:order-2 flex justify-center">
          <div
            className="relative overflow-hidden w-[220px] h-[220px] md:w-[400px] md:h-[400px]"
            style={{
              borderRadius: "50%",
              border: "2px solid rgba(255, 107, 0, 0.5)",
              boxShadow:
                "0 0 0 10px rgba(255, 107, 0, 0.07), 0 0 0 22px rgba(255, 107, 0, 0.03), 0 32px 80px rgba(0, 0, 0, 0.6)",
            }}
          >
            <img
              src={slide.circleImage}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>

        {/* Text */}
        <div className="order-2 lg:order-1 text-white text-center lg:text-left">
          <p
            className="mb-4 uppercase"
            style={{ color: slide.hubColor, fontSize: "0.72rem", letterSpacing: "0.12em", fontWeight: 700 }}
          >
            {slide.eyebrow}
          </p>
          <h1
            className="font-extrabold"
            style={{ fontSize: "clamp(1.6rem, 5vw, 3rem)", lineHeight: 1.18, color: "#FFFFFF" }}
          >
            {slide.headline}
          </h1>
          <p
            className="mt-5 mx-auto lg:mx-0 hidden md:block"
            style={{ color: "rgba(255,255,255,0.72)", fontSize: "1rem", maxWidth: 480, lineHeight: 1.6 }}
          >
            {slide.subheadline}
          </p>

          <ul className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start">
            {slide.microcopy.map((m) => (
              <li
                key={m}
                className="inline-flex items-center gap-2"
                style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem" }}
              >
                <Check size={16} style={{ color: slide.hubColor }} strokeWidth={2.5} />
                {m}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start w-full">
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto justify-center">
                <MessageCircle size={18} />
                Falar com Especialista
              </Button>
            </a>
            {slide.ctaSecondaryHref && (
              <a href={slide.ctaSecondaryHref} className="w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto justify-center"
                  style={{ border: "1.5px solid rgba(255,255,255,0.60)", color: "#FFFFFF", background: "transparent" }}
                >
                  {slide.ctaSecondaryLabel ?? "Saiba mais"}
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
