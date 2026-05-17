import { Link, useLocation } from "@tanstack/react-router";

const verticals = [
  { label: "Seguros", route: "/seguros", color: "#3D8BF2" },
  { label: "Saúde", route: "/saude", color: "#24BF5B" },
  { label: "Consórcio", route: "/consorcios", color: "#9857F2" },
  { label: "Finanças", route: "/financas", color: "#1A4FA0" },
  { label: "Serviços", route: "/servicos-24h", color: "#27DEF2" },
] as const;

export function MobileVerticalStrip() {
  const { pathname } = useLocation();

  return (
    <nav
      className="md:hidden sticky z-40 bg-white border-b border-neutral-200"
      style={{ top: "80px" }}
      aria-label="Verticais"
    >
      <style>{`.mvs-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div
        className="mvs-scroll flex gap-2 overflow-x-auto px-4 py-2.5"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {verticals.map(({ label, route, color }) => {
          const isActive = pathname === route;
          return (
            <Link
              key={route}
              to={route}
              className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-colors"
              style={{
                background: isActive ? color : "#FFFFFF",
                color: isActive ? "#FFFFFF" : "#1A1A1A",
                border: isActive ? `1px solid ${color}` : "1px solid #E5E5E5",
              }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: isActive ? "#FFFFFF" : color }}
              />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
