import { useEffect, useMemo, useRef, useState } from "react";
import { useRolarAteTrilha } from "@/lib/rolagem";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  findNucleo,
  type Solucao,
  type Categoria,
  type Nucleo,
  type Product,
} from "@/data/solutions";
import { PageTheme } from "@/components/plan10/PageTheme";
import { ItemSolucao, ESTILO_SOLUCAO, publicoDe as publico } from "@/components/solucoes/ItemSolucao";
import { useRolagemAgendada } from "@/lib/rolarAteSolucao";
import { criteriosDoCaminho } from "@/components/solucoes/Sanfonas";
import { EstiloFavoritar } from "@/components/favoritos/BotaoFavoritar";
import { usarPerfil } from "@/lib/perfilPublico";
import { LeadForm } from "@/components/plan10/LeadForm";

import { FONTS, whatsappUrl, aberturaLimpa, frentesConectadas, faqDoCaminho } from "@/lib/plan10";
import { FaqAccordion } from "@/components/plan10/FaqAccordion";
import { finContentFor } from "@/data/financasContent";
import { heroCategoria, heroNucleo, contextoDe, pickByOrder } from "@/lib/imagery";
import { finNucleoImgs, finProdutoImg } from "@/lib/financasImagery";
import { canonical } from "@/lib/seo";
import { dim } from "@/lib/dimensoes";
import { fotoDeContexto, fotoDoTema } from "@/lib/temasImagery";

export const Route = createFileRoute("/solucoes/$solucao/$categoria/$nucleo")({
  loader: ({ params }) => {
    const found = findNucleo(params.solucao, params.categoria, params.nucleo);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Não encontrado" }, { name: "robots", content: "noindex" }] };
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
    <div style={{ padding: 80, textAlign: "center", fontFamily: FONTS.body }}>
      Página não encontrada.
    </div>
  ),
});

