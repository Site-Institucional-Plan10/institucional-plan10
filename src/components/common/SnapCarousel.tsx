import { useEffect, useRef, useState, type ReactNode } from "react";

interface SnapCarouselProps {
  items: ReactNode[];
  ariaLabel?: string;
  /** CSS width for each card (responsive via clamp recommended) */
  itemWidth?: string;
  dataAttr?: string;
}

export function SnapCarousel({
  items,
  ariaLabel,
  itemWidth = "clamp(240px, 28vw, 300px)",
  dataAttr = "data-snap-carousel",
}: SnapCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((c, i) => {
        const cc = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(cc - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [items.length]);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (card) el.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
  };

  const attrs: Record<string, string> = {};
  attrs[dataAttr] = "";

  return (
    <div>
      <style>{`[${dataAttr}]::-webkit-scrollbar { display: none; }`}</style>
      <div
        ref={scrollerRef}
        {...attrs}
        aria-label={ariaLabel}
        style={{
          display: "flex",
          gap: 16,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          padding: "4px 16px 8px",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {items.map((node, i) => (
          <div
            key={i}
            style={{
              flex: `0 0 ${itemWidth}`,
              scrollSnapAlign: "start",
              display: "flex",
            }}
          >
            <div style={{ width: "100%" }}>{node}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir para item ${i + 1}`}
            style={{
              width: active === i ? 20 : 8,
              height: 8,
              borderRadius: 999,
              background: active === i ? "#FF6B00" : "rgba(0,0,0,0.18)",
              transition: "all 200ms ease",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}
