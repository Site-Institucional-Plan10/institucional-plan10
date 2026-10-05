import { useEffect, useMemo, useRef } from "react";
import { Link } from "@tanstack/react-router";
import type { Categoria, Nucleo, Product, Solucao } from "@/data/solutions";
import { usarPerfil } from "@/lib/perfilPublico";
import type { PerfilPublico } from "@/lib/verticais";
import { whatsappUrl } from "@/lib/plan10";

/**
 * As sanfonas da vertical: a pessoa abre a categoria e a solução na própria
 * página, sem atravessar categoria, subcategoria e produto.
 *
 * Três decisões sustentam o resto do arquivo.
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
 */

const publico = (p: "PF" | "PJ"): PerfilPublico => (p === "PJ" ? "empresa" : "pessoal");

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
function criteriosDoCaminho(porque: string | undefined): string[] {
  const m = (porque ?? "").match(/(?:combina|deve considerar)\s+(.+?)\.?\s*$/i);
  if (!m) return [];
  return m[1]
    .split(/\s*,\s*|\s+e\s+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 2)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1));
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

export function Sanfonas({ solucao, abrir }: { solucao: Solucao; abrir?: string }) {
  // Um estado só, o da navegação rápida. Um filtro local espelhando a barra
  // deixaria as duas se contradizerem na tela: a barra dizendo Sua empresa e a
  // lista dizendo Todos os perfis, que é pior que simplesmente ceder a escolha.
  const { perfil, definirPerfil, pronto } = usarPerfil();

  const arvore: CategoriaVisivel[] = useMemo(
    () =>
      naOrdemDaVertical(solucao.slug, solucao.categorias)
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
    [solucao, perfil],
  );

  const emBreve = solucao.categorias.filter((c) => c.nucleos.length === 0);

  // quantas soluções o filtro deixou de fora, para o contador não mentir
  const totalGeral = useMemo(
    () =>
      solucao.categorias.reduce(
        (s, c) => s + c.nucleos.reduce((n, x) => n + x.products.length, 0),
        0,
      ),
    [solucao],
  );
  const totalVisivel = arvore.reduce((s, c) => s + c.total, 0);

  /**
   * O link que já identifica uma solução abre a sanfona certa.
   *
   * `abrir` é "categoria/caminho" e o hash é o id do produto. A ordem importa:
   * abrir antes de medir, porque a posição do produto só existe depois de o
   * conteúdo da sanfona ocupar lugar na página. Daí o quadro de animação.
   */
  const atendido = useRef("");
  useEffect(() => {
    if (!abrir || typeof window === "undefined") return;
    // sem a preferência lida, o público ainda pode mudar debaixo da decisão
    if (!pronto) return;
    if (atendido.current === abrir) return;

    const [cat, nuc] = abrir.split("/");
    const sanfonaCat = document.getElementById(`sanfona-${cat}`) as HTMLDetailsElement | null;
    const sanfonaNuc = nuc
      ? (document.getElementById(`sanfona-${cat}-${nuc}`) as HTMLDetailsElement | null)
      : null;
    const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));

    /**
     * Parte do destino pode estar fora da página porque o filtro de público a
     * escondeu, e o produto do hash some antes da sanfona: o caminho sobrevive
     * ao filtro se tiver um item do outro público, e aí a sanfona abre numa
     * lista que não contém justamente o que o link prometeu. Por isso o produto
     * entra na conta, não só a sanfona.
     */
    const escondido = !sanfonaCat || (nuc && !sanfonaNuc) || (hash && !document.getElementById(hash));
    if (escondido && perfil !== "todos") {
      definirPerfil("todos");
      return;
    }
    // endereço que não corresponde a nada nesta vertical: a página fica como está
    if (!sanfonaCat) return;

    atendido.current = abrir;
    sanfonaCat.open = true;
    if (sanfonaNuc) sanfonaNuc.open = true;

    const foco = (sanfonaNuc ?? sanfonaCat).querySelector("summary");

    const quadro = window.requestAnimationFrame(() => {
      const produto = hash ? document.getElementById(hash) : null;
      const alvo = produto ?? sanfonaNuc ?? sanfonaCat;
      const cabecalho = document.querySelector("header")?.offsetHeight ?? 0;
      const topo = window.scrollY + alvo.getBoundingClientRect().top - cabecalho - 24;
      const manso = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: Math.max(0, topo), behavior: manso ? "instant" : "smooth" });
      // o teclado continua de onde o link parou; sem preventScroll o foco
      // daria um segundo salto por cima da rolagem que acabou de começar
      foco?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(quadro);
  }, [abrir, perfil, definirPerfil, pronto]);

  return (
    <section className="sec" id="caminhos" aria-labelledby="caminhos-h">
      <style>{ESTILO}</style>

      <div className="wrap">
        <h2 className="p10-h2" id="caminhos-h">
          Caminhos disponíveis
        </h2>
        <p className="sf-lede">
          Abra a frente que interessa e veja as soluções aqui mesmo. Cada nível também tem a sua
          página própria, para abrir em separado.
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
          {arvore.map(({ categoria, caminhos, total }) => (
            <details key={categoria.slug} className="sf-cat" id={`sanfona-${categoria.slug}`}>
              <summary>
                <span className="sf-cat-nome">{categoria.nome}</span>
                <span className="sf-tag">{plural(total, "solução", "soluções")}</span>
                <span className="sf-sinal" aria-hidden />
              </summary>

              <div className="sf-cat-corpo">
                {categoria.hero && <p className="sf-cat-hero">{categoria.hero}</p>}

                {caminhos.map(({ nucleo, produtos }) => {
                  const criterios = criteriosDoCaminho(nucleo.porque);
                  return (
                    <details
                      key={nucleo.slug}
                      className="sf-nuc"
                      id={`sanfona-${categoria.slug}-${nucleo.slug}`}
                    >
                      <summary>
                        <span className="sf-nuc-nome">{nucleo.nome}</span>
                        <span className="sf-tag">
                          {plural(produtos.length, "solução", "soluções")}
                        </span>
                        <span className="sf-sinal" aria-hidden />
                      </summary>

                      <div className="sf-nuc-corpo">
                        {nucleo.blocoValor.length > 0 && (
                          <p className="sf-frentes">{nucleo.blocoValor.join(" · ")}</p>
                        )}

                        {criterios.length > 0 && (
                          <div className="sf-criterios">
                            <h4>O que pesa na escolha</h4>
                            <ul>
                              {criterios.map((c) => (
                                <li key={c}>{c}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <ul className="sf-prods">
                          {produtos.map((produto) => (
                            <li key={produto.id} id={produto.id} className="sf-prod">
                              <div className="sf-prod-topo">
                                <h4>{produto.nome}</h4>
                                <span className="sf-perfil">
                                  {publico(produto.perfil) === "empresa"
                                    ? "Sua empresa"
                                    : "Você e família"}
                                </span>
                              </div>
                              <p>{produto.descricao}</p>
                              {produto.itensInclusos.length > 0 && (
                                <p className="sf-inclui">
                                  <strong>Inclui:</strong>{" "}
                                  {/* no catálogo cada item é uma frase solta e o
                                      último às vezes traz ponto final; emendados
                                      viram uma linha sem respiro */}
                                  {produto.itensInclusos
                                    .map((i) => i.trim().replace(/\.$/, ""))
                                    .filter(Boolean)
                                    .join(" · ")}
                                </p>
                              )}
                              <div className="sf-prod-acoes">
                                <a
                                  className="sf-btn sf-btn-p"
                                  href={whatsappUrl(
                                    `Olá! Quero orientação sobre ${produto.nome} (${solucao.nome}).`,
                                  )}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Pedir orientação
                                </a>
                                <Link
                                  className="sf-btn sf-btn-s"
                                  to="/solucoes/$solucao/$categoria/$nucleo"
                                  params={{
                                    solucao: solucao.slug,
                                    categoria: categoria.slug,
                                    nucleo: nucleo.slug,
                                  }}
                                  hash={produto.id}
                                >
                                  Ver detalhes
                                </Link>
                              </div>
                            </li>
                          ))}
                        </ul>

                        <Link
                          className="sf-pagina"
                          to="/solucoes/$solucao/$categoria/$nucleo"
                          params={{
                            solucao: solucao.slug,
                            categoria: categoria.slug,
                            nucleo: nucleo.slug,
                          }}
                        >
                          Abrir a página de {nucleo.nome}
                          <span aria-hidden> →</span>
                        </Link>
                      </div>
                    </details>
                  );
                })}

                <Link
                  className="sf-pagina sf-pagina-cat"
                  to="/solucoes/$solucao/$categoria"
                  params={{ solucao: solucao.slug, categoria: categoria.slug }}
                >
                  Abrir a página de {categoria.nome}
                  <span aria-hidden> →</span>
                </Link>
              </div>
            </details>
          ))}
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

/* A folha fica fora do componente para não ser remontada a cada filtro. */
const ESTILO = `
.sf-lede { font-family: var(--fb); font-size: 1rem; line-height: 1.6; color: var(--ctxt); margin: 14px 0 0; max-width: 64ch; }

.sf-filtros { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin: 26px 0 22px; }
.sf-filtro {
  font-family: var(--fb); font-size: .82rem; font-weight: 600; padding: 8px 15px;
  border-radius: 999px; border: 1px solid var(--c2); background: transparent;
  color: var(--ctxt); cursor: pointer; transition: border-color var(--t), color var(--t), background var(--t);
}
.sf-filtro:hover { border-color: var(--vp); color: var(--preto); }
.sf-filtro[aria-pressed="true"] { background: var(--vp); border-color: var(--vp); color: #fff; }
.sf-conta { font-family: var(--fl); font-size: .74rem; letter-spacing: .08em; text-transform: uppercase; color: #8A93A0; margin-left: 4px; }

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

.sf-frentes { font-family: var(--fl); font-size: .74rem; letter-spacing: .07em; text-transform: uppercase; color: var(--vp); margin: 0; }

.sf-criterios h4 { font-family: var(--fl); font-size: .72rem; letter-spacing: .1em; text-transform: uppercase; font-weight: 600; color: #8A93A0; margin: 0 0 8px; }
.sf-criterios ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
/* li em flex quebraria cada palavra numa coluna; aqui o item é a caixa e o
   texto dentro dele fica em linha */
.sf-criterios li {
  display: block; font-family: var(--fb); font-size: .82rem; color: var(--ctxt);
  border: 1px solid var(--c2); border-radius: 999px; padding: 5px 12px; background: #fff;
}

.sf-prods { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; grid-template-columns: 1fr; }
@media (min-width: 900px) { .sf-prods { grid-template-columns: repeat(2, 1fr); } }
.sf-prod {
  display: block; border: 1px solid var(--c2); border-radius: var(--rs);
  padding: 16px 18px; background: #fff; scroll-margin-top: 110px;
}
.sf-prod:target { border-color: var(--vp); box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp) 16%, transparent); }
.sf-prod-topo { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; margin-bottom: 7px; }
.sf-prod h4 { font-family: var(--fd); font-size: 1.02rem; font-weight: 600; color: var(--preto); margin: 0; letter-spacing: -.01em; }
.sf-perfil { font-family: var(--fl); font-size: .66rem; letter-spacing: .08em; text-transform: uppercase; color: #8A93A0; white-space: nowrap; flex: none; }
.sf-prod > p { font-family: var(--fb); font-size: .91rem; line-height: 1.55; color: var(--ctxt); margin: 0; }
.sf-inclui { margin-top: 8px !important; font-size: .85rem !important; color: #6B7482 !important; }
.sf-inclui strong { font-weight: 600; color: var(--preto); }

.sf-prod-acoes { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.sf-btn {
  display: inline-flex; align-items: center; gap: 7px; border-radius: 999px; padding: 9px 17px;
  font-family: var(--fb); font-size: .83rem; font-weight: 600; text-decoration: none;
  border: 1px solid transparent; transition: background var(--t), border-color var(--t), color var(--t);
}
.sf-btn-p { background: var(--vp); color: #fff; }
.sf-btn-p:hover { filter: brightness(1.1); }
.sf-btn-s { background: transparent; color: var(--preto); border-color: var(--c2); }
.sf-btn-s:hover { border-color: var(--vp); color: var(--vp); }
.sf-btn:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }

.sf-pagina {
  align-self: flex-start; font-family: var(--fl); font-size: .74rem; letter-spacing: .09em;
  text-transform: uppercase; font-weight: 600; color: var(--vp); text-decoration: none;
}
.sf-pagina:hover { text-decoration: underline; }
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
