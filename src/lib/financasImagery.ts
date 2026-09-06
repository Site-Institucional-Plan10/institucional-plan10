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
  calc: {
    src: C + "cand-credito-calc.jpg",
    alt: "Documentos com caneta e óculos sobre a mesa de trabalho",
  },
  keys: { src: C + "cand-financ-casanova.jpg", alt: "Mão segurando as chaves de um imóvel novo" },
  apt: {
    src: C + "cand-aluguel-apt.jpg",
    alt: "Mão com as chaves na porta de um apartamento moderno",
  },
  jar: { src: C + "cand-capit-jarra.jpg", alt: "Pote de vidro com moedas e uma pequena planta" },
  sign: { src: C + "cand-garant-assina.jpg", alt: "Mão assinando um contrato com caneta" },
  policy: { src: C + "cand-garant-seguro.jpg", alt: "Assinatura de uma apólice sobre a mesa" },
  report: {
    src: C + "cand-invest-relatorio.jpg",
    alt: "Relatório com gráficos de desempenho financeiro",
  },
  chart: { src: C + "cand-invest-grafico.jpg", alt: "Gráfico de mercado em tendência de alta" },
  card: {
    src: C + "cand-servic-cartao.jpg",
    alt: "Smartphone e cartão de crédito para pagamento digital",
  },
  mobile: { src: C + "cand-conta-mobile.jpg", alt: "Celular e cartão sobre a mesa, conta digital" },
  docs: { src: C + "cand-hub-docs.jpg", alt: "Relatório de estratégia e laptop vistos de cima" },
  hourglass: { src: C + "cand-previd-tempo.jpg", alt: "Ampulheta ao lado de moedas empilhadas" },
  toll: {
    src: C + "cand-tags-pedagio.jpg",
    alt: "Praça de pedágio com várias faixas, vista aérea",
  },
  cardsGold: { src: C + "cand-cartoes-gold.jpg", alt: "Cartões de crédito premium em destaque" },
  // Assuntos que faltavam no acervo, buscados no Pexels (licença livre para uso
  // comercial, sem exigência de crédito). Cobrem produtos de financiamento que
  // antes caíam numa foto financeira genérica.
  jetA: { src: C + "fin-aeronave-a.jpg", alt: "Jato executivo parado na pista" },
  jetB: { src: C + "fin-aeronave-b.jpg", alt: "Jato executivo visto de frente na pista" },
  moto: { src: C + "fin-moto.jpg", alt: "Motocicleta estacionada na rua" },
  solarA: { src: C + "fin-solar-a.jpg", alt: "Telhado residencial com placas solares" },
  solarB: { src: C + "fin-solar-b.jpg", alt: "Placas solares no telhado de um prédio de tijolos" },
  rural: { src: C + "fin-rural.jpg", alt: "Colheitadeira em lavoura de trigo" },
  boat: { src: C + "home-veleiro.jpg", alt: "Marina com veleiros ancorados" },
  // Abstratas premium já existentes
  glass: { src: C + "fin-vidro.jpg", alt: "Fachada espelhada de um edifício corporativo" },
  folder: { src: C + "fin-documentos.jpg", alt: "Carteira de couro azul com caderno e caneta" },
  bluetex: { src: C + "fin-azul-hero.jpg", alt: "Textura azul profunda em movimento" },
  sea: { src: C + "fin-divisoria.jpg", alt: "Superfície do mar azul vista de cima" },
  persiana: { src: C + "persiana-pb.jpg", alt: "Sombra de persiana na parede, em preto e branco" },
} satisfies Record<string, CuratedImage>;

/** Todas as fotos do acervo financeiro, usadas como reserva de substituição. */
const TODAS: CuratedImage[] = Object.values(IMG);

interface Quad {
  hero: CuratedImage;
  ctx: CuratedImage;
  nucHero: CuratedImage;
  nucCtx: CuratedImage;
}

