/**
 * Modelo único das cinco verticais do wireframe.
 *
 * O pacote de integração chama as frentes de Seguros, Saúde, Finanças,
 * Consórcios e Serviços. No catálogo elas têm outro nome: Proteção é Seguros,
 * Crescimento é Consórcios e Assistência é Serviços. Este arquivo é o único
 * lugar onde essa correspondência existe.
 *
 * Tudo que a revisão pede (mega menu, busca, filtros, sanfonas e favoritos)
 * consome daqui, para não haver cópia divergente de nome, perfil ou
 * disponibilidade. A fonte continua sendo o catálogo em `solucoes-liberadas`,
 * que foi conferido produto a produto contra a planilha do pacote: 393 produtos
 * iguais nos dois, sem diferença de hierarquia.
 */
import { solutions } from "@/data/solutions";

export type PerfilPublico = "pessoal" | "empresa";
export type VerticalId = "seguros" | "saude" | "financas" | "consorcios" | "servicos";

export interface Vertical {
  id: VerticalId;
  label: string;
  /** Slug do hub no catálogo e na rota `/solucoes/<hub>`. */
  hub: string;
  cor: string;
  /** Nome do ícone no lucide-react. */
  icone: string;
  chamada: string;
}

export const VERTICAIS: Vertical[] = [
  { id: "seguros", label: "Seguros", hub: "protecao", cor: "#BF7834", icone: "ShieldCheck", chamada: "Proteção para a vida, a casa, o carro e o negócio." },
  { id: "saude", label: "Saúde", hub: "saude", cor: "#229B93", icone: "HeartPulse", chamada: "Acesso a cuidado para a família e para a equipe." },
  { id: "financas", label: "Finanças", hub: "financeiras", cor: "#71869D", icone: "ChartNoAxesCombined", chamada: "Crédito, reservas e previdência com critério." },
  { id: "consorcios", label: "Consórcios", hub: "crescimento", cor: "#8575BD", icone: "KeyRound", chamada: "Planejamento para conquistar bens sem juros." },
  { id: "servicos", label: "Serviços", hub: "assistencia", cor: "#C54949", icone: "Handshake", chamada: "Assistência que resolve o dia a dia." },
];

const POR_HUB = new Map(VERTICAIS.map((v) => [v.hub, v]));
const POR_ID = new Map(VERTICAIS.map((v) => [v.id, v]));

export function verticalPorHub(hub: string): Vertical | undefined {
  return POR_HUB.get(hub);
}
export function verticalPorId(id: string): Vertical | undefined {
  return POR_ID.get(id as VerticalId);
}

export interface ItemCatalogo {
  /** Identificador estável, único no site inteiro: hub/categoria/núcleo/produto.
   *  O `id` do produto sozinho não serve: sete nomes se repetem entre núcleos. */
  chave: string;
  nome: string;
  descricao: string;
  perfil: PerfilPublico;
  vertical: VerticalId;
  hub: string;
  categoria: string;
  nucleo: string;
  /** Rota da vertical já apontando para a sanfona deste item, em partes, para o
   *  Link do router montar sem perder navegação de página única. */
  rota: {
    to: "/solucoes/$solucao";
    params: { solucao: string };
    search: { abrir: string };
    hash: string;
  };
  /** A mesma rota como texto, para uso fora do Link (canonical, sitemap, log). */
  href: string;
}

function publico(perfil: "PF" | "PJ"): PerfilPublico {
  return perfil === "PJ" ? "empresa" : "pessoal";
}

export const CATALOGO: ItemCatalogo[] = solutions.flatMap((hub) => {
  const vertical = POR_HUB.get(hub.slug);
  if (!vertical) return [];
  return hub.categorias.flatMap((categoria) =>
    categoria.nucleos.flatMap((nucleo) =>
      nucleo.products.map((produto) => {
        const chave = `${hub.slug}/${categoria.slug}/${nucleo.slug}/${produto.id}`;
        return {
          chave,
          nome: produto.nome,
          descricao: produto.descricao,
          perfil: publico(produto.perfil),
          vertical: vertical.id,
          hub: hub.slug,
          categoria: categoria.slug,
          nucleo: nucleo.slug,
          rota: {
            to: "/solucoes/$solucao" as const,
            params: { solucao: hub.slug },
            search: { abrir: `${categoria.slug}/${nucleo.slug}` },
            hash: produto.id,
          },
          href: `/solucoes/${hub.slug}?abrir=${encodeURIComponent(`${categoria.slug}/${nucleo.slug}`)}#${produto.id}`,
        } satisfies ItemCatalogo;
      }),
    ),
  );
});

