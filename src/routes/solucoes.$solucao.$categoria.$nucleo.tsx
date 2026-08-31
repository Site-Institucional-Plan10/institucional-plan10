import { useMemo, useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { findNucleo, type Solucao, type Categoria, type Nucleo, type Product } from "@/data/solutions";
import { PageTheme } from "@/components/plan10/PageTheme";
import { PerfilToggle } from "@/components/plan10/PerfilToggle";
import { ProductCard } from "@/components/plan10/ProductCard";
import { ProductChooser } from "@/components/plan10/ProductChooser";
import { LeadForm } from "@/components/plan10/LeadForm";

import { FONTS, whatsappUrl, aberturaLimpa } from "@/lib/plan10";
import { finContentFor } from "@/data/financasContent";
import { heroCategoria, heroNucleo, contextoDe, pickByOrder } from "@/lib/imagery";
import { finNucleoImgs } from "@/lib/financasImagery";
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
    const desc = (aberturaLimpa(n.aberturaConsultiva) || n.porque || s.subHero).slice(0, 300);
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

  // Produto que abriu a escolha de caminho, e o que ficou marcado no formulário.
  const [escolhendo, setEscolhendo] = useState<Product | null>(null);
  const [produtoNoForm, setProdutoNoForm] = useState("");

  const cross = useMemo(
    () => Array.from(new Set(n.products.flatMap((p) => p.crossSelling))).slice(0, 2),
    [n],
  );

  // Cada modalidade recebe fotos próprias: a posição na lista separa as irmãs, e
  // a foto da categoria fica bloqueada para o produto não repetir a página de cima.
  const iCat = Math.max(0, s.categorias.findIndex((x) => x.slug === c.slug));
  const iNuc = Math.max(0, c.nucleos.findIndex((x) => x.slug === n.slug));
  // A página de produto não pode repetir NENHUMA foto da página de modalidade (pai).
  // Recalculo as duas fotos do pai e as bloqueio no hero e no contexto do filho,
  // então as quatro imagens das duas telas são sempre distintas.
  const finImgs = s.slug === "financeiras" ? finNucleoImgs(c.slug, n.slug) : null;
  const catHero = heroCategoria(s.slug, iCat);
  const catCtx = contextoDe(s.slug, iCat, catHero.src);
  const hero = finImgs?.hero ?? heroNucleo(s.slug, iCat, iNuc, [catHero.src, catCtx.src]);
  const ctx = finImgs?.ctx ?? pickByOrder(s.slug, iCat + iNuc, 3, [catHero.src, catCtx.src, hero.src]);

  const scrollTo = (id: string) => {
    if (typeof document === "undefined") return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  function irParaFormulario(produtoNome: string) {
    setProdutoNoForm(produtoNome);
    // Espera o modal fechar para o scroll não competir com o overflow travado.
    setTimeout(() => scrollTo("contato"), 60);
  }

  return (
    <PageTheme slug={s.slug}>
      {/* Hero */}
      <header className="p10-hero has-img">
        <div className="p10-hero-bg" aria-hidden>
          <img src={hero.src} alt="" loading="eager" />
        </div>
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

      {/* Opções disponíveis: grade compacta, logo abaixo do hero */}
      <section className="sec" id="opcoes">
        <div className="wrap">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 8 }}>
            <div>
              <p className="eyebrow" style={{ color: "var(--vp)" }}>Opções disponíveis</p>
              <h2 className="p10-h2" style={{ marginBottom: 0 }}>Escolha a opção certa para o seu momento</h2>
            </div>
            {temPF && temPJ && <PerfilToggle value={perfil} onChange={setPerfil} />}
          </div>
          <p className="p10-lede" style={{ margin: "0 0 22px" }}>
            {filtered.length > 0
              ? `${filtered.length} ${filtered.length === 1 ? "opção" : "opções"}. Escolha uma para falar com um consultor.`
              : "As opções deste perfil ficam disponíveis por consultoria."}
          </p>
          {filtered.length === 0 ? (
            <a href={whatsappUrl(`Olá! Quero orientação sobre ${n.nome}.`)} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
              Falar com um consultor
            </a>
          ) : (
            <div className="prod-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} nucleoNome={n.nome} onPrimary={() => setEscolhendo(p)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contexto: abertura consultiva + imagem (um único apoio visual) */}
      <section className="sec sec-alt">
        <div className="wrap p10-split">
          <div>
            <p className="eyebrow" style={{ color: "var(--vp)" }}>Sobre esta escolha</p>
            <p style={{ fontFamily: "var(--fd)", fontSize: "clamp(1.25rem, 2.3vw, 1.7rem)", lineHeight: 1.38, fontWeight: 500, color: "var(--preto)", letterSpacing: "-.015em", margin: "12px 0 0" }}>
              {finContentFor(c.slug)?.subHero ?? aberturaLimpa(n.aberturaConsultiva)}
            </p>
          </div>
          <figure className="p10-fig">
            <img src={ctx.src} alt={ctx.alt} loading="lazy" />
          </figure>
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
          <LeadForm
            interesse={n.nome}
            perfilInicial={perfil}
            contexto={`${s.nome} › ${n.nome}`}
            produtos={n.products.map((p) => p.nome)}
            produtoSelecionado={produtoNoForm}
            onProdutoChange={setProdutoNoForm}
            origem={`/solucoes/${s.slug}/${c.slug}/${n.slug}`}
          />
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

      <ProductChooser
        produto={escolhendo}
        nucleoNome={n.nome}
        onClose={() => setEscolhendo(null)}
        onFormulario={irParaFormulario}
      />
    </PageTheme>
  );
}
