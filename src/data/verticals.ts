export type VerticalId = "seguros" | "saude" | "consorcios" | "financas" | "servicos";

export interface VerticalConfig {
  id: VerticalId;
  name: string;
  hubLabel: string;
  slug: string;
  hubColor: string;
  chamada: string;
  icon: string;
  features: string[];
}

export const verticals: VerticalConfig[] = [
  {
    id: "seguros",
    name: "Seguros",
    hubLabel: "SEGUROS",
    slug: "/seguros",
    hubColor: "#3D8BF2",
    chamada: "Proteção patrimonial completa: auto, vida, residencial, viagem, empresarial.",
    icon: "Shield",
    features: ["Auto, vida e residencial", "Viagem e empresarial", "Comparação entre seguradoras"],
  },
  {
    id: "saude",
    name: "Saúde & Odonto",
    hubLabel: "SAÚDE & ODONTO",
    slug: "/saude",
    hubColor: "#24BF5B",
    chamada: "Assistência médica e odontológica para indivíduos, famílias e empresas.",
    icon: "Heart",
    features: ["Planos individuais e familiares", "PME e grandes empresas", "Odontológico incluso"],
  },
  {
    id: "consorcios",
    name: "Consórcio",
    hubLabel: "CONSÓRCIOS",
    slug: "/consorcios",
    hubColor: "#9857F2",
    chamada: "Aquisição planejada sem juros: imóveis, veículos, serviços, viagens.",
    icon: "Building2",
    features: ["Sem juros", "Imóveis, veículos e serviços", "Use seu FGTS"],
  },
  {
    id: "financas",
    name: "Finanças",
    hubLabel: "FINANÇAS",
    slug: "/financas",
    hubColor: "#C5D0D9",
    chamada: "Crédito, investimentos e previdência para curto, médio e longo prazo.",
    icon: "TrendingUp",
    features: ["Crédito pessoal e consignado", "Portabilidade", "Consultoria gratuita"],
  },
  {
    id: "servicos",
    name: "Serviços",
    hubLabel: "SERVIÇOS",
    slug: "/servicos-24h",
    hubColor: "#27DEF2",
    chamada: "Casa, veículos e pet — assistência prática para o dia a dia.",
    icon: "Clock",
    features: ["Guincho, chaveiro, elétrica", "Atendimento 24/7", "+2.000 atendimentos realizados"],
  },
];

export const getVertical = (id: VerticalId) => verticals.find((v) => v.id === id)!;
