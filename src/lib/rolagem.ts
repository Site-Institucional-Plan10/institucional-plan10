import { useEffect, useLayoutEffect } from "react";

/**
 * Abre a página no topo e, logo depois, desce sozinha até a trilha de navegação.
 *
 * Toda rolagem daqui usa behavior "instant". O site tem scroll-behavior smooth
 * no html, para os links de âncora, e sem o instant o navegador anima também o
 * salto ao topo (a página sobe sozinha na frente do visitante) e anima cada
 * quadro do tween, que aí briga com o quadro seguinte e sai embolado.
 *
 * O visitante que clica numa solução, num caminho ou numa modalidade já sabe o
 * que quer ver: a lista do nível seguinte. Descer sozinho até a trilha poupa um
 * gesto a cada clique e deixa a navegação sendo só uma sequência de escolhas.
 * A descida começa quase junto com a página e é lenta de propósito, para a
 * pessoa ver o hero enquanto a lista chega, e não um salto que esconde metade
 * da página.
 *
 * Só desce, nunca sobe. Qualquer gesto do visitante interrompe na hora, porque
 * disputar a rolagem com quem já está rolando é o pior resultado possível.
 * Quem pediu menos movimento no sistema fica no topo e rola por conta própria.
 */

const ESPERA_NO_HERO = 350;
const VELOCIDADE = 2.2; // ms por pixel percorrido
const DURACAO_MIN = 1200;
const DURACAO_MAX = 2400;

function suavizar(t: number) {
  // easeInOutSine: a curva mais mansa das que aceleram e freiam. O pico de
  // velocidade fica em 1,57x a média, contra 2x do cubic, então o meio do
  // percurso não dá o solavanco que fazia a descida parecer um pulo.
  return (1 - Math.cos(Math.PI * t)) / 2;
}

// No servidor não existe layout para medir, e o React avisa se useLayoutEffect
// roda lá. No navegador ele é obrigatório: precisa ser antes da pintura.
const useEfeitoDeLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function useRolarAteTrilha(chave: string) {
  /**
   * O router roda com scrollRestoration ligado, então a página nova nasce na
   * posição em que a anterior estava. Sem isto ela pinta um quadro no meio do
   * conteúdo e só depois pula para o topo, que é a sensação de a página subir
   * sozinha. Zerar aqui, antes da pintura, faz o primeiro quadro já ser o topo.
   */
  useEfeitoDeLayout(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [chave]);

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

    window.scrollTo({ top: 0, behavior: "instant" });

    pausa = window.setTimeout(() => {
      if (cancelado) return;
      quadro = window.requestAnimationFrame(medirEDescer);
    }, ESPERA_NO_HERO);

    function medirEDescer() {
      if (cancelado) return;

      // A restauração do router pode repor a posição depois da pintura. Como
      // ninguém mexeu na rolagem até aqui (qualquer gesto teria cancelado), o
      // topo é reafirmado antes de medir e a descida sempre parte de zero.
      if (window.scrollY !== 0) window.scrollTo({ top: 0, behavior: "instant" });

      const trilha = document.querySelector<HTMLElement>("[data-trilha]");
      if (!trilha) return parar();

      const cabecalho = document.querySelector<HTMLElement>("header");
      const folga = cabecalho?.offsetHeight ?? 0;
      const curso = trilha.getBoundingClientRect().top - folga;
      if (curso < 24) return parar();

      const duracao = Math.min(DURACAO_MAX, Math.max(DURACAO_MIN, curso * VELOCIDADE));
      const inicio = performance.now();

      function passo(agora: number) {
        if (cancelado) return;
        const t = Math.min(1, (agora - inicio) / duracao);
        window.scrollTo({ top: curso * suavizar(t), behavior: "instant" });
        if (t < 1) quadro = window.requestAnimationFrame(passo);
        else parar();
      }

      quadro = window.requestAnimationFrame(passo);
    }

    return parar;
  }, [chave]);
}
