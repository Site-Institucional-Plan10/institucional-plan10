import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { itemPorChave, type ItemCatalogo } from "@/lib/verticais";

/**
 * Favoritos: interesses reunidos para pedir uma cotação.
 *
 * Favoritar não é comprar nem contratar. O que a seleção faz é juntar as
 * soluções num resumo só, para a conversa com o consultor começar inteira.
 *
 * Mora acima do Outlet, no root, por uma razão de requisito: troca de rota ou
 * de filtro não pode apagar seleção. Um estado dentro de uma página morreria na
 * primeira navegação; aqui ele atravessa a sessão inteira.
 *
 * Guarda apenas as chaves do catálogo, que são identificadores de produto, e
 * nada do que a pessoa escreve. Nome, celular, e-mail e o texto livre do pedido
 * existem só enquanto o formulário está aberto e vão direto para o envio: o
 * pacote pede para não persistir dado pessoal nem texto livre no navegador sem
 * necessidade, e aqui não há necessidade.
 */
const CHAVE_STORAGE = "plan10:favoritos";
const LIMITE = 40;

interface Contexto {
  chaves: string[];
  itens: ItemCatalogo[];
  quantidade: number;
  tem: (chave: string) => boolean;
  alternar: (chave: string) => void;
  remover: (chave: string) => void;
  limpar: () => void;
  aberto: boolean;
  abrir: () => void;
  fechar: () => void;
  /** Verdadeiro depois de ler o que estava guardado, para quem decide esperar. */
  pronto: boolean;
}

const Ctx = createContext<Contexto>({
  chaves: [],
  itens: [],
  quantidade: 0,
  tem: () => false,
  alternar: () => {},
  remover: () => {},
  limpar: () => {},
  aberto: false,
  abrir: () => {},
  fechar: () => {},
  pronto: false,
});

export function ProvedorFavoritos({ children }: { children: React.ReactNode }) {
  const [chaves, setChaves] = useState<string[]>([]);
  const [pronto, setPronto] = useState(false);
  const [aberto, setAberto] = useState(false);
  const primeiro = useRef(true);

  // depois da hidratação, senão servidor e cliente divergem no primeiro quadro
  useEffect(() => {
    try {
      const salvo = window.localStorage.getItem(CHAVE_STORAGE);
      if (salvo) {
        const lista = JSON.parse(salvo);
        if (Array.isArray(lista)) {
          // só chaves que ainda existem no catálogo: produto retirado da
          // planilha não pode ressuscitar como item fantasma no resumo
          setChaves(lista.filter((c) => typeof c === "string" && itemPorChave(c)).slice(0, LIMITE));
        }
      }
    } catch {
      /* storage indisponível ou conteúdo inválido: começa vazio */
    }
    setPronto(true);
  }, []);

  useEffect(() => {
    // a primeira passada é a leitura acima; gravar aqui apagaria o que foi lido
    if (primeiro.current) {
      primeiro.current = false;
      return;
    }
    try {
      if (chaves.length === 0) window.localStorage.removeItem(CHAVE_STORAGE);
      else window.localStorage.setItem(CHAVE_STORAGE, JSON.stringify(chaves));
    } catch {
      /* sem storage, a seleção vale só nesta navegação */
    }
  }, [chaves]);

  const tem = useCallback((chave: string) => chaves.includes(chave), [chaves]);

  const alternar = useCallback((chave: string) => {
    if (!itemPorChave(chave)) return;
    setChaves((atuais) =>
      atuais.includes(chave)
        ? atuais.filter((c) => c !== chave)
        : atuais.length >= LIMITE
          ? atuais
          : [...atuais, chave],
    );
  }, []);

  const remover = useCallback((chave: string) => {
    setChaves((atuais) => atuais.filter((c) => c !== chave));
  }, []);

  const limpar = useCallback(() => setChaves([]), []);
  const abrir = useCallback(() => setAberto(true), []);
  const fechar = useCallback(() => setAberto(false), []);

  const itens = useMemo(
    () => chaves.map(itemPorChave).filter((i): i is ItemCatalogo => Boolean(i)),
    [chaves],
  );

  const valor = useMemo<Contexto>(
    () => ({
      chaves,
      itens,
      quantidade: itens.length,
      tem,
      alternar,
      remover,
      limpar,
      aberto,
      abrir,
      fechar,
      pronto,
    }),
    [chaves, itens, tem, alternar, remover, limpar, aberto, abrir, fechar, pronto],
  );

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function usarFavoritos() {
  return useContext(Ctx);
}

/** O limite existe para o resumo continuar sendo uma conversa, não um catálogo. */
export const LIMITE_FAVORITOS = LIMITE;
