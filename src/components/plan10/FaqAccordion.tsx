import { useState } from "react";
import { FONTS } from "@/lib/plan10";

export function FaqAccordion({
  items,
  accent,
}: {
  items: { q: string; a: string }[];
  accent: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  if (!items.length) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            style={{
              borderRadius: 8,
              border: "1px solid rgba(246,241,231,0.14)",
              background: "rgba(246,241,231,0.03)",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "18px 22px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#F6F1E7",
                fontFamily: FONTS.body,
                fontSize: "1rem",
                fontWeight: 500,
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
                alignItems: "center",
              }}
            >
              <span>{it.q}</span>
              <span style={{ color: accent, fontSize: "1.4rem", lineHeight: 1 }}>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div
                style={{
                  padding: "0 22px 20px",
                  fontFamily: FONTS.body,
                  fontSize: "0.95rem",
                  lineHeight: 1.65,
                  color: "rgba(246,241,231,0.82)",
                }}
              >
                {it.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
