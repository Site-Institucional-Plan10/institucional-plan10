export const PLAN10_WHATSAPP = "5511938012222";

export const FONTS = {
  display: "'Playfair Display', Georgia, serif",
  body: "'Inter', ui-sans-serif, system-ui, sans-serif",
  eyebrow: "'Barlow Condensed', 'Inter', sans-serif",
};

export function whatsappUrl(message: string): string {
  return `https://wa.me/${PLAN10_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function isRealUrl(link: string | undefined | null): boolean {
  if (!link) return false;
  return /^https?:\/\//i.test(link.trim());
}

/**
 * Repara a abertura consultiva de nível núcleo, cujo texto de origem vem com a
 * gramática quebrada ("...especialmente em cenários de X exige uma escolha..."),
 * o subject se perde e a concordância falha. Reescreve em duas orações limpas,
 * válidas para X singular ou plural. Se o padrão não bater, devolve o texto original.
 */
export function aberturaLimpa(texto: string): string {
  if (!texto) return texto;
  const m = texto.match(
    /^(.*?),\s*especialmente em cen[aá]rios de (.+?)\s+exige uma escolha bem orientada e bem acompanhada\.?\s*$/i,
  );
  if (!m) return texto;
  const contexto = m[2].trim();
  return `${m[1].trim()}. Em ${contexto}, cada decisão merece estar bem orientada e bem acompanhada.`;
}
