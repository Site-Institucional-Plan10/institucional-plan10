import { MessageCircle } from "lucide-react";

export const WHATSAPP_URL = "https://wa.me/551140001010";
export const WHATSAPP_DISPLAY = "+55 11 4000-1010";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg md:h-16 md:w-16 animate-pulse-ring"
      aria-label="Fale agora pelo WhatsApp"
    >
      <MessageCircle size={28} fill="white" />
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition">
        Fale agora pelo WhatsApp
      </span>
    </a>
  );
}
