import { useEffect, useRef } from "react";
import type { Product } from "@/data/solutions";
import { whatsappUrl, isRealUrl } from "@/lib/plan10";

interface Props {
  produto: Product | null;
  /** Nome da modalidade, usado na mensagem do WhatsApp para dar contexto. */
  nucleoNome: string;
  onClose: () => void;
  /** Leva ao formulário já filtrado pelo produto escolhido. */
  onFormulario: (produtoNome: string) => void;
}

const WA = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.5-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5 0-.2 0-.4-.1-.5-.1-.1-.6-1.5-.9-2.1-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.2-.3-.3-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
  </svg>
);

const FORM = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden>
    <path d="M4 5h16M4 10h16M4 15h10" />
  </svg>
);

/**
 * Escolha de caminho ao tocar num produto: conversa imediata no WhatsApp ou
 * formulário. O formulário volta filtrado pelo produto, então a pessoa não
 * precisa procurar de novo o que ela já escolheu.
 */
export function ProductChooser({ produto, nucleoNome, onClose, onFormulario }: Props) {
  const primeiroBotao = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!produto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const scrollAntes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    primeiroBotao.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = scrollAntes;
    };
  }, [produto, onClose]);

  if (!produto) return null;

  const mensagem = `Olá! Tenho interesse em ${produto.nome} (${nucleoNome}). Pode me orientar?`;
  const linkDireto = isRealUrl(produto.linkPorto) ? produto.linkPorto : null;

  return (
    <div className="p10-chooser" role="presentation" onClick={onClose}>
      <div
        className="p10-chooser-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chooser-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="p10-chooser-x" onClick={onClose} aria-label="Fechar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <p className="eyebrow">{nucleoNome}</p>
        <h3 id="chooser-titulo">{produto.nome}</h3>

        <p className="p10-chooser-pergunta">Como você prefere seguir?</p>

        <div className="p10-chooser-acoes">
          {linkDireto && (
            <a
              className="btn btn-primary"
              href={linkDireto}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
            >
              Contratar online
            </a>
          )}
          <a
            ref={primeiroBotao}
            className={linkDireto ? "btn btn-outline-light" : "btn btn-primary"}
            href={whatsappUrl(mensagem)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            {WA} Falar agora no WhatsApp
          </a>
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() => {
              onFormulario(produto.nome);
              onClose();
            }}
          >
            {FORM} Preencher o formulário
          </button>
        </div>

        <p className="p10-chooser-nota">
          {linkDireto
            ? "A contratação online é imediata. Nos outros caminhos um consultor retorna com o próximo passo, sem compromisso."
            : "Nos dois caminhos um consultor retorna com o próximo passo. Sem compromisso."}
        </p>
      </div>
    </div>
  );
}
