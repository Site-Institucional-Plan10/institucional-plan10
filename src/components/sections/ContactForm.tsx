import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Lock, Mail, MessageCircle, Clock, Plus, Minus } from "lucide-react";
import { Input, Textarea } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Plan10Button";
import { FancySelect } from "@/components/plan10/FancySelect";
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
  { value: "Saúde e vida saudável", label: "Saúde e vida saudável" },
  { value: "Proteção à vida e ao patrimônio", label: "Proteção à vida e ao patrimônio" },
  { value: "Soluções financeiras", label: "Soluções financeiras" },
  { value: "Crescimento e mobilidade", label: "Crescimento e mobilidade" },
  { value: "Assistência pessoal e empresarial", label: "Assistência pessoal e empresarial" },
  { value: "Outro", label: "Outro" },
];

export function ContactForm({ source, defaultSubject, lockedSubject, title = "Fale conosco", subtitle }: ContactFormProps) {
  const { form, status, errorMessage, waUrl, onSubmit } = useContactForm(defaultSubject);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;
  const [showMessage, setShowMessage] = useState(false);

  const phoneValue = watch("phone");

  return (
    <section className="cf2">
      <style>{`
        .cf2 { background: #FFFFFF; padding: 84px 0; }
        .cf2 .cf2-eyebrow {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-weight: 500; font-size: .7rem; letter-spacing: .3em; text-transform: uppercase;
          color: #9A7B23; margin: 0 0 14px; display: inline-flex; align-items: center; gap: 12px;
        }
        .cf2 .cf2-eyebrow::before { content:""; width: 26px; height: 1px; background: #B08D57; }
        .cf2 .cf2-h2 {
          font-family: 'Schibsted Grotesk','Inter',sans-serif; font-weight: 600;
          font-size: clamp(1.7rem, 3.4vw, 2.5rem); line-height: 1.08; letter-spacing: -.025em;
          color: #0E2438; margin: 0 0 16px;
        }
      `}</style>
      <div className="container-x grid gap-10 lg:grid-cols-2">
        <div>
          <p className="cf2-eyebrow">Fale com a Plan10</p>
          <h2 className="cf2-h2">{title}</h2>
          {subtitle && <p className="text-neutral-700 mb-8 max-w-md">{subtitle}</p>}

          <form
            onSubmit={handleSubmit((d) => onSubmit(d, source))}
            className="grid gap-4"
            noValidate
          >
            <Input label="Nome completo" {...register("name")} error={errors.name?.message} />
            <Input
              label="WhatsApp"
              inputMode="tel"
              placeholder="(00) 00000-0000"
              value={phoneValue || ""}
              onChange={(e) => setValue("phone", maskPhoneBR(e.target.value), { shouldValidate: true })}
              error={errors.phone?.message}
            />
            {lockedSubject ? (
              <Input label="Assunto" value={defaultSubject} readOnly {...register("subject")} />
            ) : (
              <FancySelect
                tone="light"
                label="Do que você precisa?"
                placeholder="Selecione..."
                value={watch("subject") || ""}
                onChange={(v) => setValue("subject", v, { shouldValidate: true })}
                options={subjectOptions.filter((o) => o.value).map((o) => ({ value: o.value, label: o.label }))}
                error={errors.subject?.message}
              />
            )}
            <Input label="Produto ou serviço específico (opcional)" placeholder="Ex.: seguro auto, plano familiar, consórcio de imóvel" {...register("produto")} error={errors.produto?.message} />
            <Input label="E-mail (opcional)" type="email" {...register("email")} error={errors.email?.message} />

            {!showMessage ? (
              <button
                type="button"
                onClick={() => setShowMessage(true)}
                className="inline-flex items-center gap-2 self-start py-2 text-sm font-semibold text-orange hover:underline"
              >
                <Plus size={14} /> Adicionar mensagem (opcional)
              </button>
            ) : (
              <div className="grid gap-2">
                <Textarea label="Mensagem" {...register("message")} error={errors.message?.message} />
                <button
                  type="button"
                  onClick={() => setShowMessage(false)}
                  className="inline-flex items-center gap-2 self-start text-xs font-semibold text-neutral-500 hover:text-orange"
                >
                  <Minus size={12} /> Remover mensagem
                </button>
              </div>
            )}

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

            <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto inline-flex items-center justify-center gap-2">
              <MessageCircle size={18} />
              {status === "submitting" ? "Abrindo o WhatsApp..." : "Enviar pelo WhatsApp"}
            </Button>
            <p className="text-xs text-neutral-500 inline-flex items-center gap-1.5"><Clock size={14} />Suas respostas abrem uma conversa direta com um consultor. Sem compromisso.</p>

            {status === "success" && (
              <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-800">
                Abrimos o WhatsApp da Plan10 com os seus dados. É só enviar a mensagem.{" "}
                {waUrl && (
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                    Não abriu? Toque aqui.
                  </a>
                )}
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
