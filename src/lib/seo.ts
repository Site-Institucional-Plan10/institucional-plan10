// Domínio de produção da Plan10. Fonte única para canonical, og:url e sitemap.
// Quando o site assumir o domínio final, basta trocar aqui.
export const SITE_URL = "https://plan10.com.br";

export function canonical(path: string) {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

export interface FAQItem {
  title: string;
  content: string;
}

export function faqJsonLd(items: FAQItem[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.title,
      acceptedAnswer: { "@type": "Answer", text: it.content },
    })),
  });
}
