import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone, Mail, Clock } from "lucide-react";
import { Input } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Plan10Button";
import { getWhatsAppUrl } from "@/lib/utils";
import { WHATSAPP_DISPLAY } from "@/components/common/WhatsAppButton";
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/fale-conosco")({
  head: () => ({
    meta: [
      { title: "Fale Conosco | Plan10, Atendimento em até 24h úteis" },
      { name: "description", content: "Entre em contato com a Plan10. Atendimento humano em até 24h úteis." },
      { property: "og:title", content: "Fale Conosco, Plan10" },
      { property: "og:description", content: "Fale com um consultor da Plan10 pelo WhatsApp, telefone ou e-mail." },
      { property: "og:url", content: canonical("/fale-conosco") },
    ],
    links: [{ rel: "canonical", href: canonical("/fale-conosco") }],
  }),
  component: FaleConosco,
});

/* Canal direto, sem formulário: a pessoa escolhe por onde prefere falar. */
const canais = [
  {
    icone: MessageCircle,
    titulo: "WhatsApp",
    valor: WHATSAPP_DISPLAY,
    detalhe: "Resposta no mesmo dia útil, na maior parte dos casos.",
    href: getWhatsAppUrl("default"),
    externo: true,
    acao: "Abrir conversa",
  },
  {
    icone: Phone,
    titulo: "Telefone",
    valor: WHATSAPP_DISPLAY,
    detalhe: "Prefere falar por voz? Ligue e peça o time de atendimento.",
    href: "tel:+5511938012222",
    externo: false,
    acao: "Ligar agora",
  },
  {
    icone: Mail,
    titulo: "E-mail",
    valor: "contato@plan10.com.br",
    detalhe: "Para documentos, propostas e assuntos que pedem histórico.",
    href: "mailto:contato@plan10.com.br",
    externo: false,
    acao: "Enviar e-mail",
  },
];

function FaleConosco() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whats, setWhats] = useState("");

  const assinaturaUrl =
    `mailto:contato@plan10.com.br?subject=${encodeURIComponent("P10 News, quero receber")}` +
    `&body=${encodeURIComponent(
      `Quero receber o P10 News.\n\nNome: ${nome}\nE-mail: ${email}\nWhatsApp: ${whats}`,
    )}`;

  return (
    <>
      <section className="pt-32 pb-12 bg-ink text-white">
        <div className="container-x">
          <p className="font-eyebrow text-orange mb-3">Contato</p>
          <h1 className="font-display max-w-3xl" style={{ color: "#fff" }}>Fale conosco</h1>
          <p className="mt-4 text-neutral-300 max-w-2xl">
            Atendimento humano, sem robô e sem fila de espera. Fale com um consultor pelo canal que preferir.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <div className="grid gap-4 md:grid-cols-3">
            {canais.map((c) => {
              const Icone = c.icone;
              return (
                <a
                  key={c.titulo}
                  href={c.href}
                  {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-colors hover:border-orange"
                >
                  <Icone className="text-orange" size={22} />
                  <h2 className="font-h3 mt-4">{c.titulo}</h2>
                  <p className="font-spec mt-1 text-neutral-900">{c.valor}</p>
                  <p className="mt-2 text-sm text-neutral-700">{c.detalhe}</p>
                  <span className="mt-4 text-sm font-semibold" style={{ color: "#C45016" }}>
                    {c.acao} →
                  </span>
                </a>
              );
            })}
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-sm text-neutral-700">
            <Clock size={16} className="text-orange" />
            Atendimento 24/7 para emergências e assistências já contratadas.
          </p>
        </div>
      </section>

      <section className="section-y bg-neutral-50">
        <div className="container-x max-w-2xl">
          <p className="font-eyebrow text-orange mb-3">Newsletter</p>
          <h2 className="font-h2 mb-4">Receba novidades, P10 News</h2>
          <p className="text-neutral-700 mb-6">Conteúdos relevantes sobre proteção, saúde e planejamento financeiro.</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <Input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            <Input placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="WhatsApp (opcional)" value={whats} onChange={(e) => setWhats(e.target.value)} />
          </div>
          <Button
            className="mt-4"
            onClick={() => { window.location.href = assinaturaUrl; }}
          >
            Quero receber novidades
          </Button>
          <p className="mt-3 text-xs text-neutral-500">Usamos seus dados apenas para enviar os conteúdos que você pediu.</p>
        </div>
      </section>
    </>
  );
}
