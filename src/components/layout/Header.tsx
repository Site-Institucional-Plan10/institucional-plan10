import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Menu, MessageCircle, Search, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Plan10Button";
import { useHubLogo } from "@/hooks/useHubLogo";
import { searchIndex, type SearchItem } from "@/data/searchIndex";
import { getWhatsAppUrl } from "@/lib/utils";
import { solutions } from "@/data/solutions";
import { paletteFor } from "@/components/plan10/PageTheme";

import { verticals } from "@/data/verticals";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/quem-somos", label: "Quem somos" },
  { to: "/seguros", label: "Seguros", hubColor: "#3D8BF2" },
  { to: "/saude", label: "Saúde", hubColor: "#24BF5B" },
  { to: "/consorcios", label: "Consórcios", hubColor: "#9857F2" },
  { to: "/financas", label: "Finanças", hubColor: "#C5D0D9" },
  { to: "/servicos-24h", label: "Serviços", hubColor: "#27DEF2" },
  { to: "/blog", label: "Blog" },
] as const;

// Solutions submenu items (DS v3.1 catalog)
const solutionsMenu = solutions.map((s) => ({
  slug: s.slug,
  label: s.nome,
  color: paletteFor(s.slug).vp,
}));

// Mobile menu structure with dividers
type MobileItem =
  | { kind: "link"; to: string; label: string; hubColor?: string }
  | { kind: "solucao"; slug: string; label: string; color: string }
  | { kind: "group"; label: string }
  | { kind: "divider" };

const mobileItems: MobileItem[] = [
  { kind: "link", to: "/", label: "Home" },
  { kind: "link", to: "/quem-somos", label: "Quem somos" },
  { kind: "divider" },
  { kind: "group", label: "Soluções" },
  { kind: "link", to: "/solucoes", label: "Ver todas as Soluções" },
  ...solutionsMenu.map(
    (s): MobileItem => ({ kind: "solucao", slug: s.slug, label: s.label, color: s.color }),
  ),
  { kind: "divider" },
  { kind: "link", to: "/seguros", label: "Seguros", hubColor: "#3D8BF2" },
  { kind: "link", to: "/saude", label: "Saúde", hubColor: "#24BF5B" },
  { kind: "link", to: "/consorcios", label: "Consórcios", hubColor: "#9857F2" },
  { kind: "link", to: "/financas", label: "Finanças", hubColor: "#C5D0D9" },
  { kind: "link", to: "/servicos-24h", label: "Serviços", hubColor: "#27DEF2" },
  { kind: "divider" },
  { kind: "link", to: "/blog", label: "Blog" },
  { kind: "link", to: "/fale-conosco", label: "Fale conosco" },
];

