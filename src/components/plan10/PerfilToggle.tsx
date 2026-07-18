import { FONTS } from "@/lib/plan10";

interface Props {
  value: "PF" | "PJ";
  onChange: (v: "PF" | "PJ") => void;
  accent: string;
}

export function PerfilToggle({ value, onChange, accent }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Perfil"
      style={{
        display: "inline-flex",
        padding: 4,
        borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.15)",
        background: "rgba(255,255,255,0.04)",
        fontFamily: FONTS.eyebrow,
      }}
    >
      {(["PF", "PJ"] as const).map((k) => {
        const active = value === k;
        return (
          <button
            key={k}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(k)}
            style={{
              padding: "10px 20px",
              borderRadius: 6,
              fontSize: "0.82rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 600,
              cursor: "pointer",
              background: active ? accent : "transparent",
              color: active ? "#10141A" : "rgba(246,241,231,0.75)",
              border: "none",
              transition: "all 160ms ease",
            }}
          >
            {k === "PF" ? "Para você" : "Para empresa"}
          </button>
        );
      })}
    </div>
  );
}
