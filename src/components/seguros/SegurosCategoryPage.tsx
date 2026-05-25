import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import {
  ChevronRight,
  MessageCircle,
  ArrowLeft,
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
  User,
  Building2,
  Search,
  Users,
  Zap,
  BarChart2,
  ShieldCheck,
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

const differentials = [
  { Icon: Search, title: "Análise independente", desc: "Comparamos todas as opções disponíveis no mercado sem vínculo exclusivo com nenhuma seguradora." },
  { Icon: Users, title: "Consultoria personalizada", desc: "Cada cliente recebe uma análise de perfil gratuita e uma proposta sob medida para sua realidade." },
  { Icon: Zap, title: "Agilidade na contratação", desc: "Processo simplificado, documentação orientada e contratação em até 24h para a maioria dos produtos." },
  { Icon: BarChart2, title: "Relatórios e transparência", desc: "Relatório mensal de performance e reunião de estratégia para clientes com apólices ativas." },
  { Icon: ShieldCheck, title: "Suporte em sinistros", desc: "Nossa equipe acompanha o processo do início ao fim para que você não fique sozinho no momento crítico." },
];

const processSteps = [
  { n: "01", title: "Diagnóstico gratuito", desc: "Você nos conta seu objetivo, perfil e necessidade. Analisamos sua situação atual sem compromisso." },
  { n: "02", title: "Comparação de mercado", desc: "Cotamos com todas as principais seguradoras disponíveis para o produto escolhido." },
  { n: "03", title: "Recomendação personalizada", desc: "Apresentamos as melhores opções com prós, contras e análise de custo-benefício clara." },
  { n: "04", title: "Contratação e suporte contínuo", desc: "Acompanhamos toda a documentação, ativação e ficamos ao seu lado em renovações e sinistros." },
];

export function SegurosCategoryPage({ categoryId }: Props) {
  const [toggle, setToggle] = useState<"pf" | "pj">("pf");
  const differentialsRef = useRef<HTMLDivElement>(null);
  const scrollDiffLeft = () => differentialsRef.current?.scrollBy({ left: -232, behavior: "smooth" });
  const scrollDiffRight = () => differentialsRef.current?.scrollBy({ left: 232, behavior: "smooth" });
  const cat = seguroCategories.find((c) => c.id === categoryId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setToggle("pf");
  }, [categoryId]);

  if (!cat) {
    return (
      <div className="pt-32 pb-20 container-x text-center">
        <h1 className="font-h2 mb-3">Categoria não encontrada.</h1>
        <Link to="/seguros" className="text-orange font-semibold inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Voltar para Seguros
        </Link>
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

      {/* Hero */}
      <section
        className="py-16 md:py-20"
        style={{ background: `linear-gradient(135deg, ${cat.hubColor}10 0%, ${cat.hubColor}22 100%)` }}
      >
        <div className="container-x text-center max-w-3xl mx-auto">
          <div
            className="inline-flex items-center justify-center mb-6 rounded-2xl"
            style={{ width: 72, height: 72, background: `${cat.hubColor}20` }}
          >
            <Icon size={36} color={cat.hubColor} />
          </div>
          <p className="font-eyebrow mb-3" style={{ color: cat.hubColor }}>{cat.eyebrow}</p>
          <h1 className="font-h1 mb-4">{cat.title}</h1>
          <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed">{cat.description}</p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-semibold text-white"
            style={{ background: "#FF6B00" }}
          >
            <MessageCircle size={18} />
            Falar com nosso consultor
          </a>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="section-y bg-neutral-50">
        <style>{`[data-differentials-carousel]::-webkit-scrollbar { display: none; }`}</style>
        <div className="container-x max-w-6xl mx-auto">
          <p className="font-eyebrow text-orange mb-3 text-center">NOSSOS DIFERENCIAIS</p>
          <h2 className="font-h2 text-center mb-10">Por que contratar com a Plan10</h2>
          <div style={{ position: "relative" }}>
            <button
              onClick={scrollDiffLeft}
              aria-label="Anterior"
              className="hidden md:flex"
              style={{
                position: "absolute", left: -20, top: "50%",
                transform: "translateY(-50%)", zIndex: 10,
                width: 36, height: 36, borderRadius: "50%",
                background: "#FFFFFF", border: "1.5px solid #E0E0E0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}
            >
              <ChevronLeft size={18} color="#444" strokeWidth={2} />
            </button>

            <div
              ref={differentialsRef}
              data-differentials-carousel
              style={{
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                display: "flex",
                gap: 12,
                paddingBottom: 12,
                paddingLeft: 4,
                paddingRight: 4,
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                alignItems: "stretch",
              }}
            >
              {differentials.map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  style={{
                    minWidth: 200,
                    maxWidth: 220,
                    scrollSnapAlign: "start",
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    padding: "18px 16px",
                    background: "#FFFFFF",
                    borderRadius: 14,
                    border: "1px solid #E8E8E8",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: `${cat.hubColor}18`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} color={cat.hubColor} strokeWidth={1.8} />
                  </div>
                  <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "#1A1A1A", margin: 0, lineHeight: 1.3 }}>{title}</p>
                  <p style={{ fontSize: "0.78rem", color: "#666", lineHeight: 1.55, margin: 0, flex: 1 }}>{desc}</p>
                </div>
              ))}
            </div>

            <button
              onClick={scrollDiffRight}
              aria-label="Próximo"
              className="hidden md:flex"
              style={{
                position: "absolute", right: -20, top: "50%",
                transform: "translateY(-50%)", zIndex: 10,
                width: 36, height: 36, borderRadius: "50%",
                background: "#FFFFFF", border: "1.5px solid #E0E0E0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}
            >
              <ChevronRight size={18} color="#444" strokeWidth={2} />
            </button>
          </div>
        </div>
      </section>

      {/* PF/PJ Toggle */}
      <section className="pt-12 pb-4">
        <div className="container-x text-center mb-6">
          <p className="font-eyebrow text-orange mb-3">CATÁLOGO COMPLETO</p>
          <h2 className="font-h2">Encontre o produto certo para você</h2>
        </div>
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
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {tab === "pf" ? (
                  <>
                    <User size={15} strokeWidth={2} style={{ flexShrink: 0 }} /> Para Você
                  </>
                ) : (
                  <>
                    <Building2 size={15} strokeWidth={2} style={{ flexShrink: 0 }} /> Para Empresas
                  </>
                )}
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
                <span className="block rounded-full" style={{ width: 6, height: 28, background: cat.hubColor }} />
                <h3 className="font-h3 text-ink">{group.groupTitle}</h3>
              </div>
              <div
                className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4"
                style={{ scrollPaddingLeft: 16, WebkitOverflowScrolling: "touch" }}
              >
                {group.products.map((product) => (
                  <div key={product.id} className="snap-start shrink-0 w-[85%] sm:w-[360px]">
                    <ProductCard
                      name={product.name}
                      description={product.description}
                      category="seguros"
                      hubColor={cat.hubColor}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section className="section-y bg-neutral-50">
        <div className="container-x max-w-5xl mx-auto">
          <p className="font-eyebrow text-orange mb-3 text-center">O PROCESSO</p>
          <h2 className="font-h2 text-center mb-10">Da consulta à contratação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {processSteps.map((step) => (
              <div key={step.n} className="flex gap-4 rounded-2xl bg-white border border-neutral-200 p-6">
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full text-white font-bold"
                  style={{ width: 44, height: 44, background: cat.hubColor }}
                >
                  {step.n}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-ink mb-1">{step.title}</h3>
                  <p className="text-sm text-neutral-700 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-y" style={{ background: `linear-gradient(135deg, ${cat.hubColor}15 0%, ${cat.hubColor}28 100%)` }}>
        <div className="container-x text-center max-w-2xl mx-auto">
          <h2 className="font-h2 mb-3">Pronto para dar o próximo passo?</h2>
          <p className="text-neutral-700 mb-8">
            Um consultor Plan10 analisa seu perfil gratuitamente e apresenta a melhor opção disponível no mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-semibold text-white"
              style={{ background: "#FF6B00" }}
            >
              <MessageCircle size={18} />
              Solicitar consultoria gratuita
            </a>
            <Link
              to="/seguros"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-semibold border border-neutral-300 bg-white text-ink hover:bg-neutral-50"
            >
              <ArrowLeft size={18} />
              Ver todas as categorias de seguros
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
