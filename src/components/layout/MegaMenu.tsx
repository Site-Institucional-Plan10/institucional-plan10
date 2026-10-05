import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { DESTAQUES, VERTICAIS } from "@/lib/verticais";

/**
 * Mega menu das cinco verticais, como pede o pacote de integração: cada uma com
 * seis destaques, três para Você e família e três para Sua empresa, mais o
 * caminho para o resto do catálogo.
 *
 * Os destaques não são uma lista escrita à mão aqui. Eles vêm de `verticais.ts`,
 * que resolve cada um contra o catálogo real por nome e perfil, então menu,
 * busca e sanfonas apontam sempre para o mesmo dado.
 *
 * Fecha com Esc e devolve o foco para o botão que abriu, fecha ao clicar fora e
 * ao navegar. O painel inteiro é um só nó de foco, sem armadilha de teclado.
 */
export function MegaMenu({
  aberto,
  aoFechar,
  idPainel,
  refGatilho,
}: {
  aberto: boolean;
  aoFechar: () => void;
  idPainel: string;
  refGatilho: React.RefObject<HTMLButtonElement | null>;
}) {
  const painel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;
    function porTecla(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      aoFechar();
      refGatilho.current?.focus();
    }
    function porClique(e: MouseEvent) {
      const alvo = e.target as Node;
      if (painel.current?.contains(alvo) || refGatilho.current?.contains(alvo)) return;
      aoFechar();
    }
    document.addEventListener("keydown", porTecla);
    document.addEventListener("mousedown", porClique);
    return () => {
      document.removeEventListener("keydown", porTecla);
      document.removeEventListener("mousedown", porClique);
    };
  }, [aberto, aoFechar, refGatilho]);

  return (
    <div id={idPainel} ref={painel} className="p10-mega" hidden={!aberto}>
      <style>{`
        .p10-mega {
          position: absolute; left: 0; right: 0; top: 100%;
          background: #fff; border-top: 1px solid #E8E8E8;
          box-shadow: 0 24px 48px rgba(12,35,64,.14);
          z-index: 45;
        }
        .p10-mega[hidden] { display: none; }
        .p10-mega-grid {
          max-width: 1180px; margin: 0 auto; padding: 26px 32px 30px;
          display: grid; gap: 26px 28px;
          grid-template-columns: repeat(5, minmax(0, 1fr));
        }
        @media (max-width: 1100px) { .p10-mega-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 640px) { .p10-mega-grid { grid-template-columns: 1fr; padding: 20px; } }
        .p10-mega-col > strong {
          display: flex; align-items: center; gap: 8px;
          font-family: var(--font-sans); font-size: .98rem; font-weight: 700;
          color: #0E2438; padding-bottom: 10px; border-bottom: 1px solid #ECE9E1;
        }
        .p10-mega-col > strong::before {
          content: ""; width: 9px; height: 9px; border-radius: 3px; background: var(--acento);
        }
        .p10-mega-sub {
          font-family: var(--font-sans); font-size: .68rem; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase; color: #8A8172;
          margin: 14px 0 6px;
        }
        .p10-mega-col a {
          display: block; padding: 5px 0; text-decoration: none;
          font-size: .88rem; line-height: 1.35; color: #3A4654;
          border-bottom: 1px solid transparent; transition: color .18s ease;
        }
        .p10-mega-col a:hover { color: var(--acento); }
        .p10-mega-col a:focus-visible { outline: 2px solid #C45016; outline-offset: 2px; }
        .p10-mega-todas {
          margin-top: 14px; font-size: .78rem; font-weight: 700;
          color: var(--acento) !important; letter-spacing: .01em;
        }
      `}</style>

      <div className="p10-mega-grid">
        {VERTICAIS.map((v) => (
          <div
            key={v.id}
            className="p10-mega-col"
            style={{ ["--acento" as string]: v.cor } as React.CSSProperties}
          >
            <strong>Plan10 {v.label}</strong>

            <p className="p10-mega-sub">Você e família</p>
            {DESTAQUES[v.id].pessoal.map((item) => (
              <Link
                key={item.chave}
                to={item.rota.to}
                params={item.rota.params}
                search={item.rota.search}
                hash={item.rota.hash}
                onClick={aoFechar}
              >
                {item.nome}
              </Link>
            ))}

            <p className="p10-mega-sub">Sua empresa</p>
            {DESTAQUES[v.id].empresa.map((item) => (
              <Link
                key={item.chave}
                to={item.rota.to}
                params={item.rota.params}
                search={item.rota.search}
                hash={item.rota.hash}
                onClick={aoFechar}
              >
                {item.nome}
              </Link>
            ))}

            <Link
              to="/solucoes/$solucao"
              params={{ solucao: v.hub }}
              className="p10-mega-todas"
              onClick={aoFechar}
            >
              Ver todas as soluções →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
