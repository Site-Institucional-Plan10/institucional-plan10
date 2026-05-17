import type { VerticalId } from "./verticals";

export interface BlogArticle {
  slug: string;
  title: string;
  summary: string;
  body: string;
  hub: VerticalId;
  date: string;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

const raw: Omit<BlogArticle, "slug">[] = [
  {
    title: "Como escolher o seguro auto ideal em 2026",
    summary: "Cobertura, franquia e perfil: o que considerar antes de contratar.",
    body: "Escolher o seguro auto certo passa por entender perfil de uso, cobertura desejada e franquia. Nossa consultoria compara apólices de múltiplas seguradoras para encontrar o melhor custo-benefício para o seu caso.",
    hub: "seguros",
    date: "11 de maio de 2026",
  },
  {
    title: "Seguro residencial: o que está coberto de verdade",
    summary: "Entenda coberturas básicas e adicionais antes de fechar contrato.",
    body: "O seguro residencial vai muito além de incêndio. Veja coberturas para danos elétricos, roubo, responsabilidade civil e assistências 24h que costumam passar despercebidas.",
    hub: "seguros",
    date: "04 de maio de 2026",
  },
  {
    title: "Plano de saúde individual ou familiar: qual escolher",
    summary: "Comparativo de coberturas, carências e custo entre as duas modalidades.",
    body: "Planos individuais e familiares têm regras distintas de reajuste e cobertura. Entenda os trade-offs para escolher o modelo mais adequado ao seu momento de vida.",
    hub: "saude",
    date: "28 de abril de 2026",
  },
  {
    title: "Plano odontológico vale a pena para PMEs?",
    summary: "Benefício de baixo custo que melhora retenção e bem-estar.",
    body: "Para pequenas e médias empresas, o plano odontológico é um benefício corporativo de alto impacto e baixo custo. Veja como estruturar a contratação.",
    hub: "saude",
    date: "20 de abril de 2026",
  },
  {
    title: "Consórcio de imóveis: estratégia para 2026",
    summary: "Como usar o consórcio para conquistar o imóvel sem juros.",
    body: "O consórcio é uma alternativa ao financiamento tradicional, sem juros e com possibilidade de lance. Saiba como planejar a entrada e utilizar o FGTS.",
    hub: "consorcios",
    date: "15 de abril de 2026",
  },
  {
    title: "Consórcio de veículos: vantagens e cuidados",
    summary: "Quando o consórcio é melhor do que o financiamento.",
    body: "Avaliamos prazos, taxas administrativas e estratégias de lance para que o consórcio de veículos faça sentido no seu orçamento.",
    hub: "consorcios",
    date: "08 de abril de 2026",
  },
  {
    title: "Planejamento financeiro pessoal: por onde começar",
    summary: "Reserva de emergência, metas e diversificação de investimentos.",
    body: "Um bom planejamento financeiro começa pelo diagnóstico do orçamento, definição de metas e construção de uma reserva de emergência sólida antes de investir.",
    hub: "financas",
    date: "01 de abril de 2026",
  },
  {
    title: "Previdência privada: PGBL ou VGBL?",
    summary: "Entenda a diferença tributária e qual escolher.",
    body: "PGBL e VGBL têm tratamentos tributários distintos. A escolha depende do modelo de declaração de IR e do horizonte de investimento.",
    hub: "financas",
    date: "25 de março de 2026",
  },
  {
    title: "Assistência 24h: o que esperar do serviço",
    summary: "Atendimento emergencial em saúde, lar e veículo.",
    body: "Nossos serviços 24h cobrem emergências domésticas, automotivas e de saúde, com acionamento simples via WhatsApp ou central telefônica.",
    hub: "servicos",
    date: "18 de março de 2026",
  },
];

export const blogArticles: BlogArticle[] = raw.map((a) => ({
  ...a,
  slug: slugify(a.title),
}));
