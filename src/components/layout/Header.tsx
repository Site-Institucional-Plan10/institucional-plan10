import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/Plan10Button";
import { useHubLogo } from "@/hooks/useHubLogo";
import { searchIndex, type SearchItem } from "@/data/searchIndex";

import { verticals } from "@/data/verticals";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/quem-somos", label: "Quem Somos" },
  { to: "/seguros", label: "Seguros", hubColor: "#3D8BF2" },
  { to: "/saude", label: "Saúde", hubColor: "#24BF5B" },
  { to: "/consorcios", label: "Consórcios", hubColor: "#9857F2" },
  { to: "/financas", label: "Finanças", hubColor: "#C5D0D9" },
  { to: "/servicos-24h", label: "Serviços", hubColor: "#27DEF2" },
  { to: "/blog", label: "Blog" },
] as const;

function HeaderLogo({ size = 48 }: { size?: number }) {
  const { src } = useHubLogo();
  return (
    <img
      src={src}
      alt="Plan10"
      style={{ height: size, width: "auto", objectFit: "contain" }}
    />
  );
}

function highlight(text: string, query: string) {
  if (!query) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <span style={{ color: "#FF6B00", fontWeight: 700 }}>{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </span>
  );
}

function SearchBox({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 150);
    return () => clearTimeout(t);
  }, [query]);

  const results = useMemo<SearchItem[]>(() => {
    if (!debounced) return [];
    const q = debounced.toLowerCase();
    return searchIndex
      .filter((item) => {
        if (item.label.toLowerCase().includes(q)) return true;
        if (item.description.toLowerCase().includes(q)) return true;
        return item.keywords.some((k) => k.toLowerCase().includes(q));
      })
      .slice(0, 6);
  }, [debounced]);

  const grouped = useMemo(() => {
    const map = new Map<string, SearchItem[]>();
    results.forEach((r) => {
      const arr = map.get(r.category) ?? [];
      arr.push(r);
      map.set(r.category, arr);
    });
    return Array.from(map.entries());
  }, [results]);

  useEffect(() => {
    setActiveIdx(0);
  }, [debounced]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [onClose]);

  function handleSelect(item: SearchItem) {
    navigate({ to: item.route });
    if (item.anchor) {
      setTimeout(() => {
        document.getElementById(item.anchor!)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
    onClose();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const sel = results[activeIdx];
      if (sel) handleSelect(sel);
    }
  }

  let runningIdx = -1;
  return (
    <div ref={wrapperRef} className="border-t border-neutral-200 bg-white relative">
      <div className="container-x py-3 relative">
        <input
          autoFocus
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Buscar seguros, planos, consórcio..."
          className="w-full h-11 rounded-lg border border-neutral-300 bg-white px-4 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/30"
        />
        {debounced && (
          <div
            className="absolute right-4 sm:right-6 lg:right-8 mt-2 w-[min(400px,calc(100vw-32px))] max-h-[420px] overflow-y-auto"
            style={{
              background: "#FFFFFF",
              border: "1px solid #E8E8E8",
              borderRadius: 16,
              boxShadow: "0 16px 48px rgba(0,0,0,0.14)",
              zIndex: 100,
            }}
          >
            {results.length === 0 ? (
              <div className="px-4 py-5 text-sm text-neutral-600">
                Nenhum resultado encontrado para "{debounced}".
                <div className="text-xs text-neutral-500 mt-1">
                  Tente "seguro auto", "plano de saúde" ou "consórcio imóvel".
                </div>
              </div>
            ) : (
              grouped.map(([cat, items]) => (
                <div key={cat}>
                  <div
                    style={{
                      padding: "8px 16px 4px",
                      fontSize: "0.65rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: "#888888",
                    }}
                  >
                    {cat}
                  </div>
                  {items.map((item) => {
                    runningIdx += 1;
                    const isActive = runningIdx === activeIdx;
                    return (
                      <div
                        key={item.id}
                        onMouseEnter={() => setActiveIdx(results.indexOf(item))}
                        onClick={() => handleSelect(item)}
                        style={{
                          padding: "12px 16px",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                          transition: "background 150ms",
                          background: isActive ? "#FFF4EC" : "transparent",
                          borderLeft: isActive ? "3px solid #FF6B00" : "3px solid transparent",
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1A1A1A" }}>
                          {highlight(item.label, debounced)}
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "#666" }}>{item.description}</div>
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm"
        style={{ borderBottom: "1px solid #E8E8E8" }}
      >
        <div className="container-x flex h-20 items-center justify-between gap-4">
          <Link to="/" className="flex-shrink-0" aria-label="Plan10 — Home">
            <HeaderLogo size={48} />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="group relative px-3 py-2 text-sm font-semibold transition flex items-center gap-1.5"
                style={{ color: "#1A1A1A" }}
                activeProps={{ style: { color: "#FF6B00" }, className: "underline underline-offset-4" }}
              >
                {"hubColor" in l && l.hubColor && (
                  <span
                    className="h-1.5 w-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                    style={{ backgroundColor: l.hubColor }}
                  />
                )}
                <span className="group-hover:text-orange transition-colors">{l.label}</span>
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
              <Button variant="secondary" size="sm">Fale Conosco</Button>
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
        {searchOpen && <SearchBox onClose={() => setSearchOpen(false)} />}
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden flex flex-col">
          <div className="container-x flex h-20 items-center justify-between" style={{ borderBottom: "1px solid #E8E8E8" }}>
            <HeaderLogo size={44} />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-neutral-100"
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
                style={{ color: "#1A1A1A" }}
                activeProps={{ style: { color: "#FF6B00" } }}
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
              <Button variant="secondary" className="w-full">Fale Conosco</Button>
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
