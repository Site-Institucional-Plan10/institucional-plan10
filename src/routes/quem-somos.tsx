import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { ProofNumbers } from "@/components/sections/ProofNumbers";
import { Button } from "@/components/ui/Plan10Button";
import { getWhatsAppUrl } from "@/lib/utils";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem Somos | Plan10 — Desde 2016, Corretora Multimodal" },
      { name: "description", content: "A Plan10 é uma corretora multimodal especializada em soluções integradas. Cuidar do que importa." },
      { property: "og:title", content: "Quem Somos — Plan10" },
      { property: "og:description", content: "Conheça a Plan10: independente, transparente e orientada por dados." },
    ],
  }),
  component: QuemSomos,
});

function QuemSomos() {
  return (
    <>
      <section className="pt-32 pb-16" style={{ backgroundColor: "#1A4FA0" }}>
        <div className="container-x text-white">
          <p className="font-eyebrow text-orange mb-3">Quem Somos</p>
          <h1 className="font-display max-w-3xl" style={{ color: "#fff" }}>Cuidar do que importa.</h1>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-lg text-neutral-700 leading-relaxed">
              A Plan10 é uma corretora multimodal especializada em soluções integradas de seguros, proteção pessoal, familiar, patrimonial e empresarial, consórcios e planos de saúde e odontológicos. Atuamos de forma independente, transparente e orientada por dados, conectando pessoas, famílias e empresas às melhores seguradoras e instituições do país.
            </p>
            <div className="mt-8 rounded-2xl bg-orange/10 border-l-4 border-orange p-6">
              <p className="font-h3" style={{ color: "#1A1A1A" }}>
                Cuidar do que importa: protegendo pessoas, famílias e empresas com inteligência e compromisso real.
              </p>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden">
            <ProofNumbers compact />
          </div>
        </div>
      </section>

      <section className="section-y bg-neutral-100">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {[
            { title: "Missão", text: "Reunir, em um só lugar, as melhores soluções para proteger e planejar o que importa para cada família e cada negócio." },
            { title: "Visão", text: "Ser a corretora multimodal mais próxima e confiável do Brasil, onde decidir o futuro é simples." },
            { title: "Valores", text: "Proximidade · Clareza · Cuidado · Pluralidade · Constância" },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl bg-white p-8 border border-neutral-200">
              <h3 className="font-h3 text-orange mb-3">{c.title}</h3>
              <p className="text-neutral-700">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <h2 className="font-h2 mb-8">Time</h2>
          {/* Fotos e nomes da equipe — aguardar envio do cliente */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="rounded-2xl border border-dashed border-neutral-300 bg-white p-6 text-center">
                <div className="mx-auto h-24 w-24 rounded-full bg-neutral-100" />
                <div className="mt-4 font-semibold">Nome do membro</div>
                <div className="text-sm text-neutral-500">Cargo</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-ink text-white">
        <div className="container-x flex flex-col md:flex-row gap-4 items-center justify-between">
          <h3 className="font-h2">Vamos conversar?</h3>
          <div className="flex gap-3">
            <Link to="/">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-ink">Conheça nossas soluções</Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="primary"><MessageCircle size={18} />Falar com especialista</Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
