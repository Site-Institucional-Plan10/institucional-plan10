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
  pickLiberada("saude"),
  pickLiberada("protecao"),
  pickLiberada("financeiras"),
  pickLiberada("crescimento"),
  pickLiberada("assistencia"),
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
