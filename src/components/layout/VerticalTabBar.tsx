import { Link, useLocation } from "@tanstack/react-router";
import { Shield, Heart, Building2, Landmark, Clock } from "lucide-react";

const verticals = [
  { label: "Seguros", route: "/seguros", icon: Shield, color: "#3D8BF2" },
  { label: "Saúde", route: "/saude", icon: Heart, color: "#24BF5B" },
  { label: "Consórcio", route: "/consorcios", icon: Building2, color: "#9857F2" },
  { label: "Finanças", route: "/financas", icon: Landmark, color: "#1A4FA0" },
  { label: "Serviços", route: "/servicos-24h", icon: Clock, color: "#27DEF2" },
] as const;

const verticalRoutes = verticals.map((v) => v.route);

export function VerticalTabBar() {
  const { pathname } = useLocation();
  const isVerticalPage = verticalRoutes.includes(pathname as (typeof verticalRoutes)[number]);

  if (!isVerticalPage) return null;

  return (
    <nav className="vertical-tab-bar" aria-label="Navegação entre verticais">
      {verticals.map(({ label, route, icon: Icon, color }) => {
        const isActive = pathname === route;
        return (
          <Link
            key={route}
            to={route}
            className="vertical-tab-item"
            data-active={isActive ? "true" : "false"}
            style={{ ["--hub-color" as string]: color } as React.CSSProperties}
          >
            <Icon
              size={20}
              strokeWidth={isActive ? 2.5 : 1.8}
              color={isActive ? color : "#888888"}
            />
            <span style={{ color: isActive ? color : "#888888" }}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
