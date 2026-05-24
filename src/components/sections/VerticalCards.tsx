import { Link } from "@tanstack/react-router";
import { ShieldCheck, HeartPulse, Landmark, Banknote, Clock, ArrowRight } from "lucide-react";
import { verticals } from "@/data/verticals";

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>> = {
  seguros: ShieldCheck,
  saude: HeartPulse,
  consorcios: Landmark,
  financas: Banknote,
  servicos: Clock,
};

export function VerticalCards() {
  return (
    <section id="verticais" className="section-y">
      <style>{`
        @media (max-width: 767px) {
          .ecossistema-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
          }
          .ecossistema-grid > :last-child {
            grid-column: span 2;
            max-width: 60%;
            margin: 0 auto;
            width: 100%;
          }
        }
      `}</style>
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="font-eyebrow text-orange mb-3">Nossos braços de atuação</p>
          <h2 className="font-h1">Tudo que você precisa em um só lugar</h2>
        </div>

        <div className="ecossistema-grid mt-10 grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-5">
          {verticals.map((v) => {
            const Icon = iconMap[v.id] ?? ShieldCheck;
            return (
              <Link
                key={v.id}
                to={v.slug}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  padding: "18px 16px 20px",
                  borderRadius: 14,
                  border: "1px solid #E8E8E8",
                  background: "#FFFFFF",
                  boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
                  height: "100%",
                  boxSizing: "border-box",
                  textDecoration: "none",
                  transition: "transform 180ms ease, box-shadow 180ms ease",
                  borderLeft: `3px solid ${v.hubColor}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.10)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 8px rgba(0,0,0,0.05)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: `${v.hubColor}18`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} color={v.hubColor} strokeWidth={1.8} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        color: v.hubColor,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        margin: 0,
                        lineHeight: 1.2,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {v.hubLabel}
                    </p>
                    <h3
                      style={{
                        fontSize: "0.92rem",
                        fontWeight: 700,
                        color: "#1A1A1A",
                        margin: 0,
                        lineHeight: 1.25,
                      }}
                    >
                      {v.name}
                    </h3>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "#666666",
                    lineHeight: 1.55,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {v.chamada}
                </p>

                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: v.hubColor,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  Conhecer <ArrowRight size={13} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
