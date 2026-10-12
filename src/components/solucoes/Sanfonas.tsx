import { useCallback, useEffect, useMemo, useRef } from "react";
import { Link } from "@tanstack/react-router";
import type { Categoria, Nucleo, Product, Solucao } from "@/data/solutions";
import { usarPerfil } from "@/lib/perfilPublico";
import type { PerfilPublico } from "@/lib/verticais";
import { EstiloFavoritar } from "@/components/favoritos/BotaoFavoritar";
import { ItemSolucao, ESTILO_SOLUCAO, publicoDe } from "@/components/solucoes/ItemSolucao";
import { useRolagemAgendada } from "@/lib/rolarAteSolucao";
import { marcarExpansao } from "@/lib/sanfonaAria";

/**
 * As sanfonas da vertical: a pessoa abre a categoria e a solução na própria
 * página, sem atravessar categoria, subcategoria e produto.
 *
 * Quatro decisões sustentam o resto do arquivo.
 *
 * Primeira, é `details`/`summary` nativo, não uma sanfona de componente. O
 * estado aberto, o foco, o Enter, o espaço e o anúncio do leitor de tela vêm do
 * navegador, já corretos. O que o React controla é só o conteúdo; abrir e
 * fechar é do elemento. Para o link que já identifica uma solução, abrir é uma
 * linha: `.open = true` no destino.
 *
 * Segunda, as páginas de categoria e de caminho continuam existindo. A sanfona
 * dispensa a travessia, não substitui a URL: cada nível tem aqui dentro o link
 * para a sua página, que é o que mantém acesso direto, busca e compartilhamento.
 *
 * Terceira, o público vem da navegação rápida, a mesma escolha do site inteiro.
 * Se o filtro escondesse justamente o item que o link pediu, o filtro cede: o
 * link é mais específico que a preferência.
 *
 * Quarta, nível que não decide nada não vira clique. Modalidade com um caminho
 * só abre o caminho junto; caminho com uma solução só já mostra a solução
 * aberta. A camada continua nomeada na tela e com a sua página própria, mas
 * deixa de cobrar um toque para não dizer nada.
 */

const publico: (p: "PF" | "PJ") => PerfilPublico = publicoDe;

/**
 * No financeiro a ordem do catálogo não é a ordem da conversa: crédito e
 * financiamentos abrem, capitalização fecha. As outras quatro verticais seguem
 * a ordem do catálogo, que já é a ordem certa.
 */
const ORDEM_FINANCEIRO = [
  "credito-e-liquidez",
  "financiamentos",
  "investimentos-previdencia-e-reservas",
  "servicos-financeiros-e-contas",
  "garantias-financeiras",
  "capitalizacao",
];

function naOrdemDaVertical(hub: string, categorias: Categoria[]): Categoria[] {
  if (hub !== "financeiras") return categorias;
  const posicao = (slug: string) => {
    const i = ORDEM_FINANCEIRO.indexOf(slug);
    return i === -1 ? 99 : i;
  };
  return [...categorias].sort((a, b) => posicao(a.slug) - posicao(b.slug));
}

const plural = (n: number, um: string, muitos: string) => `${n} ${n === 1 ? um : muitos}`;

/**
 * Os critérios de escolha de cada caminho, em lista.
 *
 * No catálogo eles vêm numa frase só, sempre no formato "Uma recomendação
 * segura de <produto> combina A, B, C e D". O miolo depois do verbo é o
 * critério de fato; a abertura só repete o nome do produto que já está no
 * título logo acima. Fora do padrão, devolve lista vazia e a tela esconde o
 * bloco em vez de mostrar frase pela metade.
 */
export function criteriosDoCaminho(porque: string | undefined): string[] {
  const m = (porque ?? "").match(/(?:combina|deve considerar)\s+(.+?)\.?\s*$/i);
  if (!m) return [];
  const vistos = new Set<string>();
  return (
    m[1]
      .split(/\s*,\s*|\s+e\s+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 2)
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      // a planilha repete critério em pelo menos um caminho (Exclusões, em
      // fraudes digitais). Repetido é ruído na tela e chave duplicada no React.
      .filter((p) => {
        const chave = p.toLowerCase();
        if (vistos.has(chave)) return false;
        vistos.add(chave);
        return true;
      })
  );
}

