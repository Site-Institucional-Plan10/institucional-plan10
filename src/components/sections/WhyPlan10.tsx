import { UserCheck, BarChart3, Users, LifeBuoy, Eye, Briefcase, Award } from "lucide-react";
import { SnapCarousel } from "@/components/common/SnapCarousel";

const benefits = [
  { Icon: UserCheck, title: "Consultoria independente", desc: "Análise sem vínculo com uma única seguradora." },
  { Icon: BarChart3, title: "Comparação entre seguradoras", desc: "Cotação ampla para a melhor relação custo-benefício." },
  { Icon: Users, title: "Atendimento humano", desc: "Pessoas reais entendendo seu cenário." },
  { Icon: LifeBuoy, title: "Suporte em sinistros", desc: "Acompanhamento do início ao fim do processo." },
  { Icon: Eye, title: "Transparência total", desc: "Sem letra miúda. Tudo explicado em português claro." },
  { Icon: Briefcase, title: "Portfólio completo", desc: "Mais de 40 produtos em um só lugar." },
  { Icon: Award, title: "Parcerias reconhecidas", desc: "Credenciada pelas principais seguradoras do país." },
];

export function WhyPlan10() {
  const cards = benefits.map(({ Icon, title, desc }) => (
    <div key={title} className="why-plan10-card rounded-2xl bg-white p-6 border border-neutral-200 h-full">
      <Icon size={40} className="icon text-orange mb-4" />
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-neutral-700">{desc}</p>
    </div>
  ));

  return (
    <section className="section-y bg-neutral-100">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="font-eyebrow text-orange mb-3">Nossos diferenciais</p>
          <h2 className="font-h1 mb-4">Por que escolher a Plan10</h2>
        </div>
      </div>
      <div className="mt-8">
        <SnapCarousel
          items={cards}
          ariaLabel="Por que escolher a Plan10"
          dataAttr="data-why-carousel"
        />
      </div>
    </section>
  );
}