function HeaderLogo({ size = 48, light = false }: { size?: number; light?: boolean }) {
  const { src } = useHubLogo();
  return (
    <img
      src={src}
      alt="Plan10"
      style={{
        height: size,
        width: "auto",
        objectFit: "contain",
        filter: light ? "brightness(0) invert(1)" : undefined,
      }}
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

function SolucoesDropdown() {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    timerRef.current = setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => () => cancelClose(), []);

  return (
    <div
      className="relative"
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      <Link
        to="/solucoes"
        className="group relative px-3 py-2 text-sm font-semibold transition flex items-center gap-1 whitespace-nowrap"
        style={{ color: "#1A1A1A" }}
        activeProps={{ style: { color: "#FF6B00" }, className: "underline underline-offset-4" }}
        onFocus={() => setOpen(true)}
      >
        <span className="group-hover:text-orange transition-colors">Soluções</span>
        <ChevronDown size={14} className="group-hover:text-orange transition-colors" />
        <span className="absolute bottom-0 left-3 right-6 h-0.5 origin-left scale-x-0 bg-orange transition-transform group-hover:scale-x-100" />
      </Link>
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full pt-2"
          style={{ zIndex: 60 }}
        >
          <div
            style={{
              minWidth: 280,
              background: "#FFFFFF",
              border: "1px solid #E8E8E8",
              borderRadius: 14,
              boxShadow: "0 16px 48px rgba(0,0,0,0.14)",
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Link
              to="/solucoes"
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "10px 12px",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: ".72rem",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#5A5A5A",
                textDecoration: "none",
                borderBottom: "1px solid #F0F0F0",
                marginBottom: 4,
              }}
            >
              Ver todas as Soluções
            </Link>
            {solutionsMenu.map((s) => (
              <Link
                key={s.slug}
                to="/solucoes/$solucao"
                params={{ solucao: s.slug }}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 8,
                  color: "#1A1A1A",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: ".92rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "background 150ms",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#F7F5F2"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: s.color,
                    flexShrink: 0,
                    boxShadow: `0 0 0 2px ${s.color}22`,
                  }}
                />
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}



export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileClosing, setMobileClosing] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  function handleLogoClick(e: React.MouseEvent) {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function closeMobile() {
    setMobileClosing(true);
    setTimeout(() => {
      setMobileOpen(false);
      setMobileClosing(false);
    }, 260);
  }

  // Escape to close mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMobile();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm"
        style={{ borderBottom: "1px solid #E8E8E8" }}
      >
        <div className="container-x flex h-20 items-center justify-between gap-4">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex-shrink-0 cursor-pointer"
            aria-label="Plan10, Home"
          >
            <HeaderLogo size={48} />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l, idx) => {
              // Insert Soluções dropdown right after "Quem somos"
              const items: React.ReactNode[] = [];
              items.push(
                <Link
                  key={`${l.to}-${l.label}`}
                  to={l.to}
                  className="group relative px-3 py-2 text-sm font-semibold transition flex items-center gap-1.5 whitespace-nowrap"
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
                </Link>,
              );
              if (l.label === "Quem somos") {
                items.push(<SolucoesDropdown key="solucoes-dropdown" />);
              }
              return <span key={`wrap-${idx}`} className="contents">{items}</span>;
            })}
          </nav>

          <div className="flex items-center gap-2 pr-1 md:pr-0">
            <button
              type="button"
              onClick={() => setSearchOpen((s) => !s)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-neutral-100 transition"
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>
            <Link to="/fale-conosco" className="hidden md:inline-flex flex-shrink-0">
              <Button variant="secondary" size="sm" className="whitespace-nowrap">Fale Conosco</Button>
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
        <div
          className="fixed inset-0 z-50 lg:hidden flex flex-col"
          style={{
            background: "#111111",
            animation: `${mobileClosing ? "slideOutRight" : "slideInRight"} 280ms cubic-bezier(0.4,0,0.2,1) forwards`,
          }}
        >
          <style>{`
            @keyframes slideInRight {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
              from { transform: translateX(0); opacity: 1; }
              to { transform: translateX(100%); opacity: 0; }
            }
          `}</style>

          <div className="flex items-center justify-between pt-5 px-6">
            <Link
              to="/"
              onClick={(e) => {
                handleLogoClick(e);
                closeMobile();
              }}
              aria-label="Plan10, Home"
              className="cursor-pointer"
            >
              <HeaderLogo size={36} light />
            </Link>
            <button
              type="button"
              onClick={closeMobile}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10"
              aria-label="Fechar menu"
            >
              <X size={26} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 mt-6">
            {mobileItems.map((item, i) => {
              if (item.kind === "divider") {
                return (
                  <div
                    key={`div-${i}`}
                    style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "4px 0" }}
                  />
                );
              }
              if (item.kind === "group") {
                return (
                  <div
                    key={`grp-${i}`}
                    style={{
                      padding: "16px 0 6px",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: ".72rem",
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    {item.label}
                  </div>
                );
              }
              if (item.kind === "solucao") {
                return (
                  <Link
                    key={`sol-${item.slug}`}
                    to="/solucoes/$solucao"
                    params={{ solucao: item.slug }}
                    onClick={closeMobile}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "11px 0 11px 12px",
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.85)",
                      textDecoration: "none",
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: item.color,
                        flexShrink: 0,
                      }}
                    />
                    {item.label}
                  </Link>
                );
              }
              const isActive = pathname === item.to;
              return (
                <Link
                  key={`${item.to}-${item.label}`}
                  to={item.to}
                  onClick={(e) => {
                    if (item.to === "/") handleLogoClick(e);
                    closeMobile();
                  }}
                  style={{
                    display: "block",
                    padding: "13px 0",
                    fontSize: "1.05rem",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "#FF6B00" : "rgba(255,255,255,0.85)",
                    textDecoration: "none",
                    transition: "color 150ms",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#FF6B00"; }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="px-6 pb-8">
            <a
              href={getWhatsAppUrl("default")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobile}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                width: "100%",
                padding: "14px",
                backgroundColor: "#25D366",
                color: "white",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "0.95rem",
              }}
            >
              <MessageCircle size={20} />
              Fale com nosso consultor
            </a>
          </div>
        </div>
      )}
    </>
  );
}
