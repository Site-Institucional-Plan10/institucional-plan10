/**
 * Curadoria de imagem por página.
 *
 * Antes, hero e contexto vinham de mapas fixos com três ou quatro fotos, então
 * todas as modalidades de uma solução abriam com a mesma imagem e a página de
 * produto repetia a da categoria. Aqui cada solução tem um pool coerente com o
 * seu tema, e a escolha sai da posição da página entre as irmãs: a mesma página
 * mostra sempre a mesma foto (sem piscar entre renders), irmãs andam pelo pool em
 * fila, e a foto do filho nunca repete a do pai.
 *
 * O acervo é o de `public/assets/curated/` mais duas fotos sem rosto de
 * `assets/banners/`. Os `hero-*.png` de banners ficaram de fora de propósito: são
 * geradas por IA e trazem rosto reconhecível, o que a regra da marca não permite
 * em contexto de saúde nem de dinheiro.
 *
 * Limite conhecido: são 11 fotos. Em categorias com mais filhos que o pool, a
 * repetição volta, mas só entre itens distantes na lista, nunca vizinhos.
 */

export interface CuratedImage {
  src: string;
  alt: string;
}

const IMG = {
  familia: {
    src: "/assets/curated/familia-maos.jpg",
    alt: "Mãos de um adulto segurando as mãos de um bebê no colo",
  },
  azul: {
    src: "/assets/curated/fin-azul-hero.jpg",
    alt: "Textura azul profunda em movimento",
  },
  mar: {
    src: "/assets/curated/fin-divisoria.jpg",
    alt: "Superfície do mar azul vista de cima",
  },
  documentos: {
    src: "/assets/curated/fin-documentos.jpg",
    alt: "Carteira de couro azul com caderno e caneta sobre a mesa",
  },
  vidro: {
    src: "/assets/curated/fin-vidro.jpg",
    alt: "Fachada espelhada de um edifício corporativo",
  },
  veleiro: {
    src: "/assets/curated/home-veleiro.jpg",
    alt: "Marina com veleiros ancorados em uma manhã de neblina",
  },
  luz: {
    src: "/assets/curated/luz-fechamento.jpg",
    alt: "Luz da tarde entrando por uma cortina em um ambiente residencial",
  },
  persiana: {
    src: "/assets/curated/persiana-pb.jpg",
    alt: "Sombra de persiana desenhada na parede, em preto e branco",
  },
  envelopes: {
    src: "/assets/curated/still-envelopes.jpg",
    alt: "Envelopes escuros lacrados com selo de cera dourado",
  },
  mesa: {
    src: "/assets/banners/fin-contexto.jpg",
    alt: "Notebook fechado, papel e caneta sobre uma mesa de trabalho clara",
  },
  arquitetura: {
    src: "/assets/banners/fin-hub.jpg",
    alt: "Pirâmide de vidro recortada contra o céu",
  },
} satisfies Record<string, CuratedImage>;

/**
 * Pool por solução, na ordem de preferência. A primeira da lista tende a abrir a
 * página principal daquela solução, e as seguintes vão sendo distribuídas entre
 * categorias e produtos.
 */
const POOLS: Record<string, CuratedImage[]> = {
  // A ordem alterna quente, preto e branco, claro e frio de propósito: irmãs
  // vizinhas caem em fotos consecutivas do pool, então alternar o clima evita
  // duas texturas azuis seguidas, que de longe se parecem.

  // Cuidado e bem-estar. Sem envelopes e vidro, que puxam para contrato e escritório.
  // Sem familia: a foto tem rosto de bebê visível e a regra da marca proíbe rosto
  // reconhecível em contexto de saúde. Ela fica em proteção, onde cabe.
  saude: [IMG.luz, IMG.persiana, IMG.mesa, IMG.azul, IMG.mar, IMG.veleiro],
  // Vida e patrimônio protegidos: apólice, lar e família.
  protecao: [IMG.envelopes, IMG.luz, IMG.vidro, IMG.persiana, IMG.familia, IMG.arquitetura, IMG.documentos, IMG.mar],
  // Planejamento e futuro, o tema mais formal do site. As mais fortes primeiro
  // (couro, vidro, azul, lacre); mesa e pirâmide, mais genéricas, ficam no fim
  // para quase não caírem nas páginas principais.
  financeiras: [IMG.documentos, IMG.vidro, IMG.azul, IMG.envelopes, IMG.mar, IMG.persiana, IMG.arquitetura, IMG.mesa],
  // Conquista e novo ciclo: o bem comprado, a casa, a carta.
  crescimento: [IMG.veleiro, IMG.luz, IMG.documentos, IMG.mar, IMG.envelopes, IMG.arquitetura, IMG.azul],
  // Apoio no dia a dia, tom prático e próximo.
  assistencia: [IMG.persiana, IMG.luz, IMG.veleiro, IMG.mesa, IMG.vidro, IMG.azul, IMG.mar],
};

const FALLBACK: CuratedImage[] = [
  IMG.persiana,
  IMG.azul,
  IMG.mar,
  IMG.vidro,
  IMG.documentos,
  IMG.envelopes,
];

function poolFor(solucaoSlug: string): CuratedImage[] {
  return POOLS[solucaoSlug] ?? FALLBACK;
}

/**
 * Escolhe pela posição da página entre as suas irmãs, não por hash do slug.
 * Hash sorteia e às vezes dá o mesmo índice para duas irmãs, que foi o que
 * deixava duas modalidades vizinhas com a foto idêntica. Com a posição, as
 * irmãs andam pelo pool em fila e só repetem quando o pool acaba.
 *
 * `ordem` é o índice do item na lista do pai; `deslocamento` separa os níveis
 * (solução, categoria, produto) para o filho não cair na foto do pai.
 */
export function pickByOrder(
  solucaoSlug: string,
  ordem: number,
  deslocamento = 0,
  evitar: Array<string | undefined> = [],
): CuratedImage {
  const pool = poolFor(solucaoSlug);
  const bloqueadas = new Set(evitar.filter(Boolean) as string[]);
  const base = ((ordem + deslocamento) % pool.length + pool.length) % pool.length;

  for (let i = 0; i < pool.length; i += 1) {
    const cand = pool[(base + i) % pool.length];
    if (!bloqueadas.has(cand.src)) return cand;
  }
  // Pool inteiro bloqueado (solução com poucas fotos): devolve a da posição.
  return pool[base];
}

/** Hero da página de solução. Sempre a primeira foto do pool daquele tema. */
export function heroSolucao(solucaoSlug: string): CuratedImage {
  return pickByOrder(solucaoSlug, 0);
}

/** Hero da página de categoria (modalidades), variando por posição da categoria. */
export function heroCategoria(solucaoSlug: string, ordemCategoria: number): CuratedImage {
  return pickByOrder(solucaoSlug, ordemCategoria, 1);
}

/** Hero da página de produto, variando por posição dentro da categoria. */
export function heroNucleo(
  solucaoSlug: string,
  ordemCategoria: number,
  ordemNucleo: number,
  evitar: Array<string | undefined> = [],
): CuratedImage {
  return pickByOrder(solucaoSlug, ordemCategoria + ordemNucleo, 2, evitar);
}

/** Imagem de apoio no corpo, sempre diferente do hero da mesma tela. */
export function contextoDe(
  solucaoSlug: string,
  ordem: number,
  heroSrc: string,
): CuratedImage {
  return pickByOrder(solucaoSlug, ordem, 3, [heroSrc]);
}
