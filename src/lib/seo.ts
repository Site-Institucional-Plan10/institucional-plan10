export const SITE_URL = "https://institucional-plan10.contato-e43.workers.dev";

export function canonical(path: string) {
  return `${SITE_URL}${path}`;
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
