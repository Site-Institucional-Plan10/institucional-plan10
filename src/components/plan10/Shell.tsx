import { Link } from "@tanstack/react-router";
import { FONTS } from "@/lib/plan10";
import type { SolucaoCor } from "@/data/solutions";

export function Plan10Section({
  cor,
  children,
  style,
}: {
  cor: SolucaoCor;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <section
      style={{
        background: cor.bg,
        color: "#F6F1E7",
        fontFamily: FONTS.body,
        ...style,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(48px, 8vw, 96px) clamp(20px, 4vw, 40px)",
        }}
      >
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <p
      style={{
        fontFamily: FONTS.eyebrow,
        fontSize: "0.78rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color,
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

export function Display({ children }: { children: React.ReactNode }) {
  return (
    <h1
      style={{
        fontFamily: FONTS.display,
        fontSize: "clamp(2rem, 5vw, 3.4rem)",
        lineHeight: 1.1,
        letterSpacing: "-0.01em",
        fontWeight: 500,
        margin: 0,
        color: "#F6F1E7",
      }}
    >
      {children}
    </h1>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: FONTS.display,
        fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
        lineHeight: 1.15,
        fontWeight: 500,
        margin: 0,
        color: "#F6F1E7",
      }}
    >
      {children}
    </h2>
  );
}

export function Breadcrumb({ items }: { items: { label: string; to?: string; params?: Record<string, string> }[] }) {
  return (
    <nav
      aria-label="Trilha"
      style={{
        fontFamily: FONTS.eyebrow,
        fontSize: "0.75rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "rgba(246,241,231,0.6)",
        marginBottom: 24,
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      {items.map((it, i) => (
        <span key={i} style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
          {it.to ? (
            <Link to={it.to} params={it.params} style={{ color: "inherit", textDecoration: "none" }}>
              {it.label}
            </Link>
          ) : (
            <span style={{ color: "#F6F1E7" }}>{it.label}</span>
          )}
          {i < items.length - 1 && <span style={{ opacity: 0.5 }}>/</span>}
        </span>
      ))}
    </nav>
  );
}

export function Pill({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "8px 14px",
        borderRadius: 999,
        border: `1px solid ${color}`,
        color: "#F6F1E7",
        fontFamily: FONTS.eyebrow,
        fontSize: "0.72rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: color,
          marginRight: 10,
        }}
      />
      {children}
    </span>
  );
}
