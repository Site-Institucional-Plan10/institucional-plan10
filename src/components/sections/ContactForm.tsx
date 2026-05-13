import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Lock, Mail, MessageCircle, Clock, Plus, Minus } from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Plan10Button";
import { useContactForm } from "@/hooks/useContactForm";
import { maskPhoneBR, getWhatsAppUrl } from "@/lib/utils";
import { WHATSAPP_DISPLAY } from "@/components/common/WhatsAppButton";

interface ContactFormProps {
  source: string;
  defaultSubject?: string;
  lockedSubject?: boolean;
  title?: string;
  subtitle?: string;
}

const subjectOptions = [
  { value: "", label: "Selecione..." },
  { value: "Seguros", label: "Seguros" },
  { value: "Saúde", label: "Saúde" },
  { value: "Consórcio", label: "Consórcio" },
  { value: "Finanças", label: "Finanças" },
  { value: "Serviços 24h", label: "Serviços 24h" },
  { value: "Outro", label: "Outro" },
];

export function ContactForm({ source, defaultSubject, lockedSubject, title = "Fale Conosco", subtitle }: ContactFormProps) {
  const { form, status, errorMessage, onSubmit } = useContactForm(defaultSubject);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;

  const phoneValue = watch("phone");

  return (
    <section className="section-y bg-neutral-100">
      <div className="container-x grid gap-10 lg:grid-cols-2">
        <div>
          <p className="font-eyebrow text-orange mb-3">Fale com a Plan10</p>
          <h2 className="font-h1 mb-4">{title}</h2>
          {subtitle && <p className="text-neutral-700 mb-8 max-w-md">{subtitle}</p>}

          <form
            onSubmit={handleSubmit((d) => onSubmit(d, source))}
            className="grid gap-4"
            noValidate
          >
            <Input label="Nome completo" {...register("name")} error={errors.name?.message} />
            <Input label="E-mail" type="email" {...register("email")} error={errors.email?.message} />
            <Input
              label="Telefone"
              inputMode="tel"
              placeholder="(00) 00000-0000"
              value={phoneValue || ""}
              onChange={(e) => setValue("phone", maskPhoneBR(e.target.value), { shouldValidate: true })}
              error={errors.phone?.message}
            />
            {lockedSubject ? (
              <Input label="Assunto" value={defaultSubject} readOnly {...register("subject")} />
            ) : (
              <Select label="Assunto" options={subjectOptions} {...register("subject")} error={errors.subject?.message} />
            )}
            <Textarea label="Mensagem" {...register("message")} error={errors.message?.message} />

            <label className="flex items-start gap-3 text-sm text-neutral-700">
              <input
                type="checkbox"
                {...register("consent")}
                className="mt-1 h-4 w-4 rounded border-neutral-300 text-orange focus:ring-orange"
              />
              <span>
                Li e concordo com a{" "}
                <Link to="/privacidade" className="font-semibold text-orange underline">
                  Política de Privacidade
                </Link>{" "}
                e o tratamento dos meus dados conforme a LGPD.
              </span>
            </label>
            {errors.consent && <span className="text-xs text-red-600">{errors.consent.message}</span>}

            <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
              {status === "submitting" ? "Enviando..." : "Enviar mensagem"}
            </Button>

            {status === "success" && (
              <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-800">
                Mensagem enviada. A Plan10 retorna em até 24h úteis.
              </div>
            )}
            {status === "error" && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
                {errorMessage || "Não foi possível enviar agora. Tente novamente."}
              </div>
            )}
          </form>
        </div>

        <div className="lg:pl-8">
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-neutral-200 space-y-5">
            <h3 className="font-h3">Outras formas de contato</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MessageCircle className="text-orange mt-0.5" size={20} />
                <div>
                  <div className="font-semibold">WhatsApp</div>
                  <a href={getWhatsAppUrl("default")} target="_blank" rel="noopener noreferrer" className="font-spec text-neutral-700 hover:text-orange">
                    {WHATSAPP_DISPLAY}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-orange mt-0.5" size={20} />
                <div>
                  <div className="font-semibold">E-mail</div>
                  <span className="text-neutral-700">contato@plan10.com.br</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="text-orange mt-0.5" size={20} />
                <div>
                  <div className="font-semibold">Atendimento</div>
                  <span className="text-neutral-700">24/7</span>
                </div>
              </li>
            </ul>
            <div className="flex items-center gap-2 rounded-lg bg-neutral-100 p-3 text-xs text-neutral-700">
              <Lock size={14} className="text-green-600" />
              Seus dados estão seguros
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
