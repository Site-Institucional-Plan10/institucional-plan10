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
      <style>{`
        .how-it-works-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .how-it-works-image {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: 20px;
          overflow: hidden;
        }
        .how-it-works-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .how-it-works-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.35), rgba(0,0,0,0) 40%);
          pointer-events: none;
        }
        @media (max-width: 767px) {
          .how-it-works-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .how-it-works-image {
            aspect-ratio: 16 / 9;
          }
        }
      `}</style>
      <div className="container-x">
        <div className="how-it-works-inner">
          <div>
            <div className="max-w-3xl">
              <p className="font-eyebrow text-orange mb-3">Processo</p>
              <h2 className="font-h1 mb-4">Como funciona nossa consultoria</h2>
            </div>
            <div className="mt-10 flex flex-col gap-6">
              {steps.map(({ Icon, title, desc }, i) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange text-white text-base font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={20} className="text-blue" />
                      <h3 className="font-semibold">{title}</h3>
                    </div>
                    <p className="text-sm text-neutral-700">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Button variant="primary" size="lg" onClick={scrollToForm}>
                Quero começar agora
              </Button>
            </div>
          </div>
          <div className="how-it-works-image">
            <img src="/assets/images/veleiro-consultoria.avif" alt="Veleiro navegando — consultoria Plan10" />
          </div>
        </div>
      </div>
    </section>
  );
}
