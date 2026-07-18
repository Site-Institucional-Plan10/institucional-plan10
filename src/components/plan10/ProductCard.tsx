import type { Product } from "@/data/solutions";
import { isRealUrl, whatsappUrl } from "@/lib/plan10";

interface Props {
  product: Product;
  nucleoNome: string;
  onPrimary?: () => void;
}

// WhatsApp icon
const WA = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.5-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5 0-.2 0-.4-.1-.5-.1-.1-.6-1.5-.9-2.1-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.2-.3-.3-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.7 0-3.3-.5-4.7-1.3l-.3-.2-3.5.9.9-3.4-.2-.4C3.4 14.6 3 13.3 3 12c0-5 4-9 9-9s9 4 9 9-4 8.3-9 8.3z"/>
  </svg>
);

export function ProductCard({ product, nucleoNome, onPrimary }: Props) {
  const hasLink = isRealUrl(product.linkPorto);
  const waHref = whatsappUrl(
    `Olá! Tenho interesse em ${product.nome} (${nucleoNome}). Podemos conversar?`,
  );

  return (
    <article className="prod-item">
      <div className="prod-head">
        <h3>{product.nome}</h3>
        <span className="badge">{product.perfil === "PF" ? "Para você" : "Para empresa"}</span>
      </div>
      <p className="desc">{product.descricao}</p>

      {product.caracteristicas.length > 0 && (
        <ul>
          {product.caracteristicas.slice(0, 5).map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      )}

      {product.aQuemSeDestina && (
        <p className="prod-meta">
          <strong>A quem se destina:</strong> {product.aQuemSeDestina}
        </p>
      )}

      {product.faq && product.faq.length > 0 && (
        <details className="prod-faq">
          <summary>Perguntas frequentes ({product.faq.length})</summary>
          <div className="prod-faq-list">
            {product.faq.map((f, i) => (
              <div key={i} className="prod-faq-item">
                <p className="q">{f.q}</p>
                <p className="a">{f.a}</p>
              </div>
            ))}
          </div>
        </details>
      )}

      <div className="prod-ctas">
        {hasLink ? (
          <a href={product.linkPorto} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Contratar online
          </a>
        ) : (
          onPrimary && (
            <button type="button" onClick={onPrimary} className="btn btn-primary">
              {product.ctaPrimario || "Falar com um consultor"}
            </button>
          )
        )}
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
          {WA} {product.ctaSecundario || "WhatsApp"}
        </a>
      </div>
    </article>
  );
}
