import { useEffect, useRef, useState } from "react";
import { Calendar, Users, Handshake, Package, Clock } from "lucide-react";

type Item = {
  Icon: typeof Calendar;
  value: string;
  label: string;
  // Numeric target for count-up; if undefined, value is shown as-is.
  target?: number;
  prefix?: string;
  suffix?: string;
};

const items: Item[] = [
  { Icon: Calendar, value: "2016", label: "Fundação", target: 2016 },
  { Icon: Users, value: "5K+", label: "Clientes", target: 5, suffix: "K+" },
  { Icon: Handshake, value: "50+", label: "Parceiros", target: 50, suffix: "+" },
  { Icon: Package, value: "+40", label: "Produtos", target: 40, prefix: "+" },
  { Icon: Clock, value: "24/7", label: "Atendimento" },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function CountUp({ item, start }: { item: Item; start: boolean }) {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start || item.target === undefined) return;
    const duration = 1500;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      setVal(Math.round(easeOutCubic(p) * (item.target ?? 0)));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, item.target]);

  if (item.target === undefined) return <>{item.value}</>;
  return (
    <>
      {item.prefix ?? ""}
      {val}
      {item.suffix ?? ""}
    </>
  );
}

export function ProofNumbers({ compact = false }: { compact?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="numeros"
      className="numbers-section relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1A4FA0 0%, #0D2B6E 100%)",
        padding: compact ? "40px 0" : "80px 0",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .numbers-section {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
          .numbers-section .numbers-divider { border-right: 0 !important; }
        }
      `}</style>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.06) 0%, transparent 65%)",
        }}
      />
      <div className="container-x relative">
        {!compact && (
          <div className="text-center mb-10">
            <div
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "rgba(255,255,255,0.55)",
                marginBottom: 12,
              }}
            >
              Plan10 em Números
            </div>
            <h2
              className="text-white font-extrabold"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)", lineHeight: 1.2 }}
            >
              Resultados que falam por si
            </h2>
          </div>
        )}

        {/* Mobile: 2x2 + last centered. Desktop: 5 columns with separators */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 md:gap-y-0">
          {items.map(({ Icon, label, ...rest }, i) => {
            const isLastOdd = i === items.length - 1 && items.length % 2 === 1;
            return (
              <div
                key={label}
                className={`text-center text-white px-2 md:px-4 ${
                  isLastOdd ? "col-span-2 md:col-span-1" : ""
                } ${i < items.length - 1 ? "md:border-r" : ""}`}
                style={{
                  borderColor: "rgba(255,255,255,0.20)",
                }}
              >
                <Icon
                  size={compact ? 22 : 28}
                  strokeWidth={1.5}
                  className="mx-auto mb-2 md:mb-3 text-white/80"
                />
                <div
                  className="font-extrabold leading-none whitespace-nowrap"
                  style={{
                    fontSize: compact
                      ? "clamp(1.4rem, 2vw, 1.9rem)"
                      : "clamp(1.6rem, 2.5vw, 2.4rem)",
                    fontWeight: 800,
                  }}
                >
                  <CountUp item={{ Icon, label, ...rest } as Item} start={inView} />
                </div>
                <div
                  className="mt-3"
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.70)",
                  }}
                >
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
