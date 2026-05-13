import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { cn, getWhatsAppUrl } from "@/lib/utils";

interface FAQItem {
  title: string;
  content: string;
}

const defaultItems: FAQItem[] = [
  { title: "A Plan10 é uma seguradora?", content: "Não. A Plan10 é uma corretora multimodal credenciada pela SUSEP que conecta você às melhores seguradoras e instituições do país." },
  { title: "Quanto custa a consultoria?", content: "A consultoria Plan10 é gratuita. Você só paga pelo produto contratado, com o mesmo preço da seguradora." },
  { title: "Atendem todo o Brasil?", content: "Sim. O atendimento é digital e chega a todo o território nacional." },
  { title: "Como funciona o suporte em sinistro?", content: "Acompanhamos o processo do início ao fim, ajudando na documentação e comunicação com a seguradora." },
  { title: "Quais seguradoras vocês trabalham?", content: "Trabalhamos com as principais seguradoras do mercado brasileiro. Veja a lista completa na seção Parceiros." },
];

export function FAQSection({
  items,
  title = "Perguntas Frequentes",
  whatsappContext = "default",
}: {
  items?: FAQItem[];
  title?: string;
  whatsappContext?: string;
}) {
  const list = items ?? defaultItems;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-12 md:py-20">
      <div className="container-x max-w-3xl mx-auto">
        <p className="font-eyebrow text-orange mb-3">Dúvidas</p>
        <h2 className="font-h1 mb-8">{title}</h2>

        <div className="flex flex-col gap-3">
          {list.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={cn(
                  "rounded-xl border bg-white transition-all duration-200",
                  isOpen
                    ? "border-orange shadow-[0_4px_16px_rgba(255,107,0,0.12)]"
                    : "border-neutral-200 hover:border-orange hover:shadow-[0_4px_16px_rgba(255,107,0,0.12)]",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange text-white text-[13px] font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-semibold text-ink">{item.title}</span>
                  <ChevronDown
                    size={20}
                    className="flex-shrink-0 text-orange transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="pl-[60px] pr-5 pb-4 text-neutral-700 leading-[1.7]">
                      {item.content}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-neutral-200 bg-neutral-100 p-5">
          <p className="font-semibold text-ink">Não encontrou o que procura?</p>
          <a
            href={getWhatsAppUrl(whatsappContext)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white hover:bg-orange-hover transition"
          >
            <MessageCircle size={16} />
            Falar com um especialista →
          </a>
        </div>
      </div>
    </section>
  );
}
