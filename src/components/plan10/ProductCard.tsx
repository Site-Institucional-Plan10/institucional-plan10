import type { Product } from "@/data/solutions";

interface Props {
  product: Product;
  nucleoNome: string;
  onPrimary?: () => void;
}

const ARROW = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

/**
 * Produto em tile compacto, para visualização rápida (pedido do cliente: encontrar
 * a opção sem rolar). Só o nome e a seta.
 *
 * O toque sempre abre a escolha de caminho. Antes, produto com link de contratação
 * saía do site sem aviso; agora esse link vira uma das opções da escolha, ao lado
 * do WhatsApp e do formulário.
 */
export function ProductCard({ product, onPrimary }: Props) {
  return (
    <button type="button" className="prod-tile" onClick={onPrimary}>
      <span className="prod-tile-name">{product.nome}</span>
      <span className="prod-tile-go" aria-hidden>{ARROW}</span>
    </button>
  );
}
