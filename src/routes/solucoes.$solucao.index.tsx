import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useRolarAteTrilha } from "@/lib/rolagem";
import { findSolucao, type Solucao } from "@/data/solutions";
import { Route as SolucaoRoute } from "./solucoes.$solucao";
import { PageTheme, logoFor } from "@/components/plan10/PageTheme";
import { heroSolucao, contextoDe } from "@/lib/imagery";
import { FIN_HUB } from "@/lib/financasImagery";
import { canonical } from "@/lib/seo";
import { Sanfonas } from "@/components/solucoes/Sanfonas";
import { VERTICAIS, verticalPorHub } from "@/lib/verticais";
import { whatsappUrl } from "@/lib/plan10";

export const Route = createFileRoute("/solucoes/$solucao/")({
  loader: ({ params }): { solucao: Solucao } => {
    const s = findSolucao(params.solucao);
    if (!s) throw notFound();
    return { solucao: s };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const s = loaderData.solucao;
    const url = canonical(`/solucoes/${s.slug}`);
    return {
      meta: [
        { title: `${s.nome} | Plan10` },
        { name: "description", content: s.subHero },
        { property: "og:title", content: `${s.nome} | Plan10` },
        { property: "og:description", content: s.subHero },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Plan10" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: SolucaoPage,
});

function SolucaoPage() {
  const { solucao } = SolucaoRoute.useLoaderData() as { solucao: Solucao };
  const { abrir } = SolucaoRoute.useSearch();
  // com um link apontando para uma sanfona, a descida até a trilha sai de cena:
  // quem manda na rolagem é o destino pedido, e duas rolagens juntas brigam
  useRolarAteTrilha(solucao.slug, !abrir);

  // Financeiro tem imagens temáticas próprias; as demais soluções seguem o pool.
  const heroImg = solucao.slug === "financeiras" ? FIN_HUB.hero : heroSolucao(solucao.slug);
  const ctxImg =
    solucao.slug === "financeiras" ? FIN_HUB.ctx : contextoDe(solucao.slug, 0, heroImg.src, solucao.slug);
  const logo = logoFor(solucao.slug);
  const estaFrente = verticalPorHub(solucao.slug);
  const outrasFrentes = VERTICAIS.filter((v) => v.hub !== solucao.slug);

  return (
    <PageTheme slug={solucao.slug}>
      <header className="p10-hero has-img">
        <div className="p10-hero-bg" aria-hidden>
          <img src={heroImg.src} alt="" loading="eager" />
        </div>
        <div className="p10-hero-inner">
          {logo && <img src={logo} alt={`Logo ${solucao.nome}`} className="p10-hero-logo" />}
          <h1>{solucao.nome}</h1>
          <p className="lede">{solucao.hero}</p>
          <p className="lede sub">{solucao.subHero}</p>
        </div>
      </header>

      <nav className="p10-crumb" aria-label="Trilha" data-trilha>
        <div className="p10-crumb-inner">
          <Link to="/solucoes">Soluções</Link>
          <span className="sep">/</span>
          <span className="current">{solucao.nome}</span>
        </div>
      </nav>

      <Sanfonas solucao={solucao} abrir={abrir} />

      {/* Contexto: abertura consultiva + imagem editorial */}
      <section className="sec sec-alt">
        <div className="wrap p10-split">
          <p
            style={{
              fontFamily: "var(--fd)",
              fontSize: "clamp(1.35rem, 2.6vw, 2rem)",
              lineHeight: 1.3,
              fontWeight: 500,
              color: "var(--preto)",
              letterSpacing: "-.015em",
              margin: 0,
            }}
          >
            {solucao.aberturaConsultiva}
          </p>
          <figure className="p10-fig">
            <img src={ctxImg.src} alt={ctxImg.alt} loading="lazy" />
          </figure>
        </div>
      </section>

      {/* Próximo passo: o consultor e as outras quatro frentes */}
      <section className="sec sec-dark" aria-labelledby="passo-h">
        <div className="wrap" style={{ display: "grid", gap: 30 }}>
          <div>
            <h2 className="p10-h2" id="passo-h">
              Próximo passo
            </h2>
            <p className="p10-lede">
              Traga o seu momento para um consultor da Plan10. A conversa serve para entender o
              contexto e apontar o caminho com critério; a decisão fica com você.
            </p>
          </div>
          <a
            className="btn btn-primary"
            style={{ justifySelf: "start" }}
            href={whatsappUrl(
              `Olá! Quero falar com um consultor sobre ${estaFrente?.label ?? solucao.nome}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar com um consultor →
          </a>
          <div style={{ borderTop: "1px solid rgba(244,240,232,.16)", paddingTop: 24 }}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>
              Também pode fazer sentido
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {outrasFrentes.map((v) => (
                <Link
                  key={v.id}
                  to="/solucoes/$solucao"
                  params={{ solucao: v.hub }}
                  style={{
                    fontFamily: "var(--fb)",
                    fontSize: ".9rem",
                    fontWeight: 600,
                    color: "#F4F0E8",
                    textDecoration: "none",
                    border: "1px solid rgba(244,240,232,.26)",
                    borderRadius: 999,
                    padding: "9px 17px",
                  }}
                >
                  {v.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTheme>
  );
}
