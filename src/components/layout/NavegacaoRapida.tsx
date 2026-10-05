import { Link } from "@tanstack/react-router";
import { ChartNoAxesCombined, Handshake, HeartPulse, KeyRound, ShieldCheck } from "lucide-react";
import { VERTICAIS } from "@/lib/verticais";
import { usarPerfil } from "@/lib/perfilPublico";
import { getWhatsAppUrl } from "@/lib/utils";

/**
 * Navegação rápida fixa, presente na Home e nas subpáginas.
 *
 * Tem as três partes que o pacote de integração pede: a alternância entre Você
 * e família e Sua empresa, os cinco ícones das verticais e o WhatsApp em azul
 * discreto, não no verde berrante.
 *
 * A escolha de público não fica aqui dentro: vem do contexto, então a barra, a
 * descoberta da Home e, adiante, sanfonas e favoritos leem a mesma preferência.
 *
 * No celular a barra não pode cobrir conteúdo, formulário nem aviso de
 * consentimento. Por isso ela declara a própria altura numa variável de CSS, e
 * é essa variável que empurra o rodapé da página e levanta o botão flutuante e
 * o aviso de cookies, em vez de cada um chutar um valor.
 */
const ICONES: Record<string, typeof ShieldCheck> = {
  ShieldCheck,
  HeartPulse,
  ChartNoAxesCombined,
  KeyRound,
  Handshake,
};

export function NavegacaoRapida() {
  const { perfil, definirPerfil } = usarPerfil();

  return (
    <nav className="p10-rapida" aria-label="Navegação rápida">
      <style>{`
        :root { --rapida-altura: 62px; }
        @media (max-width: 720px) { :root { --rapida-altura: 92px; } }

        .p10-rapida {
          position: fixed; z-index: 40; left: 0; right: 0; bottom: 0;
          background: #fff; border-top: 1px solid #DBE2EA;
          box-shadow: 0 -7px 24px rgba(5,31,73,.11);
          font-family: var(--font-sans); color: #0E2438;
        }
        .p10-rapida-in {
          max-width: 1300px; margin: 0 auto; padding: 9px 20px;
          display: flex; align-items: center; gap: 15px;
        }
        .p10-rapida :is(button, a):focus-visible { outline: 2px solid #BD9A4B; outline-offset: 2px; }

        .p10-rapida-perfil {
          display: flex; flex-shrink: 0; border: 1px solid #D5DEEA;
          border-radius: 999px; padding: 3px; gap: 2px;
        }
        .p10-rapida-perfil button {
          border: 0; background: transparent; border-radius: 999px; padding: 8px 11px;
          font-size: .72rem; font-weight: 600; color: #0E2438; cursor: pointer; white-space: nowrap;
          font-family: inherit;
        }
        .p10-rapida-perfil button[aria-pressed="true"] { background: #0E2438; color: #fff; }

        .p10-rapida-areas {
          display: flex; justify-content: space-around; align-items: center; flex: 1; min-width: 0;
        }
        .p10-rapida-areas a {
          display: flex; align-items: center; gap: 6px; padding: 8px 5px;
          color: #0E2438; font-size: .72rem; font-weight: 600; text-decoration: none; white-space: nowrap;
        }
        .p10-rapida-areas a:hover { color: var(--acento); }
        .p10-rapida-areas svg { width: 18px; height: 18px; display: block; }

        .p10-rapida-wa {
          display: inline-flex; align-items: center; gap: 6px; background: #1C4E80; color: #fff;
          border-radius: 999px; padding: 10px 14px; font-size: .72rem; font-weight: 700;
          text-decoration: none; white-space: nowrap;
        }
        .p10-rapida-wa:hover { background: #143A61; }

        @media (max-width: 980px) { .p10-rapida-areas a span { display: none; } }
        @media (max-width: 720px) {
          .p10-rapida-in { display: grid; grid-template-columns: 1fr auto; gap: 5px 8px; padding: 8px 12px; }
          .p10-rapida-perfil { grid-column: 1 / -1; justify-content: center; }
          .p10-rapida-areas { justify-content: space-between; }
          .p10-rapida-wa { padding: 9px 10px; }
          .p10-rapida-wa span { display: none; }
        }

        /* a barra é fixa, então o conteúdo precisa de chão embaixo dela, e o
           aviso de cookies precisa subir a mesma altura para não ficar coberto */
        body { padding-bottom: var(--rapida-altura); }
        .ck { bottom: calc(var(--rapida-altura) + 16px) !important; }
        /* o balão verde flutuante some: a barra já entrega o WhatsApp, e os dois
           juntos ficavam a menos de cem pixels um do outro */
        .whatsapp-floating { display: none !important; }

        @media print { .p10-rapida { display: none; } }
      `}</style>

      <div className="p10-rapida-in">
        <div className="p10-rapida-perfil" role="group" aria-label="Perfil da navegação rápida">
          <button
            type="button"
            aria-pressed={perfil === "pessoal"}
            onClick={() => definirPerfil(perfil === "pessoal" ? "todos" : "pessoal")}
          >
            Você e família
          </button>
          <button
            type="button"
            aria-pressed={perfil === "empresa"}
            onClick={() => definirPerfil(perfil === "empresa" ? "todos" : "empresa")}
          >
            Sua empresa
          </button>
        </div>

        <div className="p10-rapida-areas">
          {VERTICAIS.map((v) => {
            const Icone = ICONES[v.icone] ?? ShieldCheck;
            return (
              <Link
                key={v.id}
                to="/solucoes/$solucao"
                params={{ solucao: v.hub }}
                style={{ ["--acento" as string]: v.cor } as React.CSSProperties}
              >
                <Icone aria-hidden />
                <span>{v.label}</span>
              </Link>
            );
          })}
        </div>

        <a
          className="p10-rapida-wa"
          href={getWhatsAppUrl("default")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.5-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5 0-.2 0-.4-.1-.5-.1-.1-.6-1.5-.9-2.1-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.2-.3-.3-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
          </svg>
          <span>WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