function NucleoPage() {
  const {
    solucao: s,
    categoria: c,
    nucleo: n,
  } = Route.useLoaderData() as {
    solucao: Solucao;
    categoria: Categoria;
    nucleo: Nucleo;
  };
  // Quase metade das modalidades tem opções de um perfil só. Abrir sempre em PF
  // deixaria a página vazia nessas. O padrão passa a ser o perfil que existe.
  /**
   * Link que nomeia uma solução manda na rolagem.
   *
   * A descida automática até a trilha é para quem chega à página sem destino
   * dentro dela. Com hash a pessoa pediu uma solução específica, e duas
   * rolagens ao mesmo tempo terminam numa briga de quadro contra quadro.
   */
  const [veioComHash] = useState(
    () => typeof window !== "undefined" && window.location.hash.length > 1,
  );
  useRolarAteTrilha(`${s.slug}/${c.slug}/${n.slug}`, !veioComHash);

  /**
   * O público é o mesmo do site inteiro, não uma escolha desta página.
   *
   * Antes aqui havia um par PF/PJ próprio que abria em PF e escondia metade do
   * catálogo do caminho antes de a pessoa pedir qualquer coisa. Agora o
   * controle é o mesmo das sanfonas da vertical, com "Todos os perfis" entre as
   * opções, e quem chega por link não encontra nada escondido.
   */
  const temPF = useMemo(() => n.products.some((p) => p.perfil === "PF"), [n]);
  const temPJ = useMemo(() => n.products.some((p) => p.perfil === "PJ"), [n]);
  const { perfil, definirPerfil, pronto } = usarPerfil();
  const visiveis = useMemo(
    () => n.products.filter((p) => perfil === "todos" || publico(p.perfil) === perfil),
    [n, perfil],
  );
  // o filtro não pode esvaziar a página de um caminho que tem solução: se a
  // preferência guardada não cabe aqui, ela cede, como já cede nas sanfonas
  useEffect(() => {
    if (pronto && visiveis.length === 0 && n.products.length > 0 && perfil !== "todos") {
      definirPerfil("todos");
    }
  }, [pronto, visiveis.length, n.products.length, perfil, definirPerfil]);

  const criterios = useMemo(() => criteriosDoCaminho(n.porque), [n]);
  const [produtoNoForm, setProdutoNoForm] = useState("");

  /**
   * A solução que o endereço nomeia já chega aberta.
   *
   * O item pode estar fora da tela porque o filtro de público o escondeu, e
   * nesse caso o efeito acima devolve o filtro para "todos" e este roda de
   * novo no quadro seguinte, quando o item já existe.
   */
  const hashAtendido = useRef("");
  const agendarRolagem = useRolagemAgendada();
  useEffect(() => {
    if (!pronto || typeof window === "undefined") return;
    const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (!hash || hashAtendido.current === hash) return;
    const item = document.getElementById(hash);
    if (!item) return;

    hashAtendido.current = hash;
    const detalhe = item.querySelector<HTMLDetailsElement>("details.sf-mais");
    if (detalhe) detalhe.open = true;

    agendarRolagem(
      () => item,
      () => detalhe?.querySelector("summary")?.focus({ preventScroll: true }),
    );
  }, [pronto, visiveis, agendarRolagem]);

  const cross = useMemo(
    () => Array.from(new Set(n.products.flatMap((p) => p.crossSelling))).slice(0, 2),
    [n],
  );

  // FAQ do caminho: vem do catálogo, sem as respostas repetidas entre produtos
  const faq = useMemo(() => faqDoCaminho(n.nome, n.products), [n]);

  // frentes citadas nas frases de cross-selling, sem repetir o nome do produto
  const frentes = useMemo(() => frentesConectadas(cross), [cross]);

  // Cada modalidade recebe fotos próprias: a posição na lista separa as irmãs, e
  // a foto da categoria fica bloqueada para o produto não repetir a página de cima.
  const iCat = Math.max(
    0,
    s.categorias.findIndex((x) => x.slug === c.slug),
  );
  const iNuc = Math.max(
    0,
    c.nucleos.findIndex((x) => x.slug === n.slug),
  );
  /**
   * As fotos do caminho saem do assunto da categoria, não do acervo de clima.
   *
   * Antes a regra evitava repetir qualquer foto da página mãe, e para isso
   * sorteava do acervo antigo. O resultado era foto fora de assunto: safra e
   * produção abria com uma pirâmide de vidro, que foi o que o Carlos marcou.
   *
   * Agora o caminho usa as duas fotos de assunto que a categoria já tem, com
   * as posições trocadas: o que é banner na categoria vira apoio aqui, e
   * vice-versa. As duas falam do assunto certo e as telas não ficam iguais.
   *
   * Finanças continua com o módulo próprio, que já tem foto por caminho. Se
   * uma categoria não estiver no mapa de assunto, cai no acervo antigo, como
   * antes, sem quebrar página nenhuma.
   */
  const finImgs = s.slug === "financeiras" ? finNucleoImgs(c.slug, n.slug) : null;
  const chaveCat = `${s.slug}/${c.slug}`;
  const temaCat = fotoDoTema(chaveCat);
  const ctxCat = fotoDeContexto(chaveCat);
  const catHero = heroCategoria(s.slug, iCat, c.slug);
  const catCtx = contextoDe(s.slug, iCat, catHero.src, chaveCat);
  const hero =
    finImgs?.hero ?? ctxCat ?? heroNucleo(s.slug, iCat, iNuc, [catHero.src, catCtx.src]);
  const ctx =
    finImgs?.ctx ??
    temaCat ??
    pickByOrder(s.slug, iCat + iNuc, 3, [catHero.src, catCtx.src, hero.src]);

  const scrollTo = (id: string) => {
    if (typeof document === "undefined") return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  function irParaFormulario(produtoNome: string) {
    setProdutoNoForm(produtoNome);
    scrollTo("contato");
  }

  return (
    <PageTheme slug={s.slug}>
      {/* Hero */}
      <header className="p10-hero has-img">
        <div className="p10-hero-bg" aria-hidden>
          <img src={hero.src} alt="" {...dim(hero.src)} loading="eager" fetchPriority="high" />
        </div>
        <div className="p10-hero-inner">
          <h1>{n.nome}</h1>
          {n.hero && <p className="lede">{n.hero}</p>}
          {n.blocoValor.length > 0 && (
            <div className="pills" style={{ marginTop: 6 }}>
              {n.blocoValor.map((b) => (
                <span key={b} className="pill">
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="p10-crumb" aria-label="Trilha" data-trilha>
        <div className="p10-crumb-inner">
          <Link to="/solucoes">Soluções</Link>
          <span className="sep">/</span>
          <Link to="/solucoes/$solucao" params={{ solucao: s.slug }}>
            {s.nome}
          </Link>
          <span className="sep">/</span>
          {c.nome !== n.nome && (
            <>
              <Link
                to="/solucoes/$solucao/$categoria"
                params={{ solucao: s.slug, categoria: c.slug }}
              >
                {c.nome}
              </Link>
              <span className="sep">/</span>
            </>
          )}
          <span className="current">{n.nome}</span>
        </div>
      </nav>

      {/*
        As soluções do caminho, no mesmo item das sanfonas da vertical.

        Esta seção era uma grade de cards que abria um modal com o conteúdo
        inteiro, e foi o ponto que o Carlos marcou na auditoria. Quem chegava
        por link profundo via a página recomeçar a seleção: escolher o perfil,
        achar o card, abrir o modal. Agora o conteúdo está na própria página,
        no HTML inicial, e o link que nomeia uma solução já a entrega aberta.
      */}
      <section className="sec" id="opcoes">
        <style>{ESTILO_SOLUCAO}</style>
        <EstiloFavoritar />
        <div className="wrap">
          <h2 className="p10-h2" style={{ marginBottom: 0 }}>
            Soluções deste caminho
          </h2>
          <p className="p10-lede" style={{ margin: "10px 0 0" }}>
            {n.products.length > 0
              ? "Abra a solução que interessa para ver o que ela inclui, a quem se destina e as perguntas frequentes."
              : "As soluções deste caminho ficam disponíveis por consultoria."}
          </p>

          {n.products.length === 0 ? (
            <a
              href={whatsappUrl(`Olá! Quero orientação sobre ${n.nome}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light"
              style={{ marginTop: 20 }}
            >
              Falar com um consultor
            </a>
          ) : (
            <>
              {temPF && temPJ && (
                <div className="sf-filtros" role="group" aria-label="Filtrar por público">
                  {(
                    [
                      ["todos", "Todos os perfis"],
                      ["pessoal", "Você e família"],
                      ["empresa", "Sua empresa"],
                    ] as const
                  ).map(([valor, rotulo]) => (
                    <button
                      key={valor}
                      type="button"
                      className="sf-filtro"
                      aria-pressed={perfil === valor}
                      onClick={() => definirPerfil(valor)}
                    >
                      {rotulo}
                    </button>
                  ))}
                  <span className="sf-conta" aria-live="polite">
                    {perfil === "todos"
                      ? `${n.products.length} ${n.products.length === 1 ? "solução" : "soluções"}`
                      : `${visiveis.length} de ${n.products.length}`}
                  </span>
                </div>
              )}

              {criterios.length > 0 && (
                <div className="sf-criterios" style={{ margin: temPF && temPJ ? 0 : "24px 0 0" }}>
                  <h4>O que pesa na escolha</h4>
                  <ul>
                    {criterios.map((crit) => (
                      <li key={crit}>{crit}</li>
                    ))}
                  </ul>
                </div>
              )}

              <ul className="sf-prods" style={{ marginTop: 20 }}>
                {visiveis.map((p) => (
                  <ItemSolucao
                    key={p.id}
                    produto={p}
                    solucaoSlug={s.slug}
                    solucaoNome={s.nome}
                    categoriaSlug={c.slug}
                    nucleoSlug={n.slug}
                    publico={publico(p.perfil)}
                    // a página é a da solução: o link para ela seria para si mesma
                    linkDaPagina={false}
                    // caminho de uma solução só não cobra toque para mostrá-la
                    abertaPorPadrao={n.products.length === 1}
                    aoFormulario={irParaFormulario}
                    imagem={
                      s.slug === "financeiras"
                        ? // posição na lista COMPLETA, não na filtrada por perfil:
                          // o pool de financiamentos é alinhado à ordem dos produtos
                          finProdutoImg(c.slug, n.slug, n.products.indexOf(p))
                        : undefined
                    }
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* Contexto: abertura consultiva + imagem (um único apoio visual) */}
      <section className="sec sec-alt">
        <div className="wrap p10-split">
          <div>
            <p className="eyebrow">Sobre esta escolha</p>
            <p
              style={{
                fontFamily: "var(--fd)",
                fontSize: "clamp(1.25rem, 2.3vw, 1.7rem)",
                lineHeight: 1.38,
                fontWeight: 500,
                color: "var(--preto)",
                letterSpacing: "-.015em",
                margin: "12px 0 0",
              }}
            >
              {finContentFor(c.slug)?.subHero ?? aberturaLimpa(n.aberturaConsultiva)}
            </p>
          </div>
          <figure className="p10-fig">
            <img src={ctx.src} alt={ctx.alt} {...dim(ctx.src)} loading="lazy" decoding="async" />
          </figure>
        </div>
      </section>

      {faq.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <h2 className="p10-h2" style={{ marginBottom: 20 }}>
              Perguntas frequentes
            </h2>
            <FaqAccordion items={faq} />
          </div>
        </section>
      )}

      {/* Formulário em seção escura */}
      <section className="sec sec-dark" id="contato">
        <div
          className="wrap"
          style={{ display: "grid", gap: 32, gridTemplateColumns: "1fr", alignItems: "start" }}
        >
          <div>
            <h2 className="p10-h2">Um consultor retorna com o próximo passo</h2>
            <p className="p10-lede">
              Conte seu momento. A resposta é orientada, sem excesso comercial.
            </p>
          </div>
          <LeadForm
            interesse={n.nome}
            perfilInicial={perfil === "empresa" || (!temPF && temPJ) ? "PJ" : "PF"}
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
            <h2 className="p10-h2" style={{ marginBottom: 0 }}>
              Também pode fazer sentido
            </h2>
            {frentes.length > 1 ? (
              <>
                <p className="p10-lede">
                  Frentes que costumam ser organizadas junto com {n.nome.toLowerCase()}.
                </p>
                <div className="cross-grid">
                  {frentes.map((f) => (
                    <a
                      key={f}
                      className="cross-card"
                      href={whatsappUrl(`Olá! Gostaria de entender ${f} junto com ${n.nome}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="cross-card-nome">{f}</span>
                      <span className="cross-card-go" aria-hidden>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <div className="cross" style={{ marginTop: 16 }}>
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
            )}
          </div>
        </section>
      )}
    </PageTheme>
  );
}
