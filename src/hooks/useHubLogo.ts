import { useRouterState } from "@tanstack/react-router";

const hubLogoMap: Record<string, string> = {
  "/seguros": "/assets/logos/logo-seguros.png",
  "/saude": "/assets/logos/logo-saude-odonto.png",
  "/consorcios": "/assets/logos/logo-consorcios.png",
  "/financas": "/assets/logos/logo-financas.png",
  "/servicos-24h": "/assets/logos/logo-servicos.png",
};

export function useHubLogo(): { src: string | null; isHub: boolean } {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const src = hubLogoMap[path] ?? null;
  return { src, isHub: !!src };
}
