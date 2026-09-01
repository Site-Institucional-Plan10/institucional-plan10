/**
 * Imagens do hub de finanças, escolhidas para COMUNICAR o tema de cada página
 * (não é o pool rotativo genérico do imagery.ts). Cada categoria tem hero e
 * contexto próprios, e a página de produto (núcleo) usa fotos diferentes das da
 * página de modalidade, então as quatro imagens de um caminho nunca se repetem.
 * Fotos do Pexels (uso comercial livre); regra da marca: sem rosto reconhecível
 * junto a dinheiro, então preferimos objetos, mãos e cenas.
 */
import type { CuratedImage } from "@/lib/imagery";

const C = "/assets/curated/";
const IMG = {
  calc:      { src: C + "cand-credito-calc.jpg",     alt: "Documentos com caneta e óculos sobre a mesa de trabalho" },
  keys:      { src: C + "cand-financ-casanova.jpg",  alt: "Mão segurando as chaves de um imóvel novo" },
  apt:       { src: C + "cand-aluguel-apt.jpg",       alt: "Mão com as chaves na porta de um apartamento moderno" },
  jar:       { src: C + "cand-capit-jarra.jpg",       alt: "Pote de vidro com moedas e uma pequena planta" },
  sign:      { src: C + "cand-garant-assina.jpg",     alt: "Mão assinando um contrato com caneta" },
  policy:    { src: C + "cand-garant-seguro.jpg",     alt: "Assinatura de uma apólice sobre a mesa" },
  report:    { src: C + "cand-invest-relatorio.jpg",  alt: "Relatório com gráficos de desempenho financeiro" },
  chart:     { src: C + "cand-invest-grafico.jpg",    alt: "Gráfico de mercado em tendência de alta" },
  card:      { src: C + "cand-servic-cartao.jpg",     alt: "Smartphone e cartão de crédito para pagamento digital" },
  mobile:    { src: C + "cand-conta-mobile.jpg",      alt: "Celular e cartão sobre a mesa, conta digital" },
  docs:      { src: C + "cand-hub-docs.jpg",          alt: "Relatório de estratégia e laptop vistos de cima" },
  hourglass: { src: C + "cand-previd-tempo.jpg",      alt: "Ampulheta ao lado de moedas empilhadas" },
  toll:      { src: C + "cand-tags-pedagio.jpg",      alt: "Praça de pedágio com várias faixas, vista aérea" },
  cardsGold: { src: C + "cand-cartoes-gold.jpg",      alt: "Cartões de crédito premium em destaque" },
  // Abstratas premium já existentes
  glass:     { src: C + "fin-vidro.jpg",              alt: "Fachada espelhada de um edifício corporativo" },
  folder:    { src: C + "fin-documentos.jpg",         alt: "Carteira de couro azul com caderno e caneta" },
  bluetex:   { src: C + "fin-azul-hero.jpg",          alt: "Textura azul profunda em movimento" },
  sea:       { src: C + "fin-divisoria.jpg",          alt: "Superfície do mar azul vista de cima" },
  persiana:  { src: C + "persiana-pb.jpg",            alt: "Sombra de persiana na parede, em preto e branco" },
} satisfies Record<string, CuratedImage>;

interface Quad { hero: CuratedImage; ctx: CuratedImage; nucHero: CuratedImage; nucCtx: CuratedImage }

// Por categoria: hero (fundo atmosférico sob camada escura) + contexto (a foto
// nítida e visível, que carrega o tema) da MODALIDADE, mais hero e contexto da
// página de PRODUTO. A imagem mais clara do tema fica sempre no contexto.
const CATEGORIA: Record<string, Quad> = {
  "credito-e-liquidez":                    { hero: IMG.folder,  ctx: IMG.calc,   nucHero: IMG.docs,  nucCtx: IMG.bluetex },
  financiamentos:                          { hero: IMG.glass,   ctx: IMG.keys,   nucHero: IMG.apt,   nucCtx: IMG.folder },
  capitalizacao:                           { hero: IMG.bluetex, ctx: IMG.jar,    nucHero: IMG.chart, nucCtx: IMG.report },
  "garantias-financeiras":                 { hero: IMG.docs,    ctx: IMG.sign,   nucHero: IMG.policy, nucCtx: IMG.apt },
  "investimentos-previdencia-e-reservas":  { hero: IMG.bluetex, ctx: IMG.report, nucHero: IMG.chart, nucCtx: IMG.hourglass },
  "servicos-financeiros-e-contas":         { hero: IMG.folder,  ctx: IMG.card,   nucHero: IMG.mobile, nucCtx: IMG.toll },
};

// Overrides por núcleo (categorias com mais de um caminho, para as irmãs não repetirem).
const NUCLEO: Record<string, { hero: CuratedImage; ctx: CuratedImage }> = {
  "garantias-financeiras/carta-garantia":                              { hero: IMG.folder,    ctx: IMG.policy },
  "garantias-financeiras/fianca-bancaria":                            { hero: IMG.glass,     ctx: IMG.sea },
  "garantias-financeiras/garantias-de-aluguel":                       { hero: IMG.persiana,  ctx: IMG.apt },
  "investimentos-previdencia-e-reservas/investimentos-e-patrimonio-financeiro": { hero: IMG.glass, ctx: IMG.chart },
  "investimentos-previdencia-e-reservas/previdencia":                 { hero: IMG.jar,       ctx: IMG.hourglass },
  "servicos-financeiros-e-contas/cartoes-de-credito":                 { hero: IMG.mobile,    ctx: IMG.cardsGold },
  "servicos-financeiros-e-contas/conta-digital":                      { hero: IMG.bluetex,   ctx: IMG.mobile },
  "servicos-financeiros-e-contas/tags-pedagio":                       { hero: IMG.bluetex,   ctx: IMG.toll },
};

/** Hub /solucoes/financeiras. */
export const FIN_HUB = { hero: IMG.glass, ctx: IMG.docs };

/** Modalidade (categoria) financeira: hero + contexto que comunicam o tema. */
export function finCategoriaImgs(categoriaSlug: string): { hero: CuratedImage; ctx: CuratedImage } | null {
  const q = CATEGORIA[categoriaSlug];
  return q ? { hero: q.hero, ctx: q.ctx } : null;
}

/** Página de produto (núcleo) financeira: fotos distintas das da modalidade. */
export function finNucleoImgs(categoriaSlug: string, nucleoSlug: string): { hero: CuratedImage; ctx: CuratedImage } | null {
  const ov = NUCLEO[`${categoriaSlug}/${nucleoSlug}`];
  if (ov) return ov;
  const q = CATEGORIA[categoriaSlug];
  return q ? { hero: q.nucHero, ctx: q.nucCtx } : null;
}
