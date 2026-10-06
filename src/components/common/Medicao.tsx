import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Google Analytics 4, ligado ao consentimento do aviso de cookies.
 *
 * Três regras, nessa ordem:
 *
 * Sem `VITE_GA_ID` configurado, este componente não faz absolutamente nada.
 * Nenhum script, nenhuma requisição. É o estado em que o site fica até alguém
 * criar a propriedade e pôr o ID na Vercel.
 *
 * Com o ID, ainda assim só carrega depois de a pessoa escolher "Aceitar todos"
 * no aviso. Quem fica em "Apenas essenciais" não é medido, que é o que a LGPD
 * pede e o que o aviso promete. A escolha mora em `plan10_cookies`.
 *
 * E escuta o evento do próprio aviso, para começar a medir no instante em que a
 * pessoa aceita, sem esperar ela recarregar a página.
 *
 * Como o site é de página única, a visita de cada rota é enviada à mão: o gtag
 * só conta sozinho o primeiro carregamento.
 */
const ID = import.meta.env.VITE_GA_ID as string | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function consentiu(): boolean {
  try {
    return window.localStorage.getItem("plan10_cookies") === "all";
  } catch {
    return false;
  }
}

function carregar() {
  if (!ID || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  // a visita de cada rota vai à mão logo abaixo; sem isso a primeira contaria duas vezes
  window.gtag("config", ID, { send_page_view: false });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
  document.head.appendChild(s);
}

export function Medicao() {
  const caminho = useRouterState({ select: (s) => s.location.pathname });
  const ligado = useRef(false);
  /** Última rota já contada, para a primeira página não entrar duas vezes. */
  const ultima = useRef<string | null>(null);

  useEffect(() => {
    if (!ID || typeof window === "undefined") return;

    function tentar() {
      if (ligado.current || !consentiu()) return;
      ligado.current = true;
      carregar();
      const agora = window.location.pathname;
      ultima.current = agora;
      window.gtag?.("event", "page_view", { page_path: agora });
    }

    tentar();
    window.addEventListener("plan10:consentimento", tentar);
    return () => window.removeEventListener("plan10:consentimento", tentar);
  }, []);

  // troca de rota: o gtag não enxerga navegação de página única
  useEffect(() => {
    if (!ID || !ligado.current) return;
    if (ultima.current === caminho) return;
    ultima.current = caminho;
    window.gtag?.("event", "page_view", { page_path: caminho });
  }, [caminho]);

  return null;
}
