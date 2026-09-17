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

/**
 * As frases de cross-selling do catálogo vêm sempre no formato
 * "<produto> pode se conectar a A, B, C e D." Jogar a frase inteira dentro de um
 * botão fica pesado e repete o nome do produto que já está no topo da página.
 * Aqui ficam só as frentes citadas, sem repetição, que é a informação útil.
 * Se a frase fugir do padrão, devolve lista vazia e a tela cai no texto original.
 */
export function frentesConectadas(frases: string[] | undefined): string[] {
  const frentes: string[] = [];
  for (const frase of frases ?? []) {
    const m = frase.match(/pode se conectar a\s+(.+?)\s*\.?\s*$/i);
    if (!m) continue;
    for (const parte of m[1].split(/\s*,\s*|\s+e\s+/)) {
      const bruto = parte.trim().replace(/\.$/, "");
      // só a inicial em maiúscula: "capitalize" do CSS estragaria "proteção de renda"
      const t = bruto ? bruto.charAt(0).toUpperCase() + bruto.slice(1) : "";
      if (t && !frentes.some((f) => f.toLowerCase() === t.toLowerCase())) frentes.push(t);
    }
  }
  return frentes;
}

interface PerguntaResposta {
  q: string;
  a: string;
}

/**
 * FAQ de um caminho, montado a partir do FAQ dos produtos do catálogo.
 *
 * No catálogo o FAQ é por produto, e dentro de um mesmo caminho as respostas se
 * repetem: o que muda de um produto para o outro é só o nome citado na pergunta.
 * Publicar tudo devolveria a mesma pergunta cinco ou dez vezes. Aqui as
 * respostas repetidas caem fora e a pergunta que sobra passa a citar o caminho,
 * que é quem responde nessa página.
 */
export function faqDoCaminho(
  nucleoNome: string,
  produtos: { nome: string; faq?: PerguntaResposta[] }[],
): PerguntaResposta[] {
  const vistas = new Set<string>();
  const saida: PerguntaResposta[] = [];
  for (const produto of produtos) {
    for (const item of produto.faq ?? []) {
      const chave = item.a.trim().toLowerCase();
      if (!item.a.trim() || vistas.has(chave)) continue;
      vistas.add(chave);
      const alvo = produto.nome.trim();
      const pergunta = alvo
        ? item.q.replace(
            new RegExp(alvo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
            nucleoNome.toLowerCase(),
          )
        : item.q;
      saida.push({ q: pergunta, a: item.a });
    }
  }
  return saida;
}
