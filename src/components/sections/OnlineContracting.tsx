import { useState } from "react";
import { Info } from "lucide-react";
import { verticals } from "@/data/verticals";
import { RedirectPopup } from "@/components/common/RedirectPopup";
import { cn } from "@/lib/utils";

export function OnlineContracting() {
  const [active, setActive] = useState(verticals[0].id);
  const [popup, setPopup] = useState<{ url: string; partner: string } | null>(null);
  const current = verticals.find((v) => v.id === active)!;

  return (
    <section className="py-24 bg-ink text-white">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="font-eyebrow text-orange mb-3">Loja Virtual</p>
          <h2 className="font-h1 text-white mb-4" style={{ fontWeight: 800 }}>
            Contratação Online
          </h2>
          <p className="text-white/70 leading-[1.7]">
            Acesse diretamente os portais das nossas parceiras.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {verticals.map((v) => {
            const isActive = active === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setActive(v.id)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 border",
                )}
                style={{
                  borderColor: v.hubColor,
                  backgroundColor: isActive ? v.hubColor : "transparent",
                  color: isActive ? "#fff" : v.hubColor,
                }}
              >
                {v.name}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="rounded-2xl p-6 transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.10)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.24)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              }}
            >
              <div
                className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase mb-3"
                style={{ backgroundColor: `${current.hubColor}33`, color: current.hubColor }}
              >
                {current.name}
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">Produto {n}</h3>
              <p className="text-sm text-white/70 mb-5 leading-[1.7]">
                {/* TODO: substituir por produto real do mapeamento */}
                Descrição breve do produto para contratação direta.
              </p>
              <button
                onClick={() => setPopup({ url: "https://example.com", partner: `Parceiro ${current.name}` })}
                className="inline-flex items-center justify-center rounded-xl border-2 border-white px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink"
              >
                Contratar
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-start gap-3 rounded-xl border border-amber/40 bg-amber/10 p-4 text-sm text-amber">
          <Info className="mt-0.5 flex-shrink-0" size={18} />
          Os links de contratação serão ativados conforme mapeamento de produtos em andamento.
        </div>
      </div>

      <RedirectPopup
        isOpen={!!popup}
        onClose={() => setPopup(null)}
        targetUrl={popup?.url || ""}
        partnerName={popup?.partner || ""}
      />
    </section>
  );
}
