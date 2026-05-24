import { Link } from "@tanstack/react-router";
import {
  Building, Car, Heart, Scale, Landmark, Shield, Truck, Leaf, Plane, Globe, TrendingUp, PawPrint,
  ArrowRight,
} from "lucide-react";
import { seguroCategories } from "@/data/seguros";

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>> = {
  Building, Car, Heart, Scale, Landmark, Shield, Truck, Leaf, Plane, Globe, TrendingUp, PawPrint,
};

export function SegurosCategoriesGrid() {
  return (
    <section className="section-y">
      <div className="container-x">
        <div className="text-center mb-10">
          <p className="font-eyebrow text-orange mb-3">NOSSAS SOLUÇÕES</p>
          <h2 className="font-h2">Encontre a proteção certa para você</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {seguroCategories.map((cat) => {
            const Icon = iconMap[cat.icon] ?? Shield;
            return (
              <Link
                key={cat.id}
                to="/seguros"
                search={{ cat: cat.id }}
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
                {/* TOP ROW: icon + eyebrow/title */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: `${cat.hubColor}18`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} color={cat.hubColor} strokeWidth={1.8} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        color: cat.hubColor,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        margin: 0,
                        lineHeight: 1.2,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {cat.eyebrow}
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
                      {cat.title}
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
                  {cat.description}
                </p>

                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: cat.hubColor,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  Ver produtos <ArrowRight size={13} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
