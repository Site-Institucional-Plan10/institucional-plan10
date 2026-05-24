import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  MessageCircle,
  Building,
  Car,
  Heart,
  Scale,
  Landmark,
  Shield,
  Truck,
  Leaf,
  Plane,
  Globe,
  TrendingUp,
  PawPrint,
} from "lucide-react";
import { seguroCategories } from "@/data/seguros";
import { ProductCard } from "@/components/vertical/ProductCard";
import { getWhatsAppUrl } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Building, Car, Heart, Scale, Landmark, Shield, Truck, Leaf, Plane, Globe, TrendingUp, PawPrint,
};

interface Props {
  categoryId: string;
}

export function SegurosCategoryPage({ categoryId }: Props) {
  const [toggle, setToggle] = useState<"pf" | "pj">("pf");
  const cat = seguroCategories.find((c) => c.id === categoryId);
  if (!cat) {
    return (
      <div className="pt-32 pb-20 container-x text-center">
        <h1 className="font-h2 mb-3">Categoria não encontrada.</h1>
      </div>
    );
  }

  const Icon = iconMap[cat.icon] ?? Shield;
  const activeGroups = toggle === "pf" ? cat.pf : cat.pj;
  const waMessage = `Olá! Tenho interesse em ${cat.title}. Gostaria de uma proposta personalizada.`;
  const waHref = `${getWhatsAppUrl("seguros").split("?")[0]}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="container-x pt-6 pb-2">
        <nav className="flex items-center gap-2 text-sm text-neutral-600">
          <Link to="/" className="hover:text-orange">Início</Link>
          <ChevronRight size={14} />
          <Link to="/seguros" className="hover:text-orange">Seguros</Link>
          <ChevronRight size={14} />
          <span className="text-ink font-medium">{cat.title}</span>
        </nav>
      </div>

      {/* Hero da categoria */}
      <section
        className="py-16 md:py-20"
        style={{
          background: `linear-gradient(135deg, ${cat.hubColor}10 0%, ${cat.hubColor}22 100%)`,
        }}
      >
        <div className="container-x text-center max-w-3xl mx-auto">
          <div
            className="inline-flex items-center justify-center mb-6 rounded-2xl"
            style={{
              width: 72, height: 72,
              background: `${cat.hubColor}20`,
            }}
          >
            <Icon size={36} color={cat.hubColor} />
          </div>
          <p className="font-eyebrow mb-3" style={{ color: cat.hubColor }}>
            {cat.eyebrow}
          </p>
          <h1 className="font-h1 mb-4">{cat.title}</h1>
          <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed">
            {cat.description}
          </p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-semibold text-white transition-colors"
            style={{ background: "#FF6B00" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#E05A00")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#FF6B00")}
          >
            <MessageCircle size={18} />
            Falar com nosso consultor
          </a>
        </div>
      </section>

      {/* PF/PJ Toggle */}
      <section className="pt-12 pb-4">
        <div className="container-x flex justify-center">
          <div className="inline-flex gap-2 p-1.5 rounded-full bg-neutral-100">
            {(["pf", "pj"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setToggle(tab)}
                style={{
                  padding: "10px 28px",
                  borderRadius: 999,
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  background: toggle === tab ? "#FF6B00" : "transparent",
                  color: toggle === tab ? "#FFFFFF" : "#444444",
                  boxShadow: toggle === tab ? "0 4px 14px rgba(255,107,0,0.35)" : "none",
                }}
              >
                {tab === "pf" ? "👤 Para Você" : "🏢 Para Empresas"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Groups */}
      <section className="section-y">
        <div className="container-x flex flex-col gap-12">
          {activeGroups.map((group) => (
            <div key={group.groupTitle}>
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="block rounded-full"
                  style={{ width: 6, height: 28, background: cat.hubColor }}
                />
                <h2 className="font-h3 text-ink">{group.groupTitle}</h2>
              </div>

              <div
                className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4"
                style={{ scrollPaddingLeft: 16, WebkitOverflowScrolling: "touch" }}
              >
                {group.products.map((product) => (
                  <div
                    key={product.id}
                    className="snap-start shrink-0 w-[85%] sm:w-[360px]"
                  >
                    <ProductCard
                      name={product.name}
                      description={product.description}
                      category={`seguros - ${cat.title}`}
                      hubColor={cat.hubColor}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-y bg-neutral-100">
        <div className="container-x text-center max-w-2xl mx-auto">
          <h2 className="font-h2 mb-3">Solicite uma proposta personalizada</h2>
          <p className="text-neutral-700 mb-8">
            Respondemos em até 2 horas úteis com uma análise feita especialmente para o seu perfil.
          </p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-semibold text-white transition-colors"
            style={{ background: "#FF6B00" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#E05A00")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#FF6B00")}
          >
            <MessageCircle size={18} />
            Falar no WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
