import { useEffect } from "react";

/**
 * Abre a página no topo, deixa o hero à vista por um instante e só então desce,
 * devagar, até a trilha de navegação.
 *
 * O visitante que clica numa solução, num caminho ou numa modalidade já sabe o
 * que quer ver: a lista do nível seguinte. Descer sozinho até a trilha poupa um
 * gesto a cada clique e deixa a navegação sendo só uma sequência de escolhas.
 * A descida é lenta de propósito, para a pessoa ver o hero antes de a lista
 * chegar, e não um salto que esconde metade da página.
 *
 * Só desce, nunca sobe. Qualquer gesto do visitante interrompe na hora, porque
 * disputar a rolagem com quem já está rolando é o pior resultado possível.
 * Quem pediu menos movimento no sistema fica no topo e rola por conta própria.
 */

const ESPERA_NO_HERO = 900;
const VELOCIDADE = 2.2; // ms por pixel percorrido
const DURACAO_MIN = 1200;
const DURACAO_MAX = 2400;

function suavizar(t: number) {
  // easeInOutCubic: sai devagar, ganha corpo no meio e encosta sem freada seca.
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function useRolarAteTrilha(chave: string) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let quadro = 0;
    let pausa = 0;
    let cancelado = false;

    function parar() {
      cancelado = true;
      window.clearTimeout(pausa);
      window.cancelAnimationFrame(quadro);
      gestos.forEach((g) => window.removeEventListener(g, parar));
    }

    const gestos = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    gestos.forEach((g) => window.addEventListener(g, parar, { passive: true }));

    // A página sempre começa no topo, com o hero inteiro à vista.
    window.scrollTo(0, 0);

    pausa = window.setTimeout(() => {
      if (cancelado) return;

      const trilha = document.querySelector<HTMLElement>("[data-trilha]");
      if (!trilha) return parar();

      const cabecalho = document.querySelector<HTMLElement>("header");
      const folga = cabecalho?.offsetHeight ?? 0;
      const partida = window.scrollY;
      const destino = trilha.getBoundingClientRect().top + partida - folga;
      const curso = destino - partida;
      if (curso < 24) return parar();

      const duracao = Math.min(DURACAO_MAX, Math.max(DURACAO_MIN, curso * VELOCIDADE));
      const inicio = performance.now();

      function passo(agora: number) {
        if (cancelado) return;
        const t = Math.min(1, (agora - inicio) / duracao);
        window.scrollTo(0, partida + curso * suavizar(t));
        if (t < 1) quadro = window.requestAnimationFrame(passo);
        else parar();
      }

      quadro = window.requestAnimationFrame(passo);
    }, ESPERA_NO_HERO);

    return parar;
  }, [chave]);
}
