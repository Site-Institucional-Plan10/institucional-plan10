import { useEffect, useRef, useState, type ReactNode, type TouchEvent as ReactTouchEvent } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  MessageCircle,
  Shield,
  Heart,
  Building2,
  TrendingUp,
  Clock,
  Check,
  ShieldCheck,
  HeartPulse,
  Landmark,
  Banknote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Plan10Button";
import { cn, getWhatsAppUrl, getVerticalContextFromPath } from "@/lib/utils";

type IconName =
  | "Shield"
  | "Heart"
  | "Building2"
  | "TrendingUp"
  | "Clock"
  | "ShieldCheck"
  | "HeartPulse"
  | "Landmark"
  | "Banknote";
const iconMap: Record<IconName, typeof Shield> = {
  Shield,
  Heart,
  Building2,
  TrendingUp,
  Clock,
  ShieldCheck,
  HeartPulse,
  Landmark,
  Banknote,
};

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
  pills?: { icon: IconName; label: string; color: string; route?: string }[];
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
}

export interface HeroSlideSplit {
  id: string | number;
  layout: "split";
  background: string;
  hubColor: string;
  circleImage: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  microcopy: string[];
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
}

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

export function HeroCarousel({
  slides,
  intervalMs = 7000,
  minHeightClass = "min-h-[100svh] md:min-h-[640px]",
}: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);
  const { pathname } = useLocation();
  const waHref = getWhatsAppUrl(getVerticalContextFromPath(pathname));
  const pausedRef = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    const t = setInterval(() => {
      if (!pausedRef.current) setActive((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [slides.length, intervalMs, tick]);

  const go = (i: number) => {
    setActive(((i % slides.length) + slides.length) % slides.length);
    setTick((t) => t + 1);
  };
  const handlePrev = () => go(active - 1);
  const handleNext = () => go(active + 1);

  const handleTouchStart = (e: ReactTouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: ReactTouchEvent) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = Math.abs(touchStartY.current - e.changedTouches[0].clientY);
    if (Math.abs(diffX) > 40 && diffY < 60) {
      if (diffX > 0) handleNext();
      else handlePrev();
    }
  };

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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

      {/* Prev / Next arrows */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Banner anterior"
        className="hero-arrow hero-arrow-left"
      >
        <ChevronLeft size={22} strokeWidth={2.5} />
      </button>
      <button
        type="button"
        onClick={handleNext}
        aria-label="Próximo banner"
        className="hero-arrow hero-arrow-right"
      >
        <ChevronRight size={22} strokeWidth={2.5} />
      </button>

      {/* Dots */}
      <div className="hero-dots flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
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

function SlideShell({
  children,
  background,
  bgImage,
  bgPosition,
  overlay1,
  overlay2,
  minHeightClass,
}: {
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
      {overlay1 && (
        <div className="absolute inset-0 pointer-events-none" style={{ background: overlay1, zIndex: 1 }} />
      )}
      {overlay2 && (
        <div className="absolute inset-0 pointer-events-none" style={{ background: overlay2, zIndex: 2 }} />
      )}
      <div className="relative" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
}

function CenteredSlide({
  slide,
  waHref,
  minHeightClass,
}: {
  slide: HeroSlideCentered;
  waHref: string;
  minHeightClass: string;
}) {
  return (
    <SlideShell
      bgImage={slide.backgroundImage}
      bgPosition={slide.backgroundPosition}
      overlay1={slide.overlayLayer1 ?? "rgba(5, 8, 35, 0.88)"}
      overlay2={
        slide.overlayLayer2 ?? "radial-gradient(ellipse at center, rgba(26,79,160,0.25) 0%, transparent 70%)"
      }
      minHeightClass={minHeightClass}
    >
      <div
        className={cn(
          "container-x flex flex-col items-center justify-center text-center text-white py-16 md:py-24",
          minHeightClass,
        )}
      >
        <p
          className="mb-5 uppercase"
          style={{ color: "#FF6B00", letterSpacing: "0.15em", fontSize: "0.75rem", fontWeight: 700 }}
        >
          {slide.eyebrow}
        </p>
        <h1
          className="font-extrabold tracking-tight"
          style={{ fontSize: "clamp(1.65rem, 5vw, 3.5rem)", lineHeight: 1.14 }}
        >
          {slide.headlineLines.map((line, idx) => (
            <span
              key={idx}
              className="block"
              style={{ color: line === slide.headlineAccent ? "#FF6B00" : "#FFFFFF" }}
            >
              {line}
            </span>
          ))}
        </h1>
        <p
          className="mt-5 text-base md:text-lg"
          style={{ color: "rgba(255,255,255,0.75)", maxWidth: 560, lineHeight: 1.6 }}
        >
          {slide.subheadline}
        </p>

        {slide.pills && slide.pills.length > 0 && (
          <div
            className="mt-8 grid grid-cols-2 w-full"
            style={{ gap: 10, maxWidth: 420 }}
          >
            {slide.pills.map((p) => {
              const Ico = iconMap[p.icon];
              const content = (
                <>
                  {Ico && <Ico size={18} style={{ color: p.color }} strokeWidth={2} />}
                  <span
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      letterSpacing: "0.10em",
                      color: "white",
                    }}
                  >
                    {p.label}
                  </span>
                </>
              );
              const className = "hub-badge";
              return p.route ? (
                <Link key={p.label} to={p.route} className={className}>
                  {content}
                </Link>
              ) : (
                <span key={p.label} className={className}>
                  {content}
                </span>
              );
            })}
          </div>
        )}

        <div className="mt-7 flex flex-col sm:flex-row flex-wrap justify-center gap-3 w-full sm:w-auto">
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto justify-center">
              <MessageCircle size={18} />
              Fale com nosso consultor
            </Button>
          </a>
          {slide.ctaSecondaryHref && (
            <a href={slide.ctaSecondaryHref} className="w-full sm:w-auto">
              <Button
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto justify-center"
                style={{
                  border: "1.5px solid rgba(255,255,255,0.60)",
                  color: "#FFFFFF",
                  background: "transparent",
                }}
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

const imagePositions: Record<string, string> = {
  "hero-home-1.png": "center 52%",
  "hero-home-2.jpg": "center 50%",
  "hero-seguros-1.png": "28% 58%",
  "hero-seguros-2.png": "center 22%",
  "hero-saude-1.png": "center 18%",
  "hero-saude-2.jpg": "center 15%",
  "hero-consorcios-1.png": "68% 38%",
  "hero-consorcios-2.png": "42% center",
  "hero-financas-1.png": "center 30%",
  "hero-financas-2.png": "center 12%",
  "hero-servicos-1.png": "38% 50%",
  "hero-servicos-2.png": "center 42%",
};

function getImagePosition(src: string): string {
  const filename = src.split("/").pop() ?? "";
  return imagePositions[filename] ?? "center center";
}

function SplitSlide({
  slide,
  waHref,
  minHeightClass,
}: {
  slide: HeroSlideSplit;
  waHref: string;
  minHeightClass: string;
}) {
  return (
    <SlideShell background={slide.background} minHeightClass={minHeightClass}>
      <div
        className={cn(
          "hero-banner-inner container-x flex flex-col md:flex-row md:items-center md:justify-between gap-7 md:gap-12 pt-24 pb-24 md:py-20",
          minHeightClass,
        )}
      >
        {/* LEFT column on desktop: all text + CTAs */}
        <div className="hero-banner-text flex flex-col items-center md:items-start text-center md:text-left text-white order-1 md:order-1 w-full md:basis-[52%] md:flex-none gap-4">
          <p
            className="uppercase order-1"
            style={{
              color: slide.hubColor,
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              fontWeight: 700,
            }}
          >
            {slide.eyebrow}
          </p>
          <h1
            className="font-extrabold order-2"
            style={{ fontSize: "clamp(1.6rem, 5vw, 3rem)", lineHeight: 1.18, color: "#FFFFFF" }}
          >
            {slide.headline}
          </h1>

          {/* Circle on mobile only - inserted between headline (order-2) and microcopy (order-4) */}
          <div className="order-3 md:hidden flex justify-center w-full">
            <CircleImage src={slide.circleImage} size={240} />
          </div>

          <p
            className="hidden md:block order-4"
            style={{ color: "rgba(255,255,255,0.72)", fontSize: "1rem", maxWidth: 480, lineHeight: 1.6 }}
          >
            {slide.subheadline}
          </p>

          <ul className="order-5 mt-2 flex flex-col items-center md:items-start sm:flex-row md:flex-row sm:flex-wrap gap-x-5 gap-y-2 w-full md:w-auto">
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

          <div className="hero-banner-ctas order-6 mt-4 flex flex-col sm:flex-row flex-wrap gap-3 w-full md:w-auto">
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto justify-center">
                <MessageCircle size={18} />
                Fale com nosso consultor
              </Button>
            </a>
            {slide.ctaSecondaryHref && (
              <a href={slide.ctaSecondaryHref} className="w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto justify-center"
                  style={{
                    border: "1.5px solid rgba(255,255,255,0.60)",
                    color: "#FFFFFF",
                    background: "transparent",
                  }}
                >
                  {slide.ctaSecondaryLabel ?? "Saiba mais"}
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* RIGHT column on desktop: circle */}
        <div className="hero-banner-visual hidden md:flex md:order-2 md:basis-[44%] md:flex-none justify-center items-center">
          <CircleImage src={slide.circleImage} sizeClass="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]" />
        </div>
      </div>
    </SlideShell>
  );
}

function CircleImage({
  src,
  size,
  sizeClass,
}: {
  src: string;
  size?: number;
  sizeClass?: string;
}) {
  return (
    <div
      className={cn("relative overflow-hidden", sizeClass)}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: "2px solid rgba(255, 107, 0, 0.5)",
        boxShadow:
          "0 0 0 10px rgba(255, 107, 0, 0.07), 0 0 0 22px rgba(255, 107, 0, 0.03), 0 32px 80px rgba(0, 0, 0, 0.6)",
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: getImagePosition(src),
        }}
      />
    </div>
  );
}

