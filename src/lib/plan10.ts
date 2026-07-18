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