const POR_CHAVE = new Map(CATALOGO.map((i) => [i.chave, i]));

export function itemPorChave(chave: string): ItemCatalogo | undefined {
  return POR_CHAVE.get(chave);
}

export function itensDaVertical(id: VerticalId, perfil?: PerfilPublico): ItemCatalogo[] {
  return CATALOGO.filter((i) => i.vertical === id && (!perfil || i.perfil === perfil));
}

/**
 * Seis destaques por vertical no mega menu: três para Você e família e três
 * para Sua empresa. A seleção veio do wireframe e cada uma foi conferida no
 * catálogo, por nome e por perfil. Nenhum item aqui é inventado: os demais
 * produtos continuam acessíveis pelas categorias da vertical.
 */
const NOMES_EM_DESTAQUE: Record<VerticalId, Record<PerfilPublico, string[]>> = {
  seguros: {
    pessoal: ["Seguro automóvel", "Seguro residencial", "Seguro vida individual"],
    empresa: ["Seguro lucros cessantes empresarial", "Seguro vida em grupo", "Seguro RC empresarial geral"],
  },
  saude: {
    pessoal: ["Plano de saúde individual", "Plano de saúde familiar", "Plano odontológico familiar"],
    empresa: ["Plano de saúde empresarial", "Plano de saúde PME", "Plano odontológico empresarial"],
  },
  financas: {
    pessoal: ["Crédito pessoal", "Crédito imobiliário", "PGBL"],
    empresa: ["Crédito para capital de giro", "Antecipação de recebíveis", "Financiamento de frota"],
  },
  consorcios: {
    pessoal: ["Consórcio residência", "Consórcio automóvel", "Consórcio motocicleta"],
    empresa: ["Consórcio imóvel empresarial", "Consórcio frota executiva", "Consórcio máquinas pesadas"],
  },
  servicos: {
    pessoal: ["Assistência chaveiro", "Assistência guincho", "Assistência funeral familiar"],
    empresa: ["Assistência equipamentos empresariais", "Assistência guincho frota", "Programa de bem-estar empresarial"],
  },
};

function acharPorNome(vertical: VerticalId, perfil: PerfilPublico, nome: string): ItemCatalogo | undefined {
  const alvo = nome.trim().toLowerCase();
  const daVertical = CATALOGO.filter((i) => i.vertical === vertical);
  // o mesmo nome existe em mais de um núcleo, então o perfil desempata
  return (
    daVertical.find((i) => i.nome.trim().toLowerCase() === alvo && i.perfil === perfil) ??
    daVertical.find((i) => i.nome.trim().toLowerCase() === alvo)
  );
}

export const DESTAQUES: Record<VerticalId, Record<PerfilPublico, ItemCatalogo[]>> = Object.fromEntries(
  VERTICAIS.map((v) => [
    v.id,
    {
      pessoal: NOMES_EM_DESTAQUE[v.id].pessoal
        .map((n) => acharPorNome(v.id, "pessoal", n))
        .filter((x): x is ItemCatalogo => Boolean(x)),
      empresa: NOMES_EM_DESTAQUE[v.id].empresa
        .map((n) => acharPorNome(v.id, "empresa", n))
        .filter((x): x is ItemCatalogo => Boolean(x)),
    },
  ]),
) as Record<VerticalId, Record<PerfilPublico, ItemCatalogo[]>>;

/** Busca local simples, por nome e descrição. Esta fase não tem backend. */
export function buscar(termo: string, perfil?: PerfilPublico, limite = 12): ItemCatalogo[] {
  const q = termo.trim().toLowerCase();
  if (q.length < 2) return [];
  const base = perfil ? CATALOGO.filter((i) => i.perfil === perfil) : CATALOGO;
  const porNome = base.filter((i) => i.nome.toLowerCase().includes(q));
  const porDescricao = base.filter(
    (i) => !porNome.includes(i) && i.descricao.toLowerCase().includes(q),
  );
  return [...porNome, ...porDescricao].slice(0, limite);
}
