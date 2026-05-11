import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(14, "Telefone inválido").max(20),
  subject: z.string().min(1, "Selecione um assunto"),
  message: z.string().trim().min(10, "Mensagem muito curta").max(2000),
  consent: z.literal(true, { errorMap: () => ({ message: "Você precisa concordar com a política" }) }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export function useContactForm(defaultSubject?: string) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: defaultSubject || "",
      message: "",
      consent: false as unknown as true,
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData, source: string) => {
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Erro ao enviar");
      }
      setStatus("success");
      form.reset();
    } catch (e) {
      setStatus("error");
      setErrorMessage(e instanceof Error ? e.message : "Erro ao enviar");
    }
  };

  return { form, status, errorMessage, onSubmit };
}
