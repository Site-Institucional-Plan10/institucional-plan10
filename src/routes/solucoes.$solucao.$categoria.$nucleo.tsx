import { useMemo, useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { findNucleo, type Solucao, type Categoria, type Nucleo } from "@/data/solutions";
import { PageTheme } from "@/components/plan10/PageTheme";
import { PerfilToggle } from "@/components/plan10/PerfilToggle";
import { ProductCard } from "@/components/plan10/ProductCard";
import { LeadForm } from "@/components/plan10/LeadForm";
import { ImageSlot } from "@/components/plan10/ImageSlot";

import { FONTS, whatsappUrl } from "@/lib/plan10";
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/solucoes/$solucao/$categoria/$nucleo")({
  loader: ({ params }) => {
    const found = findNucleo(params.solucao, params.categoria, params.nucleo);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Não encontrado" }, { name: "robots", content: "noindex" }] };
    const { solucao: s, categoria: c, nucleo: n } = loaderData;
    const url = canonical(`/solucoes/${s.slug}/${c.slug}/${n.slug}`);
    // n.hero é vazio de propósito; a abertura consultiva é a descrição real.
    const desc = (n.aberturaConsultiva || n.porque || s.subHero).slice(0, 300);
    return {
      meta: [
        { title: `${n.nome} | ${c.nome} | Plan10` },
        { name: "description", content: desc },
        { property: "og:title", content: `${n.nome} | ${s.nome} | Plan10` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Plan10" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: NucleoPage,
  notFoundComponent: () => (
    <div style={{ padding: 80, textAlign: "center", fontFamily: FONTS.body }}>Página não encontrada.</div>
  ),
});

function NucleoPage() {
  const { solucao: s, categoria: c, nucleo: n } = Route.useLoaderData() as {
    solucao: Solucao;
    categoria: Categoria;
    nucleo: Nucleo;
  };
  // Quase metade das modalidades tem opções de um perfil só. Abrir sempre em PF
  // deixaria a página vazia nessas. O padrão passa a ser o perfil que existe.
  const temPF = useMemo(() => n.products.some((p) => p.perfil === "PF"), [n]);
  const temPJ = useMemo(() => n.products.some((p) => p.perfil === "PJ"), [n]);
  const [perfil, setPerfil] = useState<"PF" | "PJ">(temPF ? "PF" : "PJ");
  const filtered = useMemo(() => n.products.filter((p) => p.perfil === perfil), [n, perfil]);
  
  const cross = useMemo(
    () => Array.from(new Set(n.products.flatMap((p) => p.crossSelling))).slice(0, 2),
    [n],
  );

  const scrollTo = (id: string) => {
    if (typeof document === "undefined") return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PageTheme slug={s.slug}>
      {/* Hero */}
      <header className="p10-hero">
        <div className="p10-hero-inner">
          <p className="eyebrow">{c.nome}</p>
          <h1>{n.nome}</h1>
          {n.hero && <p className="lede">{n.hero}</p>}
          {n.blocoValor.length > 0 && (
            <div className="pills" style={{ marginTop: 6 }}>
              {n.blocoValor.map((b) => (
                <span key={b} className="pill">{b}</span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="p10-crumb" aria-label="Trilha">
        <div className="p10-crumb-inner">
          <Link to="/solucoes">Soluções</Link>
          <span className="sep">/</span>
          <Link to="/solucoes/$solucao" params={{ solucao: s.slug }}>{s.nome}</Link>
          <span className="sep">/</span>
          <Link to="/solucoes/$solucao/$categoria" params={{ solucao: s.slug, categoria: c.slug }}>{c.nome}</Link>
          <span className="sep">/</span>
          <span className="current">{n.nome}</span>
        </div>
      </nav>

      {/* Abertura consultiva */}
      <section className="sec">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <p className="eyebrow" style={{ color: "var(--vp)" }}>Abertura consultiva</p>
          <p className="p10-lede" style={{ fontSize: "1.05rem", color: "var(--preto)" }}>{n.aberturaConsultiva}</p>
        </div>
      </section>

      {/* Imagem de contexto do núcleo, a inserir depois da construção */}
      <section className="sec">
        <div className="wrap">
          <ImageSlot ratio="16 / 9" label={`Contexto de ${n.nome}`} hint={`Situação de uso de ${n.nome.toLowerCase()}. Tom premium, coerente com a solução ${s.nome}.`} />
        </div>
      </section>

      {/* Toggle + Produtos */}
      <section className="sec sec-alt" id="opcoes">
        <div className="wrap">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
            <div>
              <p className="eyebrow" style={{ color: "var(--vp)" }}>Opções disponíveis</p>
              <h2 className="p10-h2">
                {temPF && temPJ ? "Para você ou para empresa" : temPF ? "Para você" : "Para empresa"}
              </h2>
            </div>
            {temPF && temPJ && <PerfilToggle value={perfil} onChange={setPerfil} />}
          </div>
          <p style={{ fontFamily: "var(--fl)", fontSize: ".75rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ctxt)", margin: "0 0 6px" }}>
            {filtered.length} {filtered.length === 1 ? "opção" : "opções"} para {perfil === "PF" ? "você" : "empresa"}
          </p>
          {filtered.length >= 2 && (
            <p style={{ fontFamily: "var(--fb)", fontSize: ".92rem", color: "var(--ctxt)", margin: "0 0 16px" }}>
              Compare as opções lado a lado e escolha com critério.
            </p>
          )}
          {filtered.length === 0 ? (
            <p style={{ fontFamily: "var(--fb)", color: "var(--ctxt)" }}>
              As opções deste perfil ficam disponíveis por consultoria. Fale com um consultor.
            </p>
          ) : (
            <div className="prod-list">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} nucleoNome={n.nome} onPrimary={() => scrollTo("contato")} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Como escolher + fechamento */}
      <section className="sec">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <p className="eyebrow" style={{ color: "var(--vp)" }}>Como escolher</p>
          <p style={{ fontFamily: "var(--fd)", fontSize: "clamp(1.35rem, 2.4vw, 1.8rem)", lineHeight: 1.35, fontWeight: 500, color: "var(--preto)", margin: "10px 0 0" }}>
            {n.porque}
          </p>
          {n.fechamento && (
            <p style={{ fontFamily: "var(--fb)", fontSize: "1rem", lineHeight: 1.65, color: "var(--ctxt)", margin: "20px 0 0", paddingTop: 18, borderTop: "1px solid var(--c2)" }}>
              {n.fechamento}
            </p>
          )}
        </div>
      </section>

      {/* Formulário em seção escura */}
      <section className="sec sec-dark" id="contato">
        <div className="wrap" style={{ display: "grid", gap: 32, gridTemplateColumns: "1fr", alignItems: "start" }}>
          <div>
            <p className="eyebrow">Fale com a Plan10</p>
            <h2 className="p10-h2">Um consultor retorna com o próximo passo</h2>
            <p className="p10-lede">Conte seu momento. A resposta é orientada, sem excesso comercial.</p>
          </div>
          <LeadForm interesse={n.nome} perfilInicial={perfil} contexto={`${s.nome} › ${n.nome}`} origem={`/solucoes/${s.slug}/${c.slug}/${n.slug}`} />
        </div>
      </section>

      {/* Cross-selling */}
      {cross.length > 0 && (
        <section className="sec sec-alt">
          <div className="wrap">
            <p className="eyebrow" style={{ color: "var(--vp)" }}>Conexões próximas</p>
            <h2 className="p10-h2" style={{ marginBottom: 16 }}>Também pode fazer sentido</h2>
            <div className="cross">
              {cross.map((cs) => (
                <a
                  key={cs}
                  href={whatsappUrl(`Olá! Também tenho interesse em ${cs}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cs}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageTheme>
  );
}
