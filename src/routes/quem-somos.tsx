import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Shield, Heart, Building2, Landmark, Clock } from "lucide-react";
import { ProofNumbers } from "@/components/sections/ProofNumbers";
import { Button } from "@/components/ui/Plan10Button";
import { getWhatsAppUrl } from "@/lib/utils";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem Somos | Plan10 — Consultoria de Proteção Integrada" },
      { name: "description", content: "A Plan10 é uma consultoria multimodal independente, transparente e orientada por dados. Cuidar do que importa." },
      { property: "og:title", content: "Quem Somos — Plan10" },
      { property: "og:description", content: "Consultoria de proteção integrada para pessoas, famílias e empresas." },
    ],
  }),
  component: QuemSomos,
});

const valores = ["Proximidade", "Clareza", "Cuidado", "Pluralidade", "Constância"];

const teamCells = [
  {
    Icon: Shield,
    color: "#3D8BF2",
    area: "Célula de Seguros",
    description:
      "Consultores especializados em proteção patrimonial, seguros de vida, automóvel, residencial e empresarial. Atuação independente com acesso às principais seguradoras do país.",
  },
  {
    Icon: Heart,
    color: "#24BF5B",
    area: "Célula de Saúde",
    description:
      "Especialistas em planos de saúde e odontológicos para pessoa física e jurídica. Análise comparativa entre operadoras com foco no custo-benefício ideal para cada perfil.",
  },
  {
    Icon: Building2,
    color: "#9857F2",
    area: "Célula de Consórcio",
    description:
      "Consultores dedicados ao planejamento de consórcio imobiliário, de veículos e serviços. Suporte estratégico na escolha do grupo, análise de lance e acompanhamento até a contemplação.",
  },
  {
    Icon: Landmark,
    color: "#1A4FA0",
    area: "Célula de Finanças",
    description:
      "Equipe de inteligência financeira focada em crédito, investimentos, previdência e garantias. Análise independente das melhores condições disponíveis no mercado para pessoa física e jurídica.",
  },
  {
    Icon: Clock,
    color: "#27DEF2",
    area: "Célula de Serviços",
    description:
      "Equipe operacional de assistência 24 horas para veículos e residências. Profissionais qualificados e credenciados com tempo médio de atendimento de 30 a 50 minutos.",
  },
];

function QuemSomos() {
  return (
    <>
      {/* Section 1 — Refined hero */}
      <section
        className="pt-32 pb-20"
        style={{ background: "linear-gradient(135deg, #1A4FA0 0%, #0D2B6E 100%)" }}
      >
        <div className="container-x text-white">
          <p
            className="mb-4 uppercase"
            style={{
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.14em",
              fontSize: "0.78rem",
              fontWeight: 700,
            }}
          >
            Sobre a Plan10
          </p>
          <h1
            className="font-extrabold"
            style={{
              color: "#fff",
              fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
              lineHeight: 1.1,
              maxWidth: 760,
            }}
          >
            Cuidar do que importa.
          </h1>
          <p
            className="mt-6"
            style={{
              color: "rgba(255,255,255,0.75)",
              maxWidth: 560,
              fontSize: "1.05rem",
              lineHeight: 1.6,
            }}
          >
            Consultoria de proteção integrada para pessoas, famílias e empresas que valorizam excelência.
          </p>
        </div>
      </section>

      {/* Section 2 — Institutional text + proof numbers */}
      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-lg text-neutral-700 leading-relaxed">
              A Plan10 é uma consultoria multimodal especializada em soluções integradas de seguros, proteção pessoal, familiar, patrimonial e empresarial, consórcios e planos de saúde e odontológicos.
            </p>
            <p className="mt-5 text-lg text-neutral-700 leading-relaxed">
              Atuamos de forma independente, transparente e orientada por dados, conectando pessoas, famílias e empresas às melhores seguradoras e instituições do país.
            </p>
            <div
              className="mt-8 rounded-2xl p-6"
              style={{
                background: "rgba(255, 107, 0, 0.08)",
                borderLeft: "4px solid #FF6B00",
              }}
            >
              <p className="font-h3" style={{ color: "#1A1A1A" }}>
                Nosso propósito: cuidar do que importa, protegendo pessoas, famílias e empresas com inteligência e compromisso real.
              </p>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden">
            <ProofNumbers compact />
          </div>
        </div>
      </section>

      {/* Section 3 — Mission / Vision / Values */}
      <section className="section-y" style={{ background: "#F8F8F8" }}>
        <div className="container-x grid gap-6 md:grid-cols-3">
          {[
            {
              label: "Missão",
              text: "Reunir, em um só lugar, as melhores soluções para proteger e planejar o que importa para cada família e cada negócio.",
            },
            {
              label: "Visão",
              text: "Ser a consultoria de proteção mais próxima e confiável do Brasil, onde decidir o futuro é simples.",
            },
            {
              label: "Valores",
              text: "Proximidade · Clareza · Cuidado · Pluralidade · Constância",
              pills: valores,
            },
          ].map((c) => (
            <div
              key={c.label}
              style={{
                background: "#FFFFFF",
                borderTop: "3px solid #FF6B00",
                borderRadius: "0 0 12px 12px",
                padding: "28px 24px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <p
                className="uppercase mb-3"
                style={{
                  color: "#FF6B00",
                  letterSpacing: "0.12em",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                }}
              >
                {c.label}
              </p>
              <p className="text-neutral-700 leading-relaxed">{c.text}</p>
              {c.pills && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.pills.map((p) => (
                    <span
                      key={p}
                      style={{
                        background: "rgba(255, 107, 0, 0.12)",
                        color: "#B84A00",
                        padding: "4px 12px",
                        borderRadius: 999,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 — Premium closing CTA */}
      <section className="py-16" style={{ background: "#1A1A1A" }}>
        <div className="container-x text-center">
          <p
            className="uppercase mb-3"
            style={{
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.14em",
              fontSize: "0.72rem",
              fontWeight: 700,
            }}
          >
            Inicie uma conversa
          </p>
          <h2
            className="font-bold"
            style={{ color: "#fff", fontSize: "2rem", lineHeight: 1.2 }}
          >
            Pronto para estruturar sua proteção?
          </h2>
          <p
            className="mt-4 mx-auto"
            style={{
              color: "rgba(255,255,255,0.70)",
              maxWidth: 560,
              lineHeight: 1.6,
            }}
          >
            Nossos consultores estão disponíveis para entender seu cenário e propor a solução mais adequada.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={getWhatsAppUrl("default")} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">
                <MessageCircle size={18} />
                Fale com nosso consultor
              </Button>
            </a>
            <Link to="/">
              <Button
                variant="ghost"
                size="lg"
                style={{
                  border: "1.5px solid rgba(255,255,255,0.60)",
                  color: "#FFFFFF",
                  background: "transparent",
                }}
              >
                Conheça nossas soluções
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
