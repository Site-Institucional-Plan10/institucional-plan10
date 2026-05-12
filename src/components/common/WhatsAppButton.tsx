import { MessageCircle } from "lucide-react";

export const WHATSAPP_URL = "https://wa.me/551140001010";
export const WHATSAPP_DISPLAY = "+55 11 4000-1010";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed z-50 flex items-center justify-center rounded-full bg-[#25D366] text-white animate-whatsapp-pulse"
      style={{ bottom: 28, right: 28, width: 64, height: 64 }}
      aria-label="Fale agora pelo WhatsApp"
    >
      <MessageCircle size={30} fill="white" />
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-md opacity-0 group-hover:opacity-100 transition">
        Fale agora pelo WhatsApp
      </span>
    </a>
  );
}
