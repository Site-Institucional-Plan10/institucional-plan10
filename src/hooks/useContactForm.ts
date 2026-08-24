import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { buildLeadWhatsAppUrl } from "@/lib/utils";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.union([z.string().trim().email("E-mail inválido").max(255), z.literal("")]).optional(),
  phone: z.string().trim().min(14, "Telefone inválido").max(20),
  subject: z.string().min(1, "Selecione um assunto"),
  produto: z.string().trim().max(120).optional(),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Você precisa concordar com a política" }) }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export function useContactForm(defaultSubject?: string) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [waUrl, setWaUrl] = useState<string>("");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: defaultSubject || "",
      produto: "",
      message: "",
      consent: false as unknown as true,
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData, source: string) => {
    setStatus("submitting");
    setErrorMessage("");
    try {
      const url = buildLeadWhatsAppUrl({
        nome: data.name,
        telefone: data.phone,
        email: data.email || undefined,
        solucao: data.subject,
        produto: data.produto || undefined,
        mensagem: data.message || undefined,
        origem: source,
      });
      setWaUrl(url);
      if (typeof window !== "undefined") window.open(url, "_blank", "noopener,noreferrer");
      setStatus("success");
      form.reset();
    } catch (e) {
      setStatus("error");
      setErrorMessage(e instanceof Error ? e.message : "Erro ao enviar");
    }
  };

  return { form, status, errorMessage, waUrl, onSubmit };
}
