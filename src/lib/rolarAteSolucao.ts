import { useCallback, useEffect, useRef } from "react";

/**
 * A rolagem até a solução que o link pediu.
 *
 * Dois problemas derrubavam essa rolagem, e os dois são de corrida.
 *
 * O primeiro é o quadro cancelado. O padrão óbvio, `requestAnimationFrame`
 * dentro do efeito e `cancelAnimationFrame` na limpeza dele, tem um buraco
 * quando o efeito depende de algo que ainda vai assentar: o efeito do link
 * roda quando a preferência de público fica pronta, abre as sanfonas e agenda
 * o quadro; o render seguinte troca a identidade de alguma dependência, a
 * limpeza cancela o quadro, e o efeito reentra pela guarda de "já atendi este
 * endereço" sem agendar outro. As sanfonas abriam e a página ficava no topo.
 *
 * O segundo é a restauração de rolagem do router, que repõe a posição depois
 * da pintura. Um `scrollTo` único às vezes chegava antes dela e era desfeito,
 * o que fazia o link profundo funcionar de forma intermitente.
 *
 * Daqui saem as duas respostas: o quadro mora num ref e só morre quando o
 * componente sai, e a rolagem espera a restauração passar e depois é escrita
 * quadro a quadro, como a descida até a trilha já faz. Qualquer gesto do
 * visitante cancela na hora: disputar a rolagem com quem já está rolando é o
 * pior resultado possível.
 */

/** Tempo até a restauração do router ter acontecido e a medida valer. */
const ESPERA = 380;
const VELOCIDADE = 1.1; // ms por pixel percorrido
const DURACAO_MIN = 420;
const DURACAO_MAX = 1100;

function suavizar(t: number) {
  // easeInOutSine, a mesma curva da descida até a trilha
  return (1 - Math.cos(Math.PI * t)) / 2;
}

const GESTOS = ["wheel", "touchstart", "pointerdown", "keydown"] as const;

export function useRolagemAgendada() {
  const cancelar = useRef<(() => void) | null>(null);

  useEffect(
    () => () => {
      cancelar.current?.();
    },
    [],
  );

  return useCallback((alvo: () => Element | null, depois?: () => void) => {
    if (typeof window === "undefined") return;
    cancelar.current?.();

    let espera = 0;
    let quadro = 0;
    const parar = () => {
      window.clearTimeout(espera);
      window.cancelAnimationFrame(quadro);
      GESTOS.forEach((g) => window.removeEventListener(g, parar));
      cancelar.current = null;
    };
    cancelar.current = parar;
    GESTOS.forEach((g) => window.addEventListener(g, parar, { passive: true }));

    espera = window.setTimeout(() => {
      const el = alvo();
      if (!el) return parar();

      const cabecalho = document.querySelector<HTMLElement>("header")?.offsetHeight ?? 0;
      const partida = window.scrollY;
      const destino = Math.max(0, partida + el.getBoundingClientRect().top - cabecalho - 24);
      const curso = destino - partida;

      // já está no lugar: mover por mover só atrapalha quem está lendo
      if (Math.abs(curso) < 8) {
        depois?.();
        return parar();
      }

      /**
       * Sem animação em dois casos: quem pediu menos movimento no sistema, e
       * aba em segundo plano, onde o navegador não entrega quadro nenhum e a
       * rolagem quadro a quadro simplesmente não aconteceria. Link aberto numa
       * aba de fundo tem de estar na posição certa quando a pessoa chegar nela.
       */
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.visibilityState === "hidden"
      ) {
        window.scrollTo({ top: destino, behavior: "instant" });
        depois?.();
        return parar();
      }

      const duracao = Math.min(DURACAO_MAX, Math.max(DURACAO_MIN, Math.abs(curso) * VELOCIDADE));
      const inicio = performance.now();

      const passo = (agora: number) => {
        const t = Math.min(1, (agora - inicio) / duracao);
        window.scrollTo({ top: partida + curso * suavizar(t), behavior: "instant" });
        if (t < 1) {
          quadro = window.requestAnimationFrame(passo);
        } else {
          depois?.();
          parar();
        }
      };
      quadro = window.requestAnimationFrame(passo);
    }, ESPERA);
  }, []);
}
