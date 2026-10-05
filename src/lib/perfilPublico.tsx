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
  /**
   * Verdadeiro depois de a preferência salva ter sido lida.
   *
   * Existe por uma questão de ordem. O efeito que lê o storage roda aqui, no
   * provedor, e os efeitos dos componentes filhos rodam antes do do pai. Quem
   * decide algo a partir do público, como a sanfona que um link pediu para
   * abrir, decidiria no quadro em que o público ainda é "todos" e veria a
   * escolha salva chegar depois, desfazendo o que acabou de fazer. Com isto,
   * espera-se o valor definitivo e decide-se uma vez.
   */
  pronto: boolean;
}

const Ctx = createContext<Contexto>({ perfil: "todos", definirPerfil: () => {}, pronto: false });

export function ProvedorPerfil({ children }: { children: React.ReactNode }) {
  const [perfil, setPerfil] = useState<PerfilPublico | "todos">("todos");
  const [pronto, setPronto] = useState(false);

  // só depois da hidratação, senão servidor e cliente divergem no primeiro quadro
  useEffect(() => {
    try {
      const salvo = window.localStorage.getItem(CHAVE);
      if (salvo === "pessoal" || salvo === "empresa") setPerfil(salvo);
    } catch {
      /* storage indisponível: segue com "todos" */
    }
    setPronto(true);
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

  return <Ctx.Provider value={{ perfil, definirPerfil, pronto }}>{children}</Ctx.Provider>;
}

export function usarPerfil() {
  return useContext(Ctx);
}
