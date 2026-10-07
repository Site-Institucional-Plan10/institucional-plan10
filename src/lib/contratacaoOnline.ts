import { solucoesOnline } from "@/data/solucoesOnline";

/**
 * Quais produtos do catálogo podem oferecer contratação online.
 *
 * O Carlos decidiu manter os 36 registros com chamada externa e variar o CTA
 * entre "Contratar online" e "Solicitar cotação". Este arquivo decide qual dos
 * dois cada produto recebe.
 *
 * O critério é o link, não o nome. A página de soluções digitais é a lista que
 * ele confirmou, e os nomes dela são comerciais ("Seguro Celular"), enquanto os
 * do catálogo são de produto ("Seguro celular empresarial"): cruzar por nome
 * erraria quase tudo. Cruzando por endereço, 28 dos 36 batem com um link
 * confirmado e 8 ficam de fora, e são esses 8 que recebem "Solicitar cotação".
 *
 * A comparação ignora o protocolo e a barra final, que variam entre as duas
 * fontes sem mudar o destino.
 */
const normalizar = (link: string | undefined | null): string =>
  (link ?? "").trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/+$/, "");

const CONFIRMADOS = new Set(
  solucoesOnline.filter((s) => s.kind === "online" && s.link).map((s) => normalizar(s.link)),
);

/**
 * Devolve o endereço de contratação quando ele consta da lista confirmada, ou
 * null quando o produto deve seguir pela cotação.
 */
export function contratacaoOnlineDe(linkPorto: string | undefined | null): string | null {
  const link = (linkPorto ?? "").trim();
  if (!/^https?:\/\//i.test(link)) return null;
  return CONFIRMADOS.has(normalizar(link)) ? link : null;
}
