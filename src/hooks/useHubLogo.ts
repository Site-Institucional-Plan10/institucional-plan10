import { useRouterState } from "@tanstack/react-router";

const hubLogoMap: Record<string, string> = {
  "/seguros": "/assets/logos/logo-seguros.png",
  "/saude": "/assets/logos/logo-saude-odonto.png",
  "/consorcios": "/assets/logos/logo-consorcios.png",
  "/financas": "/assets/logos/logo-financas.png",
  "/servicos-24h": "/assets/logos/logo-servicos.png",
};

const DEFAULT_LOGO = "/assets/logos/logo-plan10.png";

export function useHubLogo(): { src: string; isHub: boolean } {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const hub = hubLogoMap[path];
  return { src: hub ?? DEFAULT_LOGO, isHub: !!hub };
}
