import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import type { Product } from "@/data/solutions";
import type { CuratedImage } from "@/lib/imagery";
import { whatsappUrl, aberturaLimpa, semRepeticao } from "@/lib/plan10";
import { contratacaoOnlineDe } from "@/lib/contratacaoOnline";
import { BotaoFavoritar } from "@/components/favoritos/BotaoFavoritar";
import { dim } from "@/lib/dimensoes";
import { marcarExpansao } from "@/lib/sanfonaAria";

/**
 * A solução, como ela aparece em qualquer tela do site.
 *
 * Antes existiam duas: na vertical, uma sanfona; na página do caminho, um card
 * que abria um modal com o conteúdo inteiro. O modal era o ponto que o Carlos
 * marcou na auditoria, e o custo dele não era só estético: o conteúdo da
 * solução não estava no HTML da página, quem chegava por link profundo caía
 * numa sequência de seleção, e voltar fechava tudo.
 *
 * Agora a solução é um item só, usado nos três níveis. O detalhe abre em
 * `details` nativo, dentro da própria página: o estado, o teclado e o anúncio
 * do leitor de tela vêm do navegador, e o conteúdo já nasce no HTML, que é o
 * que a indexação precisa.
 */

export interface Props {
  produto: Product;
  solucaoSlug: string;
  solucaoNome: string;
  categoriaSlug: string;
  nucleoSlug: string;
  /** Rótulo do público, já traduzido para a linguagem do site. */
  publico: "pessoal" | "empresa";
  /** Nasce aberto: é a solução que o link pediu, ou a única do caminho. */
  abertaPorPadrao?: boolean;
  /** Só existe onde a página tem formulário. Leva ao formulário já marcado. */
  aoFormulario?: (produtoNome: string) => void;
  /** Some quando a pessoa já está na página da solução. */
  linkDaPagina?: boolean;
  /** Avisa quem hospeda a lista para o endereço acompanhar o que está aberto. */
  aoAlternarDetalhe?: (produtoId: string, aberto: boolean) => void;
  imagem?: CuratedImage;
}

const FORM = (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    aria-hidden
  >
    <path d="M4 5h16M4 10h16M4 15h10" />
  </svg>
);

/** O catálogo fala PF e PJ; a tela fala "você e família" e "sua empresa". */
export const publicoDe = (p: "PF" | "PJ"): "pessoal" | "empresa" =>
  p === "PJ" ? "empresa" : "pessoal";

/** No catálogo cada item é uma frase solta, às vezes com ponto final. */
const emLinha = (itens: string[]) =>
  itens
    .map((i) => i.trim().replace(/\.$/, ""))
    .filter(Boolean)
    .join(" · ");

