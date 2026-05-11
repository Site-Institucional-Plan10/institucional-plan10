import { useState } from "react";
import { Info } from "lucide-react";
import { verticals } from "@/data/verticals";
import { Button } from "@/components/ui/Button";
import { RedirectPopup } from "@/components/common/RedirectPopup";

export function OnlineContracting() {
  const [active, setActive] = useState(verticals[0].id);
  const [popup, setPopup] = useState<{ url: string; partner: string } | null>(null);
  const current = verticals.find((v) => v.id === active)!;

  return (
    <section className="section-y">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="font-eyebrow text-orange mb-3">Loja Virtual</p>
          <h2 className="font-h1 mb-4">Contratação Online</h2>
          <p className="text-neutral-700">
            Acesse diretamente os portais das nossas parceiras para contratar.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {verticals.map((v) => (
            <button
              key={v.id}
              onClick={() => setActive(v.id)}
              className="rounded-full px-5 py-2 text-sm font-semibold transition border-2"
              style={{
                borderColor: v.hubColor,
                backgroundColor: active === v.id ? v.hubColor : "transparent",
                color: active === v.id ? "#fff" : v.hubColor,
              }}
            >
              {v.name}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-2xl border border-dashed border-neutral-300 bg-white p-6">
              <div
                className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase mb-3"
                style={{ backgroundColor: `${current.hubColor}1A`, color: current.hubColor }}
              >
                {current.name}
              </div>
              <h3 className="font-semibold text-lg mb-2">Produto {n} — placeholder</h3>
              <p className="text-sm text-neutral-700 mb-5">
                {/* TODO: substituir por produto real do mapeamento */}
                Descrição breve do produto para contratação direta.
              </p>
              <Button
                variant="hub"
                hubColor={current.hubColor}
                size="sm"
                onClick={() => setPopup({ url: "https://example.com", partner: `Parceiro ${current.name}` })}
              >
                Contratar
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-xl bg-amber/10 border border-amber/30 p-4 text-sm text-neutral-700">
          <Info className="text-amber mt-0.5" size={18} />
          Os links de contratação direta serão ativados conforme mapeamento de produtos em andamento.
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
