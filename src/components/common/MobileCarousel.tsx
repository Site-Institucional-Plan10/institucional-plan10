import { useEffect, useRef, useState, type ReactNode } from "react";

interface MobileCarouselProps {
  items: ReactNode[];
  itemWidth?: string;
  ariaLabel?: string;
}

export function MobileCarousel({ items, itemWidth = "85%", ariaLabel }: MobileCarouselProps) {
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
        const cardCenter = c.offsetLeft + c.offsetWidth / 2;
        const dist = Math.abs(cardCenter - center);
        if (dist < bestDist) {
          bestDist = dist;
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

  return (
    <div className="md:hidden">
      <style>{`
        [data-mobile-carousel]::-webkit-scrollbar { display: none; }
      `}</style>
      <div
        ref={scrollerRef}
        data-mobile-carousel
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
              scrollSnapAlign: "center",
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
