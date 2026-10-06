import { useRouterState } from "@tanstack/react-router";
import { VERTICAIS } from "@/lib/verticais";

/**
 * Qual logo o cabeçalho mostra: a marca da casa ou a da frente que o visitante
 * está percorrendo.
 *
 * O pedido do Carlos é que o logo troque ao entrar num HUB e continue trocado
 * durante a navegação. Por isso a comparação é por prefixo: vale a página da
 * vertical e também as de categoria e de caminho abaixo dela. Sair para a Home,
 * o blog ou Quem somos devolve a marca da casa.
 *
 * O mapa sai do modelo único das verticais, não de uma lista à parte: o nome do
 * arquivo é o `id` da vertical, e o caminho é o `hub`. Antes havia uma lista
 * própria apontando para `/seguros`, `/saude` e companhia, que são as rotas
 * aposentadas. Como elas passaram a redirecionar, o logo nunca mais trocava.
 *
 * O cabeçalho tem fundo branco, então aqui entram sempre as versões escuras.
 * Quem precisa da versão clara, como o menu do celular, troca o sufixo.
 */
const PADRAO = "/assets/logos/plan10-corretora.webp";

export function useHubLogo(): { src: string; alt: string; isHub: boolean } {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const vertical = VERTICAIS.find(
    (v) => path === `/solucoes/${v.hub}` || path.startsWith(`/solucoes/${v.hub}/`),
  );
  if (!vertical) return { src: PADRAO, alt: "Plan10 Corretora", isHub: false };
  return {
    src: `/assets/logos/plan10-${vertical.id}.webp`,
    alt: `Plan10 ${vertical.label}`,
    isHub: true,
  };
}
