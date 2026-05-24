import { UserCheck, BarChart3, Users, LifeBuoy, Eye, Briefcase, Award } from "lucide-react";
import { MobileCarousel } from "@/components/common/MobileCarousel";

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
  return (
    <section className="section-y bg-neutral-100">
      <style>{`
        @media (max-width: 767px) {
          .why-plan10-grid {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            align-items: stretch;
          }
          .why-plan10-card {
            display: flex;
            flex-direction: column;
            width: 100% !important;
            justify-self: stretch !important;
            min-height: 140px;
            padding: 20px;
            align-items: flex-start;
          }
          .why-plan10-card .icon { flex-shrink: 0; margin-bottom: 12px; }
          .why-plan10-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 6px; }
          .why-plan10-card p { font-size: 0.875rem; line-height: 1.5; flex: 1; }
        }
      `}</style>
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="font-eyebrow text-orange mb-3">Diferenciais</p>
          <h2 className="font-h1 mb-4">Por que escolher a Plan10</h2>
        </div>
        <div className="why-plan10-grid mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ justifyContent: "center", justifyItems: "center" }}>
          {benefits.map(({ Icon, title, desc }) => (
            <div key={title} className="why-plan10-card rounded-2xl bg-white p-6 border border-neutral-200">
              <Icon size={40} className="icon text-orange mb-4" />
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-sm text-neutral-700">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
