import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { PerfilPublico } from "@/lib/verticais";

/**
 * Qual público a pessoa escolheu na navegação rápida: Você e família ou Sua
 * empresa.
 *
 * Fica num contexto para a barra fixa, a descoberta da Home e, adiante, as
 * sanfonas e os favoritos lerem a mesma escolha, em vez de cada tela manter a
 * sua. É o mesmo princípio do modelo único do catálogo.
 *
 * Guarda no navegador só a preferência de navegação, que não é dado pessoal.
 * A leitura é protegida porque janela anônima e navegador com dados de site
 * bloqueados lançam ao acessar o storage.
 */
const CHAVE = "plan10:perfil";

interface Contexto {
  perfil: PerfilPublico | "todos";
  definirPerfil: (p: PerfilPublico | "todos") => void;
}

const Ctx = createContext<Contexto>({ perfil: "todos", definirPerfil: () => {} });

export function ProvedorPerfil({ children }: { children: React.ReactNode }) {
  const [perfil, setPerfil] = useState<PerfilPublico | "todos">("todos");

  // só depois da hidratação, senão servidor e cliente divergem no primeiro quadro
  useEffect(() => {
    try {
      const salvo = window.localStorage.getItem(CHAVE);
      if (salvo === "pessoal" || salvo === "empresa") setPerfil(salvo);
    } catch {
      /* storage indisponível: segue com "todos" */
    }
  }, []);

  const definirPerfil = useCallback((p: PerfilPublico | "todos") => {
    setPerfil(p);
    try {
      if (p === "todos") window.localStorage.removeItem(CHAVE);
      else window.localStorage.setItem(CHAVE, p);
    } catch {
      /* sem storage, a escolha vale só nesta navegação */
    }
  }, []);

  return <Ctx.Provider value={{ perfil, definirPerfil }}>{children}</Ctx.Provider>;
}

export function usarPerfil() {
  return useContext(Ctx);
}
