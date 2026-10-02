/**
 * Foto de assunto por hub e por categoria.
 *
 * O acervo antigo (`imagery.ts`) tem 11 fotos de clima: textura azul, sombra de
 * persiana, envelopes lacrados, fachada de vidro, mar. Elas combinam entre si,
 * mas nenhuma mostra o assunto da página. Rodando a regra de escolha sobre o
 * catálogo real, as 38 páginas de hub e categoria abriam assim: Logística com
 * mãos de bebê, Odontologia com um notebook sobre a mesa, Saúde animal com
 * textura azul, Máquinas e equipamentos com envelopes de lacre dourado. Cada
 * foto abria até cinco páginas diferentes.
 *
 * Aqui cada hub e cada categoria tem a foto do próprio assunto. O que não
 * estiver neste mapa continua caindo no acervo antigo, então a troca pode ser
 * feita por partes sem quebrar página nenhuma.
 */
import type { CuratedImage } from "./imagery";

/** Chave da categoria: "<hub>/<categoria>". Hub sozinho: "<hub>". */
const TEMAS: Record<string, CuratedImage> = {};

export function fotoDoTema(chave: string): CuratedImage | null {
  return TEMAS[chave] ?? null;
}