interface CaminhoVisivel {
  nucleo: Nucleo;
  produtos: Product[];
}
interface CategoriaVisivel {
  categoria: Categoria;
  caminhos: CaminhoVisivel[];
  total: number;
}

/**
 * O endereço acompanha o que está aberto, sem encher o histórico.
 *
 * `replaceState` e não `pushState`: cada abrir e fechar empilhado faria o botão
 * Voltar virar "fechar sanfona", e sair da página passaria a exigir um toque
 * por item visitado. Assim recarregar e compartilhar devolvem exatamente a
 * mesma tela, e Voltar continua sendo voltar.
 */
function sincronizarEndereco(abrir: string | null, hash: string | null) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (abrir) url.searchParams.set("abrir", abrir);
  else url.searchParams.delete("abrir");
  url.hash = hash ? `#${hash}` : "";
  window.history.replaceState(window.history.state, "", url.toString());
}

/** Corpo de um caminho: frentes, critérios, soluções e o link da página. */
function CorpoDoCaminho({
  solucao,
  categoria,
  nucleo,
  produtos,
  solto,
  aoAlternarDetalhe,
}: {
  solucao: Solucao;
  categoria: Categoria;
  nucleo: Nucleo;
  produtos: Product[];
  /** Sem a sanfona em volta, porque a modalidade tem um caminho só. */
  solto?: boolean;
  aoAlternarDetalhe?: (produtoId: string, aberto: boolean) => void;
}) {
  const criterios = criteriosDoCaminho(nucleo.porque);
  // caminho de uma solução só: a expansão já nasce aberta, porque o toque
  // levaria ao único conteúdo que existe ali
  const unica = produtos.length === 1;

  return (
    <div className={solto ? "sf-nuc-corpo sf-nuc-solo" : "sf-nuc-corpo"}>
      {solto && <p className="sf-nuc-rotulo">{nucleo.nome}</p>}

      {nucleo.blocoValor.length > 0 && (
        <p className="sf-frentes">{nucleo.blocoValor.join(" · ")}</p>
      )}

      {criterios.length > 0 && (
        <div className="sf-criterios">
          <h3>O que pesa na escolha</h3>
          <ul>
            {criterios.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      <ul className="sf-prods">
        {produtos.map((produto) => (
          <ItemSolucao
            key={produto.id}
            produto={produto}
            solucaoSlug={solucao.slug}
            solucaoNome={solucao.nome}
            categoriaSlug={categoria.slug}
            nucleoSlug={nucleo.slug}
            publico={publico(produto.perfil)}
            abertaPorPadrao={unica}
            aoAlternarDetalhe={aoAlternarDetalhe}
            escopo={nucleo.slug}
          />
        ))}
      </ul>

      <Link
        className="sf-pagina"
        to="/solucoes/$solucao/$categoria/$nucleo"
        params={{ solucao: solucao.slug, categoria: categoria.slug, nucleo: nucleo.slug }}
      >
        Abrir a página de {nucleo.nome}
        <span aria-hidden> →</span>
      </Link>
    </div>
  );
}

export function Sanfonas({
  solucao,
  abrir,
  apenasCategoria,
}: {
  solucao: Solucao;
  abrir?: string;
  /** Na página da modalidade, a sanfona mostra só aquela modalidade, já aberta. */
  apenasCategoria?: string;
}) {
  // Um estado só, o da navegação rápida. Um filtro local espelhando a barra
  // deixaria as duas se contradizerem na tela: a barra dizendo Sua empresa e a
  // lista dizendo Todos os perfis, que é pior que simplesmente ceder a escolha.
  const { perfil, definirPerfil, pronto } = usarPerfil();

  const arvore: CategoriaVisivel[] = useMemo(
    () =>
      naOrdemDaVertical(solucao.slug, solucao.categorias)
        .filter((categoria) => !apenasCategoria || categoria.slug === apenasCategoria)
        .map((categoria) => {
          const caminhos = categoria.nucleos
            .map((nucleo) => ({
              nucleo,
              produtos: nucleo.products.filter(
                (p) => perfil === "todos" || publico(p.perfil) === perfil,
              ),
            }))
            .filter((c) => c.produtos.length > 0);
          return {
            categoria,
            caminhos,
            total: caminhos.reduce((s, c) => s + c.produtos.length, 0),
          };
        })
        .filter((c) => c.caminhos.length > 0),
    [solucao, perfil, apenasCategoria],
  );

  const emBreve = apenasCategoria ? [] : solucao.categorias.filter((c) => c.nucleos.length === 0);

  // quantas soluções o filtro deixou de fora, para o contador não mentir
  const totalGeral = useMemo(
    () =>
      solucao.categorias
        .filter((c) => !apenasCategoria || c.slug === apenasCategoria)
        .reduce((s, c) => s + c.nucleos.reduce((n, x) => n + x.products.length, 0), 0),
    [solucao, apenasCategoria],
  );
  const totalVisivel = arvore.reduce((s, c) => s + c.total, 0);

  /**
   * O que o endereço pede já vem aberto do servidor.
   *
   * Duas razões. A primeira é que o HTML passa a dizer a verdade: quem chega
   * por `?abrir=` recebe a sanfona aberta mesmo antes de o JavaScript rodar, e
   * é isso que a indexação lê. A segunda é o aviso de hidratação: o Chrome
   * abre sozinho os `details` que contêm a âncora do endereço, e faz isso
   * antes de o React assumir a página. Se o servidor mandasse tudo fechado, o
   * React encontraria um `open` que não pôs ali e reclamaria no console.
   *
   * O `open` aqui é valor inicial, não controle: o React só reescreve o
   * atributo quando o valor da propriedade muda entre dois renders, então
   * fechar com o dedo continua fechando.
   */
  const [catDoEndereco, nucDoEndereco] = (abrir ?? "").split("/");
  const comecaAberta = (slug: string) => Boolean(apenasCategoria) || slug === catDoEndereco;
  const caminhoComecaAberto = (cat: string, nuc: string) =>
    cat === catDoEndereco && nuc === nucDoEndereco;

  /**
   * O link que já identifica uma solução abre a sanfona certa.
   *
   * `abrir` é "categoria/caminho" e o hash é o id do produto. A ordem importa:
   * abrir antes de medir, porque a posição do produto só existe depois de o
   * conteúdo da sanfona ocupar lugar na página. Daí o quadro de animação.
   */
  const atendido = useRef("");
  const agendarRolagem = useRolagemAgendada();
  useEffect(() => {
    if (!abrir || typeof window === "undefined") return;
    // sem a preferência lida, o público ainda pode mudar debaixo da decisão
    if (!pronto) return;
    if (atendido.current === abrir) return;

    const [cat, nuc] = abrir.split("/");
    const sanfonaCat = document.getElementById(`sanfona-${cat}`);
    // numa modalidade de caminho único o nível de dentro não é sanfona, é só
    // um bloco com id: serve de alvo de rolagem, mas não tem o que abrir
    const alvoNuc = nuc ? document.getElementById(`sanfona-${cat}-${nuc}`) : null;
    const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    /**
     * O produto é procurado dentro do caminho, não na página inteira.
     *
     * Com `id` prefixado pelo caminho, `getElementById(hash)` não acha mais
     * nada, e antes dele achava demais: sete produtos repetem o `id` entre
     * caminhos da mesma vertical, e o primeiro do HTML ganhava sempre. O
     * `abrir` já diz qual é o caminho, então é dentro dele que se procura.
     */
    const acharProduto = (): HTMLElement | null => {
      if (!hash) return null;
      const dentro = alvoNuc ?? sanfonaCat;
      const sel = `[data-solucao="${CSS.escape(hash)}"]`;
      return (dentro?.querySelector<HTMLElement>(sel) ??
        document.querySelector<HTMLElement>(sel)) as HTMLElement | null;
    };

    /**
     * Parte do destino pode estar fora da página porque o filtro de público a
     * escondeu, e o produto do hash some antes da sanfona: o caminho sobrevive
     * ao filtro se tiver um item do outro público, e aí a sanfona abre numa
     * lista que não contém justamente o que o link prometeu. Por isso o produto
     * entra na conta, não só a sanfona.
     */
    const escondido = !sanfonaCat || (nuc && !alvoNuc) || (hash && !acharProduto());
    if (escondido && perfil !== "todos") {
      definirPerfil("todos");
      return;
    }
    // endereço que não corresponde a nada nesta vertical: a página fica como está
    if (!sanfonaCat) return;

    atendido.current = abrir;
    if (sanfonaCat instanceof HTMLDetailsElement) sanfonaCat.open = true;
    if (alvoNuc instanceof HTMLDetailsElement) alvoNuc.open = true;

    const produto = acharProduto();
    // o :target do CSS casa com o id, que aqui vem prefixado pelo caminho:
    // a classe faz o mesmo realce, para o item apontado continuar marcado
    produto?.classList.add("sf-prod-alvo");
    // a solução pedida abre o detalhe junto: o link prometeu a solução, não um
    // título que ainda exige um toque para mostrar o conteúdo
    const detalhe = produto?.querySelector<HTMLDetailsElement>("details.sf-mais");
    if (detalhe) detalhe.open = true;
    const foco =
      detalhe?.querySelector("summary") ?? (alvoNuc ?? sanfonaCat).querySelector("summary");

    agendarRolagem(
      () => produto ?? alvoNuc ?? sanfonaCat,
      // o teclado continua de onde o link parou. O foco vai depois da rolagem,
      // e não antes: posto no começo, ele é perdido no render seguinte
      () => foco?.focus({ preventScroll: true }),
    );
  }, [abrir, perfil, definirPerfil, pronto, agendarRolagem]);

  /**
   * Toque na sanfona reescreve o endereço, para recarregar e compartilhar
   * caírem na mesma tela.
   *
   * O efeito acima também abre sanfonas, e abrir dispara o mesmo `toggle`. Em
   * vez de uma trava por tempo, que dependeria da ordem entre a fila de
   * eventos e o quadro de animação, a comparação é com o estado já registrado:
   * se o toque chega ao mesmo lugar que o link pediu, não há o que reescrever,
   * e o hash do produto sobrevive.
   *
   * Na página da modalidade a sincronia não roda: o endereço já é a
   * modalidade, e a sanfona abre junto com a página.
   */
  const aoAlternar = useCallback(
    (cat: string, nuc: string | null, aberto: boolean) => {
      if (apenasCategoria) return;
      const atual = atendido.current;

      if (!aberto) {
        // fechar o caminho devolve a modalidade; fechar a modalidade limpa tudo
        const alvo = nuc ? `${cat}/${nuc}` : cat;
        if (atual !== alvo && !(nuc === null && atual.startsWith(`${cat}/`))) return;
        const resto = nuc ? cat : null;
        atendido.current = resto ?? "";
        sincronizarEndereco(resto, null);
        return;
      }

      const valor = nuc ? `${cat}/${nuc}` : cat;
      // a modalidade abrindo por baixo de um caminho já endereçado não rebaixa
      // o endereço para o nível de cima
      if (atual === valor || (nuc === null && atual.startsWith(`${cat}/`))) return;
      atendido.current = valor;
      sincronizarEndereco(valor, null);
    },
    [apenasCategoria],
  );

  /**
   * Abrir o detalhe de uma solução põe o id dela no endereço, e fechar tira.
   * Quando o efeito do link abre o detalhe, o hash já é o do produto, então a
   * comparação dispensa qualquer trava.
   */
  const aoAlternarDetalhe = useCallback(
    (produtoId: string, aberto: boolean) => {
      if (apenasCategoria || typeof window === "undefined") return;
      const hashAtual = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (aberto) {
        if (hashAtual === produtoId) return;
        sincronizarEndereco(atendido.current || null, produtoId);
      } else if (hashAtual === produtoId) {
        sincronizarEndereco(atendido.current || null, null);
      }
    },
    [apenasCategoria],
  );

  return (
    <section className="sec" id="caminhos" aria-labelledby="caminhos-h">
      <style>{ESTILO + ESTILO_SOLUCAO}</style>
      <EstiloFavoritar />

      <div className="wrap">
        <h2 className="p10-h2" id="caminhos-h">
          {apenasCategoria ? "Soluções desta frente" : "Caminhos disponíveis"}
        </h2>
        <p className="sf-lede">
          {apenasCategoria
            ? "As soluções abrem aqui mesmo. Cada uma também tem a sua página própria, para abrir em separado."
            : "Abra a frente que interessa e veja as soluções aqui mesmo. Cada nível também tem a sua página própria, para abrir em separado."}
        </p>

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
              ? plural(totalGeral, "solução", "soluções")
              : `${plural(totalVisivel, "solução", "soluções")} de ${totalGeral}`}
          </span>
        </div>

        <div className="sf-lista">
          {arvore.map(({ categoria, caminhos, total }) => {
            // modalidade de um caminho só: a sanfona de dentro seria um clique
            // para revelar exatamente o que a de fora já prometeu
            const caminhoUnico = caminhos.length === 1 ? caminhos[0] : null;
            return (
              <details
                key={categoria.slug}
                className="sf-cat"
                id={`sanfona-${categoria.slug}`}
                open={comecaAberta(categoria.slug)}
                suppressHydrationWarning
                onToggle={(e) => {
                  const d = e.currentTarget as HTMLDetailsElement;
                  marcarExpansao(d);
                  aoAlternar(categoria.slug, null, d.open);
                }}
              >
                <summary aria-expanded={comecaAberta(categoria.slug)} suppressHydrationWarning>
                  <span className="sf-cat-nome">{categoria.nome}</span>
                  <span className="sf-tag">{plural(total, "solução", "soluções")}</span>
                  <span className="sf-sinal" aria-hidden />
                </summary>

                <div className="sf-cat-corpo">
                  {categoria.hero && <p className="sf-cat-hero">{categoria.hero}</p>}

                  {caminhoUnico ? (
                    <div id={`sanfona-${categoria.slug}-${caminhoUnico.nucleo.slug}`}>
                      <CorpoDoCaminho
                        solucao={solucao}
                        categoria={categoria}
                        nucleo={caminhoUnico.nucleo}
                        produtos={caminhoUnico.produtos}
                        solto
                        aoAlternarDetalhe={aoAlternarDetalhe}
                      />
                    </div>
                  ) : (
                    caminhos.map(({ nucleo, produtos }) => (
                      <details
                        key={nucleo.slug}
                        className="sf-nuc"
                        id={`sanfona-${categoria.slug}-${nucleo.slug}`}
                        open={caminhoComecaAberto(categoria.slug, nucleo.slug)}
                        suppressHydrationWarning
                        onToggle={(e) => {
                          const d = e.currentTarget as HTMLDetailsElement;
                          marcarExpansao(d);
                          aoAlternar(categoria.slug, nucleo.slug, d.open);
                        }}
                      >
                        <summary
                          aria-expanded={caminhoComecaAberto(categoria.slug, nucleo.slug)}
                          suppressHydrationWarning
                        >
                          <span className="sf-nuc-nome">{nucleo.nome}</span>
                          <span className="sf-tag">
                            {plural(produtos.length, "solução", "soluções")}
                          </span>
                          <span className="sf-sinal" aria-hidden />
                        </summary>

                        <CorpoDoCaminho
                          solucao={solucao}
                          categoria={categoria}
                          nucleo={nucleo}
                          produtos={produtos}
                          aoAlternarDetalhe={aoAlternarDetalhe}
                        />
                      </details>
                    ))
                  )}

                  {!apenasCategoria && (
                    <Link
                      className="sf-pagina sf-pagina-cat"
                      to="/solucoes/$solucao/$categoria"
                      params={{ solucao: solucao.slug, categoria: categoria.slug }}
                    >
                      Abrir a página de {categoria.nome}
                      <span aria-hidden> →</span>
                    </Link>
                  )}
                </div>
              </details>
            );
          })}
        </div>

        {emBreve.length > 0 && (
          <p className="sf-breve">
            <strong>Em breve:</strong> {emBreve.map((c) => c.nome).join(", ")}.
          </p>
        )}
      </div>
    </section>
  );
}

const ESTILO = `
.sf-lede { font-family: var(--fb); font-size: 1rem; line-height: 1.6; color: var(--ctxt); margin: 14px 0 0; max-width: 64ch; }

.sf-lista { display: flex; flex-direction: column; gap: 10px; }

/* o triângulo nativo sai, o sinal de mais entra: é o mesmo gesto, com o espaço
   que o título precisa no celular */
.sf-cat > summary, .sf-nuc > summary { list-style: none; cursor: pointer; display: flex; align-items: center; gap: 12px; }
.sf-cat > summary::-webkit-details-marker, .sf-nuc > summary::-webkit-details-marker { display: none; }
.sf-sinal { margin-left: auto; position: relative; flex: none; width: 15px; height: 15px; }
.sf-sinal::before, .sf-sinal::after {
  content: ""; position: absolute; background: var(--vp); border-radius: 2px;
  transition: transform var(--t), opacity var(--t);
}
.sf-sinal::before { left: 0; right: 0; top: 7px; height: 2px; }
.sf-sinal::after { top: 0; bottom: 0; left: 7px; width: 2px; }
details[open] > summary .sf-sinal::after { transform: scaleY(0); opacity: 0; }

.sf-cat { border: 1px solid var(--c2); border-radius: var(--r); background: #fff; overflow: hidden; }
.sf-cat[open] { border-color: var(--vp); box-shadow: var(--sh); }
.sf-cat > summary { padding: 20px 22px; }
.sf-cat > summary:hover { background: var(--c1); }
.sf-cat > summary:focus-visible { outline: 2px solid var(--vp); outline-offset: -3px; }
.sf-cat-nome { font-family: var(--fd); font-size: 1.14rem; font-weight: 600; letter-spacing: -.015em; color: var(--preto); min-width: 0; }
.sf-tag { font-family: var(--fl); font-size: .7rem; letter-spacing: .08em; text-transform: uppercase; color: #8A93A0; white-space: nowrap; }
.sf-cat-corpo { padding: 0 22px 20px; display: flex; flex-direction: column; gap: 9px; }
.sf-cat-hero { font-family: var(--fb); font-size: .95rem; line-height: 1.6; color: var(--ctxt); margin: 0 0 6px; max-width: 70ch; }

.sf-nuc { border: 1px solid var(--c2); border-radius: var(--rs); background: var(--c1); }
.sf-nuc[open] { background: #fff; border-color: var(--vp); }
.sf-nuc > summary { padding: 14px 17px; }
.sf-nuc > summary:focus-visible { outline: 2px solid var(--vp); outline-offset: -3px; }
.sf-nuc-nome { font-family: var(--fd); font-size: 1rem; font-weight: 600; color: var(--preto); min-width: 0; }
.sf-nuc-corpo { padding: 2px 17px 17px; display: flex; flex-direction: column; gap: 15px; }

/* caminho sem sanfona em volta: a camada continua nomeada, mas sem cobrar o toque */
.sf-nuc-solo { padding: 0; scroll-margin-top: 110px; }
.sf-nuc-rotulo {
  font-family: var(--fd); font-size: 1rem; font-weight: 600; color: var(--preto); margin: 0;
}

.sf-frentes { font-family: var(--fl); font-size: .74rem; letter-spacing: .07em; text-transform: uppercase; color: var(--vp); margin: 0; }

.sf-criterios h3 { font-family: var(--fl); font-size: .72rem; letter-spacing: .1em; text-transform: uppercase; font-weight: 600; color: #8A93A0; margin: 0 0 8px; }
.sf-criterios ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
/* li em flex quebraria cada palavra numa coluna; aqui o item é a caixa e o
   texto dentro dele fica em linha */
.sf-criterios li {
  display: block; font-family: var(--fb); font-size: .82rem; color: var(--ctxt);
  border: 1px solid var(--c2); border-radius: 999px; padding: 5px 12px; background: #fff;
}

.sf-pagina-cat { margin-top: 6px; }

.sf-breve { font-family: var(--fb); font-size: .9rem; color: #8A93A0; margin: 20px 0 0; }
.sf-breve strong { color: var(--ctxt); font-weight: 600; }

@media (max-width: 600px) {
  .sf-cat > summary { padding: 16px 16px; }
  .sf-cat-corpo { padding: 0 16px 16px; }
  .sf-cat-nome { font-size: 1.04rem; }
  .sf-tag { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .sf-sinal::before, .sf-sinal::after { transition: none; }
}
`;
