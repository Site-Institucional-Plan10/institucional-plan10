import { HeroCarousel, type HeroSlide } from "./HeroCarousel";

const verticalGradients = {
  seguros: "linear-gradient(135deg, #05101E 0%, #0A1F3D 100%)",
  saude: "linear-gradient(135deg, #03140A 0%, #071F0F 100%)",
  consorcios: "linear-gradient(135deg, #0E051E 0%, #1A0B32 100%)",
  financas: "linear-gradient(135deg, #040D20 0%, #081A35 100%)",
  servicos: "linear-gradient(135deg, #031018 0%, #062030 100%)",
};

const homeSlides: HeroSlide[] = [
  {
    id: "home-brand",
    layout: "centered",
    backgroundImage: "/assets/banners/hero-home-1.png",
    backgroundPosition: "center 35%",
    overlayLayer1: "rgba(5, 8, 35, 0.88)",
    overlayLayer2: "radial-gradient(ellipse at center, rgba(26,79,160,0.25) 0%, transparent 70%)",
    eyebrow: "PLAN10 CORRETORA · CREDENCIADA SUSEP",
    headlineLines: ["Seu futuro", "muito mais tranquilo."],
    headlineAccent: "muito mais tranquilo.",
    subheadline: "Mais de 40 soluções de proteção, saúde e planejamento em um só lugar.",
    pills: [
      { icon: "ShieldCheck", label: "SEGUROS", color: "#3D8BF2", route: "/seguros" },
      { icon: "HeartPulse", label: "SAÚDE", color: "#24BF5B", route: "/saude" },
      { icon: "Landmark", label: "CONSÓRCIO", color: "#9857F2", route: "/consorcios" },
      { icon: "Banknote", label: "FINANÇAS", color: "#C5D0D9", route: "/financas" },
    ],
    ctaSecondaryLabel: "Conheça Nossas Soluções",
    ctaSecondaryHref: "#verticais",
  },
  {
    id: "home-seguros",
    layout: "split",
    background: verticalGradients.seguros,
    hubColor: "#3D8BF2",
    circleImage: "/assets/banners/hero-seguros-1.png",
    eyebrow: "SEGUROS GERAIS · PLAN10",
    headline: "Proteção patrimonial completa para o que mais importa.",
    subheadline: "Auto, residencial, vida e empresarial. Compare entre seguradoras e contrate com suporte total.",
    microcopy: ["Mais de 30 tipos de seguro", "Comparação gratuita", "Suporte em sinistros"],
    ctaSecondaryLabel: "Ver Seguros",
    ctaSecondaryHref: "/seguros",
  },
  {
    id: "home-saude",
    layout: "split",
    background: verticalGradients.saude,
    hubColor: "#24BF5B",
    circleImage: "/assets/banners/hero-saude-1.png",
    eyebrow: "SAÚDE & ODONTO · PLAN10",
    headline: "Proteção para você, sua família ou empresa.",
    subheadline: "Planos individuais, familiares e empresariais com consultoria gratuita e comparação entre operadoras.",
    microcopy: ["Análise gratuita", "Migração sem perda de cobertura", "PME e grandes empresas"],
    ctaSecondaryLabel: "Ver Saúde",
    ctaSecondaryHref: "/saude",
  },
  {
    id: "home-consorcios",
    layout: "split",
    background: verticalGradients.consorcios,
    hubColor: "#9857F2",
    circleImage: "/assets/banners/hero-consorcios-1.png",
    eyebrow: "CONSÓRCIO · PLAN10",
    headline: "Realize o sonho do imóvel próprio sem pagar juros.",
    subheadline: "Imóveis, veículos e serviços. Consultoria especializada na escolha do grupo e estratégia de lance.",
    microcopy: ["Zero juros", "Use seu FGTS", "Acompanhamento até a contemplação"],
    ctaSecondaryLabel: "Ver Consórcios",
    ctaSecondaryHref: "/consorcios",
  },
  {
    id: "home-financas",
    layout: "split",
    background: verticalGradients.financas,
    hubColor: "#1A4FA0",
    circleImage: "/assets/banners/hero-financas-1.png",
    eyebrow: "PRODUTOS FINANCEIROS · PLAN10",
    headline: "Crédito e soluções financeiras com análise consultiva.",
    subheadline: "Comparamos as melhores condições do mercado para você tomar a decisão certa.",
    microcopy: ["Análise do perfil gratuita", "Redução de juros", "Pessoa física e jurídica"],
    ctaSecondaryLabel: "Ver Finanças",
    ctaSecondaryHref: "/financas",
  },
  {
    id: "home-servicos",
    layout: "split",
    background: verticalGradients.servicos,
    hubColor: "#27DEF2",
    circleImage: "/assets/banners/hero-servicos-1.png",
    eyebrow: "SERVIÇOS 24H · PLAN10",
    headline: "Assistência rápida quando você mais precisa.",
    subheadline: "Guincho, chaveiro, troca de pneu e muito mais. Profissionais qualificados 24 horas por dia.",
    microcopy: ["Atendimento 24/7", "Chegamos em até 50 min", "+2.000 atendimentos"],
    ctaSecondaryLabel: "Ver Serviços 24h",
    ctaSecondaryHref: "/servicos-24h",
  },
];

export function HeroBanner() {
  return (
    <section className="pt-20">
      <HeroCarousel slides={homeSlides} intervalMs={7000} />
    </section>
  );
}
