import { useEffect } from "react";

/**
 * Leva a página até a trilha de navegação assim que ela abre.
 *
 * O visitante que clica numa solução, num caminho ou numa modalidade já sabe o
 * que quer ver: a lista do nível seguinte. Sem isso ele cai no topo do hero e
 * precisa rolar de novo a cada clique. A trilha é o ponto de parada porque fica
 * logo acima da lista e mantém visível onde a pessoa está.
 *
 * Só desce, nunca sobe: se a trilha já estiver visível, nada acontece. Respeita
 * quem pediu menos movimento no sistema, e aí o salto é direto, sem animação.
 */
export function useRolarAteTrilha(chave: string) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelado = false;

    // dois quadros de espera: o layout precisa assentar antes de medir, senão a
    // posição muda quando as imagens do hero entram.
    const id = window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() => {
        if (cancelado) return;
        const trilha = document.querySelector<HTMLElement>("[data-trilha]");
        if (!trilha) return;

        const cabecalho = document.querySelector<HTMLElement>("header");
        const folga = cabecalho?.offsetHeight ?? 0;
        const destino = trilha.getBoundingClientRect().top + window.scrollY - folga;
        if (destino - window.scrollY < 24) return;

        const semAnimacao = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: destino, behavior: semAnimacao ? "auto" : "smooth" });
      }),
    );

    return () => {
      cancelado = true;
      window.cancelAnimationFrame(id);
    };
  }, [chave]);
}
