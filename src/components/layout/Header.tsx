import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { Plan10Logo } from "@/components/ui/Plan10Logo";
import { Button } from "@/components/ui/Plan10Button";
import { cn } from "@/lib/utils";

import { verticals } from "@/data/verticals";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/quem-somos", label: "Quem Somos" },
  { to: "/seguros", label: "Seguros", hubColor: "#3D8BF2" },
  { to: "/saude", label: "Saúde", hubColor: "#24BF5B" },
  { to: "/consorcios", label: "Consórcio", hubColor: "#9857F2" },
  { to: "/financas", label: "Finanças", hubColor: "#C5D0D9" },
  { to: "/servicos-24h", label: "Serviços", hubColor: "#27DEF2" },
  { to: "/blog", label: "Blog" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled ? "backdrop-blur-md bg-white/95 shadow-sm" : "bg-white",
        )}
      >
        <div className="container-x flex h-20 items-center justify-between gap-4">
          <Link to="/" className="flex-shrink-0" aria-label="Plan10 — Home">
            <Plan10Logo variant="full" size={120} />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="group relative px-3 py-2 text-sm font-semibold text-ink hover:text-orange transition flex items-center gap-1.5"
                activeProps={{ className: "text-orange" }}
              >
                {"hubColor" in l && l.hubColor && (
                  <span
                    className="h-1.5 w-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                    style={{ backgroundColor: l.hubColor }}
                  />
                )}
                {l.label}
                <span className="absolute bottom-0 left-3 right-3 h-0.5 origin-left scale-x-0 bg-orange transition-transform group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen((s) => !s)}
              className="hidden md:flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-neutral-100 transition"
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>
            <Link to="/fale-conosco" className="hidden md:inline-flex">
              <Button variant="primary" size="sm">Fale Conosco</Button>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-neutral-100"
              aria-label="Abrir menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="border-t border-neutral-200 bg-white">
            <div className="container-x py-3">
              <input
                autoFocus
                type="search"
                placeholder="Buscar seguros, planos, consórcio..."
                className="w-full h-11 rounded-lg border border-neutral-300 px-4 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20"
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden flex flex-col">
          <div className="container-x flex h-20 items-center justify-between">
            <Plan10Logo variant="full" size={110} />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-100"
              aria-label="Fechar menu"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="container-x flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-4 text-lg font-semibold hover:bg-neutral-100"
              >
                {"hubColor" in l && l.hubColor && (
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: l.hubColor }} />
                )}
                {l.label}
              </Link>
            ))}
            <Link
              to="/fale-conosco"
              onClick={() => setMobileOpen(false)}
              className="mt-4"
            >
              <Button variant="primary" className="w-full">Fale Conosco</Button>
            </Link>
          </nav>
          <div className="container-x mt-auto pb-8 text-sm text-neutral-500">
            {verticals.length} hubs · 24/7
          </div>
        </div>
      )}
    </>
  );
}
