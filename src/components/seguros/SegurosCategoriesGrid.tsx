import { Link } from "@tanstack/react-router";
import {
  Building, Car, Heart, Scale, Landmark, Shield, Truck, Leaf, Plane, Globe, TrendingUp, PawPrint,
} from "lucide-react";
import { seguroCategories } from "@/data/seguros";

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
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
                className="group flex flex-col rounded-2xl bg-white border border-neutral-200 p-6 transition-all duration-200"
                style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.10)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
                }}
              >
                <div
                  className="inline-flex items-center justify-center mb-4 rounded-xl"
                  style={{ width: 52, height: 52, background: `${cat.hubColor}1A` }}
                >
                  <Icon size={26} color={cat.hubColor} />
                </div>
                <p
                  className="text-[0.68rem] font-bold tracking-widest uppercase mb-2"
                  style={{ color: cat.hubColor }}
                >
                  {cat.eyebrow}
                </p>
                <h3 className="font-semibold text-lg text-ink mb-2 leading-snug">{cat.title}</h3>
                <p className="text-sm text-neutral-600 mb-4 leading-relaxed flex-1">
                  {cat.description}
                </p>
                <span
                  className="text-sm font-semibold inline-flex items-center gap-1"
                  style={{ color: cat.hubColor }}
                >
                  Ver produtos →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
