import { Search, GitCompare, Lightbulb, FileSignature, Headphones } from "lucide-react";
import { Button } from "@/components/ui/Plan10Button";

const steps = [
  { Icon: Search, title: "Entendimento do seu perfil", desc: "Conversamos para mapear o cenário real." },
  { Icon: GitCompare, title: "Comparação inteligente", desc: "Cotamos com várias seguradoras e instituições." },
  { Icon: Lightbulb, title: "Recomendação personalizada", desc: "Sugestões com prós e contras claros." },
  { Icon: FileSignature, title: "Contratação assistida", desc: "Acompanhamos toda a documentação." },
  { Icon: Headphones, title: "Suporte contínuo", desc: "Estamos com você em renovações e sinistros." },
];

export function HowItWorks() {
  const scrollToForm = () => {
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-y">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="font-eyebrow text-orange mb-3">Processo</p>
          <h2 className="font-h1 mb-4">Como funciona nossa consultoria</h2>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-5 relative">
          {steps.map(({ Icon, title, desc }, i) => (
            <div key={title} className="relative flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange text-white text-lg font-bold mb-4">
                {i + 1}
              </div>
              <Icon size={28} className="text-blue mb-3" />
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-neutral-700">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="primary" size="lg" onClick={scrollToForm}>
            Quero começar agora
          </Button>
        </div>
      </div>
    </section>
  );
}
