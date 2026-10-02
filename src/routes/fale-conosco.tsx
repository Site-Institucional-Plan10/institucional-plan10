import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone, Mail, Clock } from "lucide-react";
import { Input } from "@/components/ui/primitives";
import { getWhatsAppUrl } from "@/lib/utils";
import { WHATSAPP_DISPLAY } from "@/components/common/WhatsAppButton";
import { canonical } from "@/lib/seo";
import { PageTheme, PALETTES } from "@/components/plan10/PageTheme";

export const Route = createFileRoute("/fale-conosco")({
  head: () => ({
    meta: [
      { title: "Fale Conosco | Plan10, Atendimento em até 24h úteis" },
      { name: "description", content: "Entre em contato com a Plan10. Atendimento humano em até 24h úteis." },
      { property: "og:title", content: "Fale Conosco, Plan10" },
      { property: "og:description", content: "Falar com consultor da Plan10 pelo WhatsApp, telefone ou e-mail." },
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
    <PageTheme palette={PALETTES.institucional}>
      <style>{`
        .plan10-scope .p10-card .fc-valor { font-family: var(--fl); font-size: .92rem; color: var(--preto); margin: 4px 0 0; letter-spacing: .02em; }
      `}</style>
      <header className="p10-hero">
        <div className="p10-hero-inner">
          <p className="eyebrow">Contato</p>
          <h1>Fale conosco</h1>
          <p className="lede">
            Atendimento humano do começo ao fim. Escolha o canal e um consultor assume a conversa.
          </p>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <div className="p10-cards">
            {canais.map((c) => {
              const Icone = c.icone;
              return (
                <a
                  key={c.titulo}
                  href={c.href}
                  {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="p10-card"
                >
                  <Icone size={22} style={{ color: "var(--gold-dk, #866719)" }} />
                  <h2 style={{ marginTop: 12 }}>{c.titulo}</h2>
                  <p className="fc-valor">{c.valor}</p>
                  <p>{c.detalhe}</p>
                  <span className="arrow">{c.acao} →</span>
                </a>
              );
            })}
          </div>

          <p className="p10-lede" style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Clock size={16} style={{ display: "inline", color: "var(--gold-dk, #866719)" }} />
            Atendimento 24/7 para emergências e assistências já contratadas.
          </p>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <p className="eyebrow">Newsletter</p>
          <h2 className="p10-h2" style={{ margin: "12px 0 10px" }}>Receba novidades, P10 News</h2>
          <p className="p10-lede" style={{ marginBottom: 22 }}>Conteúdos relevantes sobre proteção, saúde e planejamento financeiro.</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <Input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            <Input placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="WhatsApp (opcional)" value={whats} onChange={(e) => setWhats(e.target.value)} />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: 18 }}
            onClick={() => { window.location.href = assinaturaUrl; }}
          >
            Quero receber novidades
          </button>
          <p className="p10-lede" style={{ marginTop: 14, fontSize: "0.92rem" }}>
            Usamos seus dados apenas para enviar os conteúdos que você pediu.
          </p>
        </div>
      </section>
    </PageTheme>
  );
}
