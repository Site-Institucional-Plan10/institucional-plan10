import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function maskPhoneBR(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export const WHATSAPP_NUMBER = "5511940001010";

export const whatsappMessages: Record<string, string> = {
  home: "Olá! Vim pelo site da Plan10 e gostaria de mais informações sobre os serviços de vocês.",
  seguros: "Olá! Vim pelo site da Plan10 e gostaria de cotar um seguro.",
  saude: "Olá! Vim pelo site da Plan10 e gostaria de cotar um plano de saúde.",
  consorcios: "Olá! Vim pelo site da Plan10 e gostaria de saber mais sobre consórcio.",
  financas: "Olá! Vim pelo site da Plan10 e gostaria de uma consultoria financeira.",
  servicos: "Olá! Vim pelo site da Plan10 e gostaria de contratar um serviço de assistência.",
  default: "Olá! Vim pelo site da Plan10 e gostaria de mais informações sobre os serviços de vocês.",
};

export function getWhatsAppUrl(context: string = "default"): string {
  const msg = whatsappMessages[context] ?? whatsappMessages.default;
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}`;
}

export function getVerticalContextFromPath(pathname: string): string {
  if (pathname.startsWith("/seguros")) return "seguros";
  if (pathname.startsWith("/saude")) return "saude";
  if (pathname.startsWith("/consorcios")) return "consorcios";
  if (pathname.startsWith("/financas")) return "financas";
  if (pathname.startsWith("/servicos")) return "servicos";
  if (pathname === "/") return "home";
  return "default";
}