// Por categoria: hero (fundo atmosférico sob camada escura) + contexto (a foto
// nítida e visível, que carrega o tema) da MODALIDADE, mais hero e contexto da
// página de PRODUTO. A imagem mais clara do tema fica sempre no contexto.
const CATEGORIA: Record<string, Quad> = {
  "credito-e-liquidez": { hero: IMG.folder, ctx: IMG.calc, nucHero: IMG.docs, nucCtx: IMG.bluetex },
  financiamentos: { hero: IMG.glass, ctx: IMG.keys, nucHero: IMG.apt, nucCtx: IMG.folder },
  capitalizacao: { hero: IMG.bluetex, ctx: IMG.jar, nucHero: IMG.chart, nucCtx: IMG.report },
  "garantias-financeiras": { hero: IMG.docs, ctx: IMG.sign, nucHero: IMG.policy, nucCtx: IMG.apt },
  "investimentos-previdencia-e-reservas": {
    hero: IMG.bluetex,
    ctx: IMG.report,
    nucHero: IMG.chart,
    nucCtx: IMG.hourglass,
  },
  "servicos-financeiros-e-contas": {
    hero: IMG.folder,
    ctx: IMG.card,
    nucHero: IMG.mobile,
    nucCtx: IMG.toll,
  },
};

// Overrides por núcleo (categorias com mais de um caminho, para as irmãs não repetirem).
const NUCLEO: Record<string, { hero: CuratedImage; ctx: CuratedImage }> = {
  "garantias-financeiras/carta-garantia": { hero: IMG.folder, ctx: IMG.policy },
  "garantias-financeiras/fianca-bancaria": { hero: IMG.glass, ctx: IMG.sea },
  "garantias-financeiras/garantias-de-aluguel": { hero: IMG.persiana, ctx: IMG.apt },
  "investimentos-previdencia-e-reservas/investimentos-e-patrimonio-financeiro": {
    hero: IMG.glass,
    ctx: IMG.chart,
  },
  "investimentos-previdencia-e-reservas/previdencia": { hero: IMG.jar, ctx: IMG.hourglass },
  "servicos-financeiros-e-contas/cartoes-de-credito": { hero: IMG.mobile, ctx: IMG.cardsGold },
  "servicos-financeiros-e-contas/conta-digital": { hero: IMG.bluetex, ctx: IMG.mobile },
  "servicos-financeiros-e-contas/tags-pedagio": { hero: IMG.bluetex, ctx: IMG.toll },
};

/** Hub /solucoes/financeiras. */
export const FIN_HUB = { hero: IMG.glass, ctx: IMG.docs };

/** Modalidade (categoria) financeira: hero + contexto que comunicam o tema. */
export function finCategoriaImgs(
  categoriaSlug: string,
): { hero: CuratedImage; ctx: CuratedImage } | null {
  const q = CATEGORIA[categoriaSlug];
  return q ? { hero: q.hero, ctx: q.ctx } : null;
}

/** Página de produto (núcleo) financeira: fotos distintas das da modalidade. */
export function finNucleoImgs(
  categoriaSlug: string,
  nucleoSlug: string,
): { hero: CuratedImage; ctx: CuratedImage } | null {
  const ov = NUCLEO[`${categoriaSlug}/${nucleoSlug}`];
  if (ov) return ov;
  const q = CATEGORIA[categoriaSlug];
  return q ? { hero: q.nucHero, ctx: q.nucCtx } : null;
}

/**
 * Foto por PRODUTO dentro de um núcleo financeiro. O pool é temático: as fotos
 * do caminho de crédito falam de documento e análise, as de cartão falam de
 * pagamento, e assim por diante. A escolha sai da posição do produto na lista,
 * então irmãos vizinhos nunca caem na mesma foto e a mesma página sempre mostra
 * a mesma imagem para o mesmo produto.
 */
