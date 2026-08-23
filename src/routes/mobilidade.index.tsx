import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { mobilidadeModels, mobilidadeMakes } from "@/data/mobilidadeModels";
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/mobilidade/")({
  head: () => ({
    meta: [
      { title: "Mobilidade | Montadoras e modelos | Plan10" },
      { name: "description", content: "Biblioteca editorial de mobilidade da Plan10: montadoras, modelos, ficha rápida e o que considerar em proteção e aquisição." },
      { property: "og:title", content: "Mobilidade Plan10" },
      { property: "og:description", content: "Montadoras, modelos e leitura editorial de mobilidade." },
      { property: "og:url", content: canonical("/mobilidade") },
    ],
    links: [{ rel: "canonical", href: canonical("/mobilidade") }],
  }),
  component: MobilidadeHub,
});

const NAVY = "#143A61";
const GOLD = "#C9A83C";

function MobilidadeHub() {
  const [filter, setFilter] = useState<"todos" | "alto" | "volume">("todos");

  const models = useMemo(() => {
    if (filter === "alto") return mobilidadeModels.filter((m) => m.seloAltoValor);
    if (filter === "volume") return mobilidadeModels.filter((m) => !m.seloAltoValor);
    return mobilidadeModels;
  }, [filter]);

  const makes = useMemo(
    () => mobilidadeMakes.filter((mk) => models.some((m) => m.makeSlug === mk.slug)),
    [models],
  );

  return (
    <div style={{ background: "#F7F5F2" }}>
      <header className="pt-32 pb-12" style={{ background: "linear-gradient(160deg, #0C2340 0%, #143A61 100%)" }}>
        <div className="container-x">
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", fontSize: ".8rem", color: "#E8CA6A", margin: 0 }}>
            Crescimento e mobilidade
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "#fff", margin: "12px 0 8px" }}>
            Montadoras e modelos, com leitura de quem entende de proteção
          </h1>
          <p style={{ color: "rgba(255,255,255,.72)", maxWidth: "56ch", margin: 0 }}>
            Uma biblioteca editorial de mobilidade: a ficha de cada modelo e o que considerar na hora de proteger e de conquistar o bem.
          </p>
        </div>
      </header>

      <section className="py-6 sticky top-20 z-30 border-b" style={{ background: "#F7F5F2", borderColor: "#E6E1D6" }}>
        <div className="container-x flex flex-wrap gap-2">
          {([["todos", "Todos"], ["alto", "Alto padrão"], ["volume", "Linha de volume"]] as const).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className="rounded-full px-5 py-2 text-sm font-semibold transition border"
              style={{
                borderColor: filter === id ? NAVY : "#D8D2C6",
                backgroundColor: filter === id ? NAVY : "transparent",
                color: filter === id ? "#fff" : "#5A5A5A",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <div className="container-x" style={{ paddingTop: 40, paddingBottom: 72 }}>
        {makes.map((mk) => {
          const list = models.filter((m) => m.makeSlug === mk.slug);
          return (
            <section key={mk.slug} style={{ marginBottom: 44 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, borderBottom: "1px solid #E6E1D6", paddingBottom: 8, marginBottom: 18 }}>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "1.5rem", color: NAVY, margin: 0 }}>{mk.name}</h2>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: ".12em", textTransform: "uppercase", fontSize: ".72rem", color: "#8A8172" }}>
                  {list.length} {list.length === 1 ? "modelo" : "modelos"}
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {list.map((m) => (
                  <Link
                    key={m.modelSlug}
                    to="/mobilidade/$montadora/$modelo"
                    params={{ montadora: m.makeSlug, modelo: m.modelSlug }}
                    style={{ display: "block", background: "#fff", border: "1px solid #E6E1D6", borderRadius: 6, padding: "18px 20px", textDecoration: "none", transition: "border-color .2s ease" }}
                    className="hover:border-[#143A61]"
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "1.2rem", color: "#1A1A1A" }}>{m.model}</span>
                      {m.seloAltoValor && (
                        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", fontSize: ".62rem", color: GOLD, border: `1px solid ${GOLD}`, borderRadius: 20, padding: "2px 8px", whiteSpace: "nowrap" }}>
                          Alto padrão
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: ".86rem", color: "#777", margin: "4px 0 0" }}>{m.segment}{m.anoModelo ? ` · ${m.anoModelo}` : ""}</p>
                    <p style={{ fontSize: ".9rem", color: "#555", margin: "10px 0 0", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {m.fichaRapida}
                    </p>
                    <span style={{ display: "inline-block", marginTop: 12, fontWeight: 600, fontSize: ".85rem", color: NAVY }}>Ver o modelo →</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
