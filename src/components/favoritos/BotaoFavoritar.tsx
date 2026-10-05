import { Heart } from "lucide-react";
import { usarFavoritos, LIMITE_FAVORITOS } from "@/lib/favoritos";

/**
 * O botão que junta uma solução ao resumo de cotação.
 *
 * É um botão de alternância de verdade: `aria-pressed` diz o estado, então o
 * leitor de tela anuncia "Favoritar, não pressionado" e "Favoritado,
 * pressionado" sem depender da cor do coração. O rótulo também muda, que é o
 * que o wireframe pede.
 *
 * O texto evita prometer compra: favoritar reúne interesses para a conversa.
 */
export function BotaoFavoritar({ chave, nome }: { chave: string; nome: string }) {
  const { tem, alternar, quantidade } = usarFavoritos();
  const ativo = tem(chave);
  const cheio = !ativo && quantidade >= LIMITE_FAVORITOS;

  return (
    <button
      type="button"
      className="p10-fav"
      aria-pressed={ativo}
      aria-label={`${ativo ? "Favoritado" : "Favoritar"}: ${nome}`}
      disabled={cheio}
      title={cheio ? `O resumo comporta ${LIMITE_FAVORITOS} soluções.` : undefined}
      onClick={() => alternar(chave)}
    >
      <Heart size={15} aria-hidden fill={ativo ? "currentColor" : "none"} />
      <span>{ativo ? "Favoritado" : "Favoritar"}</span>
    </button>
  );
}

/** Folha do botão, montada uma vez por página que o usa. */
export function EstiloFavoritar() {
  return (
    <style>{`
      .p10-fav {
        display: inline-flex; align-items: center; gap: 7px; border-radius: 999px;
        padding: 9px 15px; font-family: var(--fb, var(--font-sans)); font-size: .83rem;
        font-weight: 600; cursor: pointer; background: transparent; color: #5B6472;
        border: 1px solid var(--c2, #E6E1D6); transition: border-color .2s, color .2s, background .2s;
      }
      .p10-fav:hover:enabled { border-color: #C45016; color: #C45016; }
      .p10-fav[aria-pressed="true"] { border-color: #C45016; color: #C45016; background: #FDF4EF; }
      .p10-fav:disabled { opacity: .45; cursor: not-allowed; }
      .p10-fav:focus-visible { outline: 2px solid #C45016; outline-offset: 2px; }
      .p10-fav svg { display: block; }
    `}</style>
  );
}
