import type { Product } from "@/data/solutions";
import { FONTS, isRealUrl, whatsappUrl } from "@/lib/plan10";

interface Props {
  product: Product;
  accent: string;
  primary: string;
  nucleoNome: string;
  onPrimary?: () => void;
}

export function ProductCard({ product, accent, primary, nucleoNome, onPrimary }: Props) {
  const hasLink = isRealUrl(product.linkPorto);
  const secondaryHref = whatsappUrl(
    `Olá! Tenho interesse em ${product.nome} (${nucleoNome}). Podemos conversar?`,
  );
  const linkPendente = !hasLink && product.linkPorto !== "Não se aplica";

  return (
    <article
      data-link-pendente={linkPendente ? "true" : undefined}
      style={{
        borderRadius: 8,
        border: "1px solid rgba(246,241,231,0.12)",
        background: "rgba(246,241,231,0.03)",
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        color: "#F6F1E7",
      }}
    >
      <header style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <span
          style={{
            display: "inline-block",
            width: "fit-content",
            fontFamily: FONTS.eyebrow,
            fontSize: "0.7rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: accent,
            paddingBottom: 4,
            borderBottom: `1px solid ${accent}`,
          }}
        >
          {product.perfil === "PF" ? "Para você" : "Para empresa"}
        </span>
        <h3
          style={{
            fontFamily: FONTS.display,
            fontSize: "1.5rem",
            lineHeight: 1.2,
            fontWeight: 500,
            margin: 0,
          }}
        >
          {product.nome}
        </h3>
        <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", lineHeight: 1.6, opacity: 0.82, margin: 0 }}>
          {product.descricao}
        </p>
      </header>

      <Section label="Características" fonts>
        {product.caracteristicas.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </Section>

      <Section label="O que está incluído">
        {product.itensInclusos.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </Section>

      <div style={{ fontFamily: FONTS.body, fontSize: "0.92rem", lineHeight: 1.6, opacity: 0.82 }}>
        <p style={{ margin: 0 }}>
          <strong style={{ fontWeight: 600, opacity: 0.95 }}>A quem se destina: </strong>
          {product.aQuemSeDestina}
        </p>
        <p style={{ margin: "10px 0 0" }}>
          <strong style={{ fontWeight: 600, opacity: 0.95 }}>Benefícios: </strong>
          {product.beneficios}
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 4 }}>
        {hasLink && (
          <a
            href={product.linkPorto}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "12px 20px",
              borderRadius: 8,
              background: "#E05A20",
              color: "#F6F1E7",
              fontFamily: FONTS.eyebrow,
              fontSize: "0.82rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              textDecoration: "none",
              border: `1px solid #E05A20`,
            }}
          >
            Contratar online
          </a>
        )}
        <a
          href={secondaryHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "12px 20px",
            borderRadius: 8,
            background: "transparent",
            color: "#F6F1E7",
            fontFamily: FONTS.eyebrow,
            fontSize: "0.82rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
            textDecoration: "none",
            border: `1px solid ${accent}`,
          }}
        >
          {product.ctaSecundario}
        </a>
        {onPrimary && !hasLink && product.linkPorto === "Não se aplica" && (
          <button
            onClick={onPrimary}
            style={{
              padding: "12px 20px",
              borderRadius: 8,
              background: primary,
              color: "#F6F1E7",
              fontFamily: FONTS.eyebrow,
              fontSize: "0.82rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            {product.ctaPrimario}
          </button>
        )}
      </div>
    </article>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
  fonts?: boolean;
}) {
  return (
    <div>
      <p
        style={{
          fontFamily: FONTS.eyebrow,
          fontSize: "0.72rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          margin: "0 0 8px",
          opacity: 0.7,
        }}
      >
        {label}
      </p>
      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          fontFamily: FONTS.body,
          fontSize: "0.92rem",
          lineHeight: 1.55,
          opacity: 0.88,
        }}
      >
        {children}
      </ul>
    </div>
  );
}
