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
      className="flex flex-col overflow-hidden rounded-2xl bg-white border border-neutral-200 transition-all duration-200"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
      }}
    >
      {/* Image slot, placeholder for future photo */}
      <div
        className="w-full flex items-center justify-center"
        style={{
          aspectRatio: "16 / 10",
          background: `linear-gradient(135deg, ${hubColor}14 0%, ${hubColor}26 100%)`,
        }}
      >
        <span
          className="text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: `${hubColor}99` }}
        >
          IMAGEM DO PRODUTO
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-semibold text-base text-ink mb-2 leading-snug">{name}</h3>
        <p className="text-sm text-neutral-700 mb-5 flex-1 leading-relaxed">{description}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200"
          style={{ background: "#FF6B00" }}
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
