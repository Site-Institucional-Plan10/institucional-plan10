import { MessageCircle } from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import { getWhatsAppUrl, getVerticalContextFromPath } from "@/lib/utils";

export const WHATSAPP_DISPLAY = "(11) 94000 1010";

export function WhatsAppButton() {
  const { pathname } = useLocation();
  const ctx = getVerticalContextFromPath(pathname);
  const href = getWhatsAppUrl(ctx);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-floating group fixed z-50 flex items-center justify-center rounded-full bg-[#25D366] text-white animate-whatsapp-pulse cursor-pointer transition-[transform,box-shadow] duration-200 ease-out hover:scale-110 hover:shadow-[0_8px_28px_rgba(37,211,102,0.5)]"
      style={{ bottom: 28, right: 28, width: 64, height: 64 }}
      aria-label="Fale com um consultor"
    >
      <MessageCircle size={30} fill="white" />
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-md opacity-0 group-hover:opacity-100 transition">
        Fale com um consultor
      </span>
    </a>
  );
}
