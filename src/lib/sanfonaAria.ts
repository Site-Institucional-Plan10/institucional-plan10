/**
 * `aria-expanded` no `summary`, sempre igual ao `open` do `details`.
 *
 * O `details` nativo já anuncia recolhido e expandido sozinho, e por isso a
 * recomendação da ARIA é não repetir o atributo à mão. A auditoria do Carlos
 * pede o atributo explícito, e o risco de pedir isso é o atributo envelhecer e
 * passar a mentir para o leitor de tela, que é pior do que não existir.
 *
 * A escrita acontece no mesmo evento que muda o estado, lendo o estado real do
 * elemento. Não há cópia em React para sair de sincronia: o valor inicial sai
 * do mesmo `open` que o HTML recebe, e cada troca reescreve os dois juntos.
 */
export function marcarExpansao(detalhe: HTMLDetailsElement) {
  detalhe.querySelector(":scope > summary")?.setAttribute("aria-expanded", String(detalhe.open));
}