const PRODUTO: Record<string, CuratedImage[]> = {
  // Ordem = aderência ao tema. O seletor consome do começo, então núcleo pequeno
  // só usa as fotos mais próximas do assunto, e as mais genéricas do fim só
  // entram quando o núcleo é grande. O acervo tem 19 fotos e o maior núcleo tem
  // 17 produtos, então dá para não repetir nenhuma dentro da mesma página.
  "credito-e-liquidez/operacoes-de-credito": [
    IMG.calc,
    IMG.report,
    IMG.chart,
    IMG.sign,
    IMG.folder,
    IMG.docs,
    IMG.mobile,
    IMG.jar,
    IMG.glass,
    IMG.card,
    IMG.policy,
    IMG.bluetex,
  ],
  // Este pool segue a ORDEM DOS PRODUTOS do núcleo, então cada posição cai no
  // assunto certo: aeronave, aeronave, frota, moto, solar, solar, veículo,
  // veículo, estudantil, imóvel, imóvel, náutico, náutico, rural, portabilidade,
  // portabilidade, crédito veicular.
  "financiamentos/financiamento-de-bens-e-projetos": [
    IMG.jetA,
    IMG.jetB,
    IMG.toll,
    IMG.moto,
    IMG.solarA,
    IMG.solarB,
    IMG.calc,
    IMG.sign,
    IMG.docs,
    IMG.keys,
    IMG.apt,
    IMG.sea,
    IMG.boat,
    IMG.rural,
    IMG.folder,
    IMG.policy,
    IMG.report,
    IMG.chart,
    IMG.glass,
  ],
  "capitalizacao/capitalizacao": [
    IMG.jar,
    IMG.hourglass,
    IMG.report,
    IMG.chart,
    IMG.folder,
    IMG.docs,
    IMG.sign,
  ],
  "garantias-financeiras/carta-garantia": [IMG.policy, IMG.sign, IMG.docs, IMG.calc, IMG.glass],
  "garantias-financeiras/fianca-bancaria": [IMG.sign, IMG.policy, IMG.docs, IMG.calc, IMG.folder],
  "garantias-financeiras/garantias-de-aluguel": [
    IMG.apt,
    IMG.keys,
    IMG.jar,
    IMG.policy,
    IMG.sign,
    IMG.docs,
    IMG.calc,
  ],
  "investimentos-previdencia-e-reservas/investimentos-e-patrimonio-financeiro": [
    IMG.chart,
    IMG.report,
    IMG.glass,
    IMG.jar,
    IMG.docs,
    IMG.folder,
    IMG.hourglass,
    IMG.calc,
    IMG.bluetex,
    IMG.sea,
  ],
  "investimentos-previdencia-e-reservas/previdencia": [
    IMG.hourglass,
    IMG.jar,
    IMG.report,
    IMG.chart,
    IMG.folder,
    IMG.docs,
    IMG.calc,
    IMG.sea,
    IMG.glass,
  ],
  "servicos-financeiros-e-contas/cartoes-de-credito": [
    IMG.cardsGold,
    IMG.card,
    IMG.mobile,
    IMG.toll,
    IMG.docs,
    IMG.folder,
    IMG.calc,
    IMG.glass,
    IMG.report,
    IMG.jar,
  ],
  "servicos-financeiros-e-contas/conta-digital": [
    IMG.mobile,
    IMG.card,
    IMG.cardsGold,
    IMG.docs,
    IMG.glass,
  ],
  "servicos-financeiros-e-contas/tags-pedagio-e-estacionamento": [
    IMG.toll,
    IMG.card,
    IMG.mobile,
    IMG.cardsGold,
    IMG.calc,
    IMG.docs,
  ],
};

const PRODUTO_FALLBACK: CuratedImage[] = [
  IMG.folder,
  IMG.calc,
  IMG.docs,
  IMG.glass,
  IMG.report,
  IMG.chart,
  IMG.sign,
  IMG.jar,
];

/**
 * Foto de um PRODUTO dentro do núcleo financeiro. Duas garantias:
 * 1. nunca devolve a mesma foto que o topo da página já usa (hero e contexto);
 * 2. produtos irmãos nunca caem na mesma foto, porque a escolha anda pela lista
 *    conforme a posição do produto.
 * A mesma página sempre mostra a mesma foto para o mesmo produto.
 */
export function finProdutoImg(
  categoriaSlug: string,
  nucleoSlug: string,
  ordem: number,
): CuratedImage {
  const pool = PRODUTO[`${categoriaSlug}/${nucleoSlug}`] ?? PRODUTO_FALLBACK;
  const daPagina = finNucleoImgs(categoriaSlug, nucleoSlug);
  const jaNaTela = daPagina ? [daPagina.hero.src, daPagina.ctx.src] : [];
  // Onde a foto do topo aparece no pool, ela é TROCADA por uma sobra do acervo,
  // e não removida: o pool de financiamentos é alinhado à ordem dos produtos, e
  // encurtar a lista desalinharia todos os produtos seguintes do assunto certo.
  const reserva = TODAS.filter(
    (img) => !jaNaTela.includes(img.src) && !pool.some((p) => p.src === img.src),
  );
  let proxima = 0;
  const lista = pool.map((img) => (jaNaTela.includes(img.src) ? (reserva[proxima++] ?? img) : img));
  return lista[ordem % lista.length];
}
