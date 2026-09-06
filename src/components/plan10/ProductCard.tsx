import type { Product } from "@/data/solutions";

interface Props {
  product: Product;
  nucleoNome: string;
  onPrimary?: () => void;
}

const ARROW = (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/**
 * Produto em tile compacto: só o nome e a seta, para a pessoa varrer a lista
 * sem rolar (pedido do cliente). A descrição, os itens inclusos, o público e o
 * FAQ ficam no pop-up que abre no toque, não aqui.
 */
export function ProductCard({ product, onPrimary }: Props) {
  return (
    <button type="button" className="prod-tile" onClick={onPrimary}>
      <span className="prod-tile-name">{product.nome}</span>
      <span className="prod-tile-go" aria-hidden>
        {ARROW}
      </span>
    </button>
  );
}
