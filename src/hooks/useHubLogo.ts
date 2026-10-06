import { useRouterState } from "@tanstack/react-router";

/**
 * Logos da marca nova, enviados pelo Carlos no pacote de integração.
 *
 * O cabeçalho tem fundo branco, então aqui entram sempre as versões escuras.
 * As versões "-branco", para fundo escuro, ficam no rodapé.
 */
const hubLogoMap: Record<string, string> = {
  "/seguros": "/assets/logos/plan10-seguros.webp",
  "/saude": "/assets/logos/plan10-saude.webp",
  "/consorcios": "/assets/logos/plan10-consorcios.webp",
  "/financas": "/assets/logos/plan10-financas.webp",
  "/servicos-24h": "/assets/logos/plan10-servicos.webp",
};

const DEFAULT_LOGO = "/assets/logos/plan10-corretora.webp";

export function useHubLogo(): { src: string; isHub: boolean } {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const hub = hubLogoMap[path];
  return { src: hub ?? DEFAULT_LOGO, isHub: !!hub };
}
