import { solucoesLiberadas } from "./solucoes-liberadas";

export interface Product {
  id: string;
  nome: string;
  perfil: "PF" | "PJ";
  descricao: string;
  caracteristicas: string[];
  itensInclusos: string[];
  aQuemSeDestina: string;
  beneficios: string;
  fechamento: string;
  ctaPrimario: string;
  ctaSecundario: string;
  linkPorto: string;
  faq: { q: string; a: string }[];
  crossSelling: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Nucleo {
  slug: string;
  nome: string;
  hero: string;
  aberturaConsultiva: string;
  blocoValor: string[];
  porque: string;
  fechamento: string;
  products: Product[];
}

export interface Categoria {
  slug: string;
  nome: string;
  hero: string;
  nucleos: Nucleo[];
}

export interface SolucaoCor {
  bg: string;
  primary: string;
  accent: string;
  soft: string;
}

export interface Solucao {
  slug: string;
  nome: string;
  cor: SolucaoCor;
  hero: string;
  subHero: string;
  aberturaConsultiva: string;
  categorias: Categoria[];
}

const pickLiberada = (slug: string): Solucao => {
  const found = (solucoesLiberadas as unknown as Solucao[]).find((s) => s.slug === slug);
  if (!found) throw new Error(`Solução liberada não encontrada: ${slug}`);
  return found;
};

export const solutions: Solucao[] = [
  {
    slug: "saude",
    nome: "Saúde e vida saudável",
    cor: { bg: "#0E3D2C", primary: "#2EA86E", accent: "#6BCCA0", soft: "#EDF8F2" },
    hero: "Saúde, bem-estar e qualidade de vida com orientação clara desde a escolha",
    subHero:
      "Cuidado, prevenção e acesso à saúde organizados para pessoas, famílias e empresas.",
    aberturaConsultiva:
      "Cuidar da saúde abrange acesso, perfil familiar, contexto empresarial e expectativas de cuidado.",
    categorias: [
      {
        slug: "saude-e-acesso-medico",
        nome: "Saúde e acesso médico",
        hero: "Acesso médico organizado por perfil, uso e momento.",
        nucleos: [
          {
            slug: "saude-familiar-premium",
            nome: "Saúde familiar premium",
            hero: "Cuidado da família com acesso, rede e continuidade.",
            aberturaConsultiva:
              "Antes de escolher, entenda o que o seu momento pede: rede, reembolso, livre escolha ou cobertura internacional.",
            blocoValor: [
              "Cuidado orientado",
              "Acesso organizado",
              "Continuidade no cuidado",
            ],
            porque:
              "Reúne as opções de saúde familiar de padrão premium em um só caminho, para escolher com critério.",
            fechamento:
              "O plano certo acompanha seu momento, com acesso, orientação e permanência ao longo do tempo.",
            products: [
              {
                id: "saude-fam-internacional",
                nome: "Plano de saúde familiar com cobertura internacional",
                perfil: "PF",
                descricao:
                  "Acesso médico no Brasil e no exterior, para quem vive ou viaja com frequência.",
                caracteristicas: [
                  "Cobertura internacional",
                  "Rede qualificada",
                  "Suporte em viagens ou residência no exterior",
                ],
                itensInclusos: [
                  "Consultas, exames e internações",
                  "Urgência no exterior",
                  "Reembolso internacional conforme plano",
                ],
                aQuemSeDestina:
                  "Para quem precisa de uma solução de saúde alinhada ao perfil e ao momento da família.",
                beneficios:
                  "Mais segurança para organizar a saúde da família, com rede, acesso e permanência.",
                fechamento:
                  "O plano certo acompanha seu momento, com acesso e orientação.",
                ctaPrimario: "Comparar opções de saúde",
                ctaSecundario: "Falar com um consultor",
                linkPorto: "Não se aplica",
                faq: [
                  {
                    q: "Para quem esse plano é indicado?",
                    a: "Para perfis que precisam organizar acesso, cobertura e continuidade da família, no Brasil e no exterior.",
                  },
                ],
                crossSelling: [
                  "Seguro viagem (Proteção)",
                  "Assistência em viagem (Assistência)",
                ],
              },
              {
                id: "saude-fam-livre-escolha",
                nome: "Plano de saúde familiar com livre escolha",
                perfil: "PF",
                descricao:
                  "Livre escolha médica com acesso a profissionais e hospitais, com reembolso conforme o plano.",
                caracteristicas: [
                  "Livre escolha médica",
                  "Reembolso conforme plano",
                  "Acesso a profissionais de referência",
                ],
                itensInclusos: [
                  "Consultas e exames com reembolso",
                  "Profissionais de confiança",
                  "Regras conforme plano",
                ],
                aQuemSeDestina:
                  "Para quem valoriza autonomia na escolha do médico e do hospital.",
                beneficios:
                  "Mais autonomia para escolher profissionais e manter o cuidado com quem você confia.",
                fechamento:
                  "O plano certo acompanha seu momento, com acesso e orientação.",
                ctaPrimario: "Comparar opções de saúde",
                ctaSecundario: "Falar com um consultor",
                linkPorto: "Não se aplica",
                faq: [
                  {
                    q: "Como funciona a livre escolha?",
                    a: "Você escolhe o profissional ou hospital e usa reembolso conforme as regras do plano.",
                  },
                ],
                crossSelling: [
                  "Proteção de vida e renda (Proteção)",
                  "Assistência familiar (Assistência)",
                ],
              },
            ],
          },
        ],
      },
      { slug: "odontologia", nome: "Odontologia", hero: "", nucleos: [] },
      { slug: "saude-animal", nome: "Saúde animal", hero: "", nucleos: [] },
      {
        slug: "bem-estar-e-qualidade-de-vida",
        nome: "Bem-estar e qualidade de vida",
        hero: "",
        nucleos: [],
      },
      { slug: "saude-corporativa", nome: "Saúde corporativa", hero: "", nucleos: [] },
    ],
  },
  {
    slug: "protecao",
    nome: "Proteção",
    cor: { bg: "#1C4E80", primary: "#2B6CB0", accent: "#5BA3D9", soft: "#F0F6FC" },
    hero: "Proteção patrimonial e pessoal com escolha consciente",
    subHero: "Seguros e coberturas para o que importa.",
    aberturaConsultiva:
      "Proteger é organizar riscos com critério, sem excesso nem lacuna.",
    categorias: [],
  },
  {
    slug: "financeiras",
    nome: "Soluções financeiras",
    cor: { bg: "#10141A", primary: "#5A6B7B", accent: "#C9A83C", soft: "#F1EFE9" },
    hero: "Planejamento financeiro com serenidade e precisão",
    subHero: "Consórcio, investimentos e planejamento sob medida.",
    aberturaConsultiva:
      "Decisões financeiras premium exigem tempo, contexto e método.",
    categorias: [],
  },
  {
    slug: "crescimento",
    nome: "Crescimento",
    cor: { bg: "#3D2870", primary: "#7B5BB5", accent: "#9B7ED4", soft: "#F2EEF9" },
    hero: "Educação, carreira e desenvolvimento contínuo",
    subHero: "Caminhos para evoluir em cada estágio da vida.",
    aberturaConsultiva: "Crescer requer suporte, direção e ambiente.",
    categorias: [],
  },
  {
    slug: "assistencia",
    nome: "Assistência",
    cor: { bg: "#3D1A00", primary: "#C45C2E", accent: "#E07840", soft: "#FAF0EA" },
    hero: "Suporte prático para o dia a dia",
    subHero: "Assistências que resolvem quando você precisa.",
    aberturaConsultiva: "Assistência é sobre estar por perto na hora certa.",
    categorias: [],
  },
];

export function findSolucao(slug: string): Solucao | undefined {
  return solutions.find((s) => s.slug === slug);
}

export function findCategoria(solSlug: string, catSlug: string) {
  const s = findSolucao(solSlug);
  const c = s?.categorias.find((c) => c.slug === catSlug);
  return c && s ? { solucao: s, categoria: c } : undefined;
}

export function findNucleo(solSlug: string, catSlug: string, nucSlug: string) {
  const found = findCategoria(solSlug, catSlug);
  const n = found?.categoria.nucleos.find((n) => n.slug === nucSlug);
  return found && n
    ? { solucao: found.solucao, categoria: found.categoria, nucleo: n }
    : undefined;
}
