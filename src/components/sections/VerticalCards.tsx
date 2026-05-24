import { Link } from "@tanstack/react-router";
import { Shield, Heart, Building2, TrendingUp, Clock, ArrowRight, Check } from "lucide-react";
import { verticals } from "@/data/verticals";

const iconMap = { Shield, Heart, Building2, TrendingUp, Clock };

const mobileLabels: Record<string, string> = {
  seguros: "Seguros",
  saude: "Saúde & Odonto",
  consorcios: "Consórcios",
  financas: "Finanças",
  servicos: "Serviços",
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
            max-width: 50%;
            margin: 0 auto;
            width: 100%;
          }
          .ecossistema-card {
            flex-direction: row !important;
            align-items: center !important;
            gap: 12px !important;
            padding: 12px 14px !important;
          }
          .ecossistema-card .ecossistema-icon-wrap {
            width: 40px !important;
            height: 40px !important;
            margin-bottom: 0 !important;
            border-radius: 10px !important;
          }
          .ecossistema-card .ecossistema-mobile-label {
            display: block !important;
            font-weight: 600;
            font-size: 0.95rem;
            color: #1A1A1A;
          }
          .ecossistema-card .ecossistema-desktop-only {
            display: none !important;
          }
        }
        @media (min-width: 768px) {
          .ecossistema-mobile-label { display: none; }
        }
      `}</style>
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="font-eyebrow text-orange mb-3">Nossos braços de atuação</p>
          <h2 className="font-h1">Tudo que você precisa em um só lugar</h2>
        </div>

        <div className="ecossistema-grid mt-10 grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-5">
          {verticals.map((v) => {
            const Icon = iconMap[v.icon as keyof typeof iconMap];
            return (
              <Link
                key={v.id}
                to={v.slug}
                className="ecossistema-card group relative flex flex-col rounded-2xl p-5 border border-neutral-200 hover:-translate-y-1 transition-all overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, #FFFFFF 0%, #F8F8F8 100%)",
                  borderLeft: `3px solid ${v.hubColor}`,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="ecossistema-desktop-only absolute top-0 left-0 right-0 h-1 group-hover:w-full group-hover:h-full group-hover:opacity-5 transition-all duration-300"
                  style={{ backgroundColor: v.hubColor }}
                />
                <div
                  className="ecossistema-icon-wrap relative flex h-12 w-12 items-center justify-center rounded-xl mb-4"
                  style={{ backgroundColor: `${v.hubColor}1A`, color: v.hubColor }}
                >
                  {Icon && <Icon size={24} />}
                </div>
                <span className="ecossistema-mobile-label">{mobileLabels[v.id] ?? v.name}</span>
                <h3 className="ecossistema-desktop-only relative font-h3 mb-2">{v.name}</h3>
                <p className="ecossistema-desktop-only relative text-sm text-neutral-700 mb-3">{v.chamada}</p>
                <ul
                  className="ecossistema-desktop-only relative space-y-1.5 text-sm text-neutral-700 mb-4 max-h-0 opacity-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100 transition-all duration-300 ease-out"
                >
                  {v.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check size={14} className="mt-1 flex-shrink-0" style={{ color: v.hubColor }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <span className="ecossistema-desktop-only relative mt-auto inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: v.hubColor }}>
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
