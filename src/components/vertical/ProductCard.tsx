import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";

interface ProductCardProps {
  name: string;
  description: string;
  category: string;
  hubColor: string;
}

export function ProductCard({ name, description, category, hubColor }: ProductCardProps) {
  const message = `Olá! Tenho interesse no produto "${name}". Gostaria de receber uma proposta.`;
  const baseUrl = getWhatsAppUrl(category);
  const href = `${baseUrl.split("?")[0]}?text=${encodeURIComponent(message)}`;

  return (
    <div
      className="transition-all duration-200"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxSizing: "border-box",
        background: "#FFFFFF",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        border: "1px solid #F0F0F0",
        borderTop: `3px solid ${hubColor}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
      }}
    >
      <div
        style={{
          padding: "18px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <h3 style={{ fontWeight: 700, fontSize: "0.92rem", color: "#1A1A1A", lineHeight: 1.3, margin: 0 }}>
          {name}
        </h3>
        <p style={{ fontSize: "0.8rem", color: "#666", lineHeight: 1.6, margin: 0, flex: 1 }}>
          {description}
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200"
          style={{ background: "#FF6B00", marginTop: 4 }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#E05A00")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#FF6B00")}
        >
          <MessageCircle size={16} />
          Solicitar proposta
        </a>
      </div>
    </div>
  );
}