export function ItemSolucao({
  produto,
  solucaoSlug,
  solucaoNome,
  categoriaSlug,
  nucleoSlug,
  publico,
  abertaPorPadrao = false,
  aoFormulario,
  linkDaPagina = true,
  aoAlternarDetalhe,
  imagem,
}: Props) {
  const online = contratacaoOnlineDe(produto.linkPorto);
  const temDetalhe =
    produto.itensInclusos.length > 0 ||
    produto.caracteristicas.length > 0 ||
    Boolean(produto.aQuemSeDestina) ||
    produto.faq.length > 0;

  return (
    <li id={produto.id} className="sf-prod">
      {imagem && (
        <figure className="sf-prod-foto">
          <img
            src={imagem.src}
            alt={imagem.alt}
            {...dim(imagem.src)}
            loading="lazy"
            decoding="async"
          />
        </figure>
      )}

      <div className="sf-prod-topo">
        <h4>{produto.nome}</h4>
        <span className="sf-perfil">
          {publico === "empresa" ? "Sua empresa" : "Você e família"}
        </span>
      </div>
      <p>{produto.descricao}</p>

      {/* A avaliação da planilha é explícita sobre o primeiro nível do card:
          nome, definição curta e público. Inclusos, funcionamento, destino e
          perguntas ficam para depois da expansão. */}
      {temDetalhe && (
        <details
          className="sf-mais"
          open={abertaPorPadrao}
          /* o Chrome abre sozinho o details que contém a âncora do endereço, e
             faz isso antes da hidratação: o atributo que o React encontra não
             é o que ele mandou, e o aviso não aponta defeito nenhum */
          suppressHydrationWarning
          onToggle={(e) => {
            const d = e.currentTarget as HTMLDetailsElement;
            marcarExpansao(d);
            aoAlternarDetalhe?.(produto.id, d.open);
          }}
        >
          <summary aria-expanded={abertaPorPadrao} suppressHydrationWarning>
            Entender opção
          </summary>
          <div className="sf-mais-corpo">
            {produto.itensInclusos.length > 0 && (
              <p>
                <strong>Inclui:</strong> {emLinha(produto.itensInclusos)}
              </p>
            )}
            {produto.caracteristicas.length > 0 && (
              <p>
                <strong>Como funciona:</strong> {emLinha(produto.caracteristicas)}
              </p>
            )}
            {produto.aQuemSeDestina && (
              <p>
                <strong>A quem se destina:</strong> {aberturaLimpa(produto.aQuemSeDestina)}
              </p>
            )}

            {produto.faq.length > 0 && (
              <div className="sf-faq">
                {produto.faq.map((f) => (
                  <details
                    key={f.q}
                    className="sf-faq-item"
                    onToggle={(e) => marcarExpansao(e.currentTarget as HTMLDetailsElement)}
                  >
                    <summary aria-expanded={false}>{semRepeticao(f.q)}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            )}

            {linkDaPagina && (
              <Link
                className="sf-mais-pagina"
                to="/solucoes/$solucao/$categoria/$nucleo"
                params={{ solucao: solucaoSlug, categoria: categoriaSlug, nucleo: nucleoSlug }}
                hash={produto.id}
              >
                Ver a página desta solução
                <span aria-hidden> →</span>
              </Link>
            )}
          </div>
        </details>
      )}

      <div className="sf-prod-acoes">
        {/* A variação de CTA que o Carlos pediu: quem tem endereço de
            contratação confirmado oferece "Contratar online"; o resto segue
            pela cotação, com o consultor. */}
        {online ? (
          <a className="sf-btn sf-btn-p" href={online} target="_blank" rel="noopener noreferrer">
            Contratar online
            <ExternalLink size={14} aria-hidden />
          </a>
        ) : (
          <a
            className="sf-btn sf-btn-p"
            href={whatsappUrl(`Olá! Quero solicitar cotação de ${produto.nome} (${solucaoNome}).`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Solicitar cotação
          </a>
        )}

        {/* O caminho que o modal oferecia e que não podia se perder com ele. */}
        {aoFormulario && (
          <button
            type="button"
            className="sf-btn sf-btn-s"
            onClick={() => aoFormulario(produto.nome)}
          >
            {FORM} Preencher o formulário
          </button>
        )}

        <BotaoFavoritar
          chave={`${solucaoSlug}/${categoriaSlug}/${nucleoSlug}/${produto.id}`}
          nome={produto.nome}
        />
      </div>
    </li>
  );
}

/**
 * Estilo da solução e dos controles que a cercam. Mora aqui, e não na sanfona
 * da vertical, porque a página do caminho usa o mesmo item e precisa das
 * mesmas regras.
 */
export const ESTILO_SOLUCAO = `
.sf-filtros { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin: 26px 0 22px; }
.sf-filtro {
  font-family: var(--fb); font-size: .82rem; font-weight: 600; padding: 8px 15px;
  border-radius: 999px; border: 1px solid var(--c2); background: transparent;
  color: var(--ctxt); cursor: pointer; transition: border-color var(--t), color var(--t), background var(--t);
}
.sf-filtro:hover { border-color: var(--vp); color: var(--preto); }
.sf-filtro[aria-pressed="true"] { background: var(--vp); border-color: var(--vp); color: #fff; }
.sf-conta { font-family: var(--fl); font-size: .74rem; letter-spacing: .08em; text-transform: uppercase; color: #8A93A0; margin-left: 4px; }

.sf-prods { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; grid-template-columns: 1fr; }
@media (min-width: 900px) { .sf-prods { grid-template-columns: repeat(2, 1fr); } }
.sf-prod {
  display: block; border: 1px solid var(--c2); border-radius: var(--rs);
  padding: 16px 18px; background: #fff; scroll-margin-top: 110px;
}
.sf-prod:target { border-color: var(--vp); box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp) 16%, transparent); }
.sf-prod-foto { margin: -16px -18px 14px; }
.sf-prod-foto img { display: block; width: 100%; height: 150px; object-fit: cover; }
.sf-prod-topo { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; margin-bottom: 7px; }
.sf-prod h4 { font-family: var(--fd); font-size: 1.02rem; font-weight: 600; color: var(--preto); margin: 0; letter-spacing: -.01em; }
.sf-perfil { font-family: var(--fl); font-size: .66rem; letter-spacing: .08em; text-transform: uppercase; color: #8A93A0; white-space: nowrap; flex: none; }
.sf-prod > p { font-family: var(--fb); font-size: .91rem; line-height: 1.55; color: var(--ctxt); margin: 0; }

.sf-mais { margin-top: 10px; }
.sf-mais > summary {
  list-style: none; cursor: pointer; display: inline-flex; align-items: center; gap: 7px;
  font-family: var(--fl); font-size: .72rem; letter-spacing: .09em; text-transform: uppercase;
  font-weight: 600; color: var(--vp);
}
.sf-mais > summary::-webkit-details-marker { display: none; }
.sf-mais > summary::after { content: "+"; font-size: 1rem; line-height: 1; }
.sf-mais[open] > summary::after { content: "\\2212"; }
.sf-mais > summary:focus-visible { outline: 2px solid var(--vp); outline-offset: 2px; }
.sf-mais-corpo { display: grid; gap: 8px; margin-top: 10px; }
.sf-mais-corpo > p {
  font-family: var(--fb); font-size: .85rem; line-height: 1.5; color: #6B7482; margin: 0;
}
.sf-mais-corpo strong { font-weight: 600; color: var(--preto); }
.sf-mais-pagina {
  justify-self: start; font-family: var(--fl); font-size: .72rem; letter-spacing: .09em;
  text-transform: uppercase; font-weight: 600; color: var(--vp); text-decoration: none;
}
.sf-mais-pagina:hover { text-decoration: underline; }

.sf-faq { display: grid; gap: 2px; border-top: 1px solid var(--c2); padding-top: 8px; margin-top: 2px; }
.sf-faq-item > summary {
  list-style: none; cursor: pointer; font-family: var(--fb); font-size: .84rem;
  font-weight: 600; color: var(--preto); padding: 5px 0; display: flex; gap: 8px; align-items: baseline;
}
.sf-faq-item > summary::-webkit-details-marker { display: none; }
.sf-faq-item > summary::before { content: "+"; color: var(--vp); font-weight: 700; flex: none; }
.sf-faq-item[open] > summary::before { content: "\\2212"; }
.sf-faq-item > summary:focus-visible { outline: 2px solid var(--vp); outline-offset: 2px; }
.sf-faq-item > p { font-family: var(--fb); font-size: .84rem; line-height: 1.55; color: #6B7482; margin: 0 0 8px 16px; }

.sf-prod-acoes { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.sf-btn {
  display: inline-flex; align-items: center; gap: 7px; border-radius: 999px; padding: 9px 17px;
  font-family: var(--fb); font-size: .83rem; font-weight: 600; text-decoration: none;
  border: 1px solid transparent; cursor: pointer;
  transition: background var(--t), border-color var(--t), color var(--t);
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
`;
