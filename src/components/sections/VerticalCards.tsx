import { Link } from "@tanstack/react-router";
import { Shield, Heart, Building2, TrendingUp, Clock, ArrowRight, Check } from "lucide-react";
import { verticals } from "@/data/verticals";

const iconMap = { Shield, Heart, Building2, TrendingUp, Clock };

export function VerticalCards() {
  return (
    <section id="verticais" className="section-y">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="font-eyebrow text-orange mb-3">Ecossistema</p>
          <h2 className="font-h1">Ecossistema Plan10</h2>
        </div>

        <div className="mt-10 grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-5">
          {verticals.map((v) => {
            const Icon = iconMap[v.icon as keyof typeof iconMap];
            return (
              <Link
                key={v.id}
                to={v.slug}
                className="group relative flex flex-col rounded-2xl bg-white p-5 border border-neutral-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 group-hover:w-full group-hover:h-full group-hover:opacity-5 transition-all duration-300"
                  style={{ backgroundColor: v.hubColor }}
                />
                <div
                  className="relative flex h-12 w-12 items-center justify-center rounded-xl mb-4"
                  style={{ backgroundColor: `${v.hubColor}1A`, color: v.hubColor }}
                >
                  {Icon && <Icon size={24} />}
                </div>
                <h3 className="relative font-h3 mb-2">{v.name}</h3>
                <p className="relative text-sm text-neutral-700 mb-3">{v.chamada}</p>
                <ul
                  className="relative space-y-1.5 text-sm text-neutral-700 mb-4 max-h-0 opacity-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100 transition-all duration-300 ease-out"
                >
                  {v.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check size={14} className="mt-1 flex-shrink-0" style={{ color: v.hubColor }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <span className="relative mt-auto inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: v.hubColor }}>
                  Conhecer <ArrowRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
