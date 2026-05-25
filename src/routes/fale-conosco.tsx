import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/sections/ContactForm";
import { Input } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Plan10Button";
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/fale-conosco")({
  head: () => ({
    meta: [
      { title: "Fale Conosco | Plan10, Atendimento em até 24h úteis" },
      { name: "description", content: "Entre em contato com a Plan10. Atendimento humano em até 24h úteis." },
      { property: "og:title", content: "Fale Conosco, Plan10" },
      { property: "og:description", content: "Deixe sua mensagem. A Plan10 retorna em até 24h úteis." },
      { property: "og:url", content: canonical("/fale-conosco") },
    ],
    links: [{ rel: "canonical", href: canonical("/fale-conosco") }],
  }),
  component: FaleConosco,
});

function FaleConosco() {
  return (
    <>
      <section className="pt-32 pb-12 bg-ink text-white">
        <div className="container-x">
          <p className="font-eyebrow text-orange mb-3">Contato</p>
          <h1 className="font-display max-w-3xl" style={{ color: "#fff" }}>Fale conosco</h1>
          <p className="mt-4 text-neutral-300 max-w-2xl">
            Deixe sua mensagem. A Plan10 retorna em até 24h úteis.
          </p>
        </div>
      </section>

      <ContactForm source="fale-conosco" />

      <section className="section-y">
        <div className="container-x max-w-2xl">
          <p className="font-eyebrow text-orange mb-3">Newsletter</p>
          <h2 className="font-h2 mb-4">Receba novidades, P10 News</h2>
          <p className="text-neutral-700 mb-6">Conteúdos relevantes sobre proteção, saúde e planejamento financeiro.</p>
          <form className="grid gap-3 sm:grid-cols-3">
            <Input placeholder="Nome" />
            <Input placeholder="E-mail" type="email" />
            <Input placeholder="WhatsApp (opcional)" />
          </form>
          <label className="mt-3 flex items-start gap-3 text-sm text-neutral-700">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-neutral-300 text-orange" />
            Concordo com a Política de Privacidade e tratamento de dados conforme a LGPD.
          </label>
          <Button className="mt-4">Quero receber novidades</Button>
          <p className="mt-3 text-xs text-neutral-500">Não utilizamos suas informações para enviar spam.</p>
        </div>
      </section>
    </>
  );
}
