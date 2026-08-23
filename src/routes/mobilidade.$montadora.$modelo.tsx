import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { findMobilidadeModel, modelsByMake } from "@/data/mobilidadeModels";
import { canonical } from "@/lib/seo";

const NAVY = "#143A61";
const GOLD = "#C9A83C";

export const Route = createFileRoute("/mobilidade/$montadora/$modelo")({
  loader: ({ params }) => {
    const m = findMobilidadeModel(params.montadora, params.modelo);
    if (!m) throw notFound();
    return m;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Modelo não encontrado" }, { name: "robots", content: "noindex" }] };
    const m = loaderData;
    const url = canonical(`/mobilidade/${params.montadora}/${params.modelo}`);
    const desc = (m.metaDescription || `${m.make} ${m.model}: ficha, proteção e aquisição.`).slice(0, 300);
    return {
      meta: [
        { title: `${m.seoTitle || `${m.make} ${m.model}`} | Plan10` },
        { name: "description", content: desc },
        { property: "og:title", content: `${m.make} ${m.model} | Plan10` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Plan10" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ModelPage,
  notFoundComponent: () => (
    <div style={{ padding: 80, textAlign: "center" }}>Modelo não encontrado.</div>
  ),
});

function ModelPage() {
  const m = Route.useLoaderData();
  const related = modelsByMake(m.makeSlug).filter((x) => x.modelSlug !== m.modelSlug).slice(0, 3);
  const paras = m.textoEditorial.split("\n").map((l) => l.trim()).filter(Boolean);

  return (
    <article className="pt-32 pb-20" style={{ background: "#F7F5F2" }}>
      <div className="container-x" style={{ maxWidth: 780 }}>
        <Link to="/mobilidade" className="inline-flex items-center gap-2 text-sm font-semibold mb-8" style={{ color: NAVY }}>
          <ArrowLeft size={16} /> Voltar para mobilidade
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", fontSize: ".74rem", color: "#8A8172" }}>
            {m.make}
          </span>
          {m.seloAltoValor && (
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", fontSize: ".64rem", color: GOLD, border: `1px solid ${GOLD}`, borderRadius: 20, padding: "2px 9px" }}>
              Alto padrão
            </span>
          )}
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "clamp(2rem, 4.5vw, 2.8rem)", lineHeight: 1.15, color: "#1A1A1A", margin: "0 0 8px" }}>
          {m.make} {m.model}
        </h1>
        <p className="text-sm text-neutral-500 mb-8">{m.segment}{m.anoModelo ? ` · ano-modelo ${m.anoModelo}` : ""}</p>

        <div
          className="rounded-[5px] mb-8"
          style={{ aspectRatio: "16 / 9", background: "#EFEBE3", border: "1px solid #E6E1D6", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: ".22em", textTransform: "uppercase", fontSize: ".68rem", color: GOLD }}>Plan10</span>
        </div>

        <aside style={{ background: "#fff", border: "1px solid #E6E1D6", borderLeft: `3px solid ${NAVY}`, borderRadius: 5, padding: "18px 22px", margin: "0 0 30px" }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", fontSize: ".72rem", color: NAVY, margin: "0 0 8px" }}>
            Ficha rápida
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.65, color: "#333", margin: 0 }}>{m.fichaRapida}</p>
        </aside>

        {paras.map((p, i) => (
          <p key={i} style={{ fontSize: "1.02rem", lineHeight: 1.75, color: "#333", margin: "0 0 18px" }}>{p}</p>
        ))}

        <div className="grid gap-4 sm:grid-cols-2" style={{ margin: "32px 0 0" }}>
          {m.blocoProtecao && (
            <section style={{ background: "#fff", border: "1px solid #E6E1D6", borderRadius: 6, padding: "20px 22px" }}>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", fontSize: ".7rem", color: "#2B6CB0", margin: "0 0 8px" }}>
                Proteção do bem
              </p>
              <p style={{ fontSize: ".95rem", lineHeight: 1.65, color: "#444", margin: 0 }}>{m.blocoProtecao}</p>
            </section>
          )}
          {m.blocoAquisicao && (
            <section style={{ background: "#fff", border: "1px solid #E6E1D6", borderRadius: 6, padding: "20px 22px" }}>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", fontSize: ".7rem", color: "#7B5BB5", margin: "0 0 8px" }}>
                Aquisição
              </p>
              <p style={{ fontSize: ".95rem", lineHeight: 1.65, color: "#444", margin: 0 }}>{m.blocoAquisicao}</p>
            </section>
          )}
        </div>

        <section style={{ background: "linear-gradient(150deg, #0C2340, #143A61)", color: "#fff", borderRadius: 8, padding: "32px 28px", margin: "36px 0 0", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "1.4rem", margin: "0 0 8px", color: "#fff" }}>
            Vai conquistar ou proteger um {m.model}?
          </h2>
          <p style={{ color: "rgba(255,255,255,.75)", maxWidth: "46ch", margin: "0 auto 20px" }}>
            Um consultor Plan10 ajuda a dimensionar a proteção e a melhor forma de aquisição para o seu caso.
          </p>
          <Link to="/fale-conosco" style={{ display: "inline-block", background: "#E05A20", color: "#fff", textDecoration: "none", fontWeight: 600, borderRadius: 9, padding: "13px 28px" }}>
            Falar com um consultor
          </Link>
        </section>

        {related.length > 0 && (
          <section style={{ marginTop: 48, borderTop: "1px solid #E6E1D6", paddingTop: 28 }}>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", fontSize: ".74rem", color: NAVY, margin: "0 0 16px" }}>
              Mais da {m.make}
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.modelSlug}
                  to="/mobilidade/$montadora/$modelo"
                  params={{ montadora: r.makeSlug, modelo: r.modelSlug }}
                  style={{ display: "block", background: "#fff", border: "1px solid #E6E1D6", borderRadius: 5, padding: "14px 16px", textDecoration: "none" }}
                >
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500, fontSize: "1rem", color: NAVY, display: "block" }}>{r.model}</span>
                  <span style={{ fontSize: ".8rem", color: "#777", display: "block", marginTop: 4 }}>{r.segment}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
