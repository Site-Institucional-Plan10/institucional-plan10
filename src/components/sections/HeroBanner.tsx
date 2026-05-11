import { useEffect, useState } from "react";
import { MessageCircle, Check, Shield } from "lucide-react";
import { Plan10Logo } from "@/components/ui/Plan10Logo";
import { Button } from "@/components/ui/Plan10Button";
import { WHATSAPP_URL } from "@/components/common/WhatsAppButton";

const banners = [
  { kind: "Institucional", text: "Seu futuro muito mais tranquilo." },
  { kind: "Destaque", text: "[Produto em destaque — placeholder]" },
  { kind: "Promoção", text: "[Promoção da semana — placeholder]" },
  { kind: "Novidade", text: "[Novidade — placeholder]" },
  { kind: "Aviso", text: "[Avisos — placeholder]" },
];

export function HeroBanner() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % banners.length), 4000);
    return () => clearInterval(t);
  }, []);

  const scrollToVerticals = () => {
    document.getElementById("verticais")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pt-28 md:pt-32">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center pb-16">
        <div>
          <p className="font-eyebrow text-orange mb-5">
            Corretora multimodal · Credenciada SUSEP
          </p>
          <h1 className="font-display">
            Seu futuro<br />
            muito mais<br />
            <span className="text-orange">tranquilo.</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-700 max-w-lg">
            Mais de 40 produtos em um só lugar: seguros, saúde, consórcio e finanças para você e sua empresa.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-700">
            {["Análise gratuita", "Atendimento humano", "Compare antes de contratar"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <Check size={16} className="text-orange" /> {t}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">
                <MessageCircle size={18} />
                Falar com Especialista
              </Button>
            </a>
            <Button variant="outline" size="lg" onClick={scrollToVerticals}>
              Conhecer Soluções
            </Button>
          </div>
        </div>

        <div className="relative h-[420px] md:h-[520px] rounded-3xl overflow-hidden bg-blue">
          <div
            className="absolute inset-0 opacity-90"
            style={{ background: "linear-gradient(135deg, #1A4FA0 0%, #163D80 100%)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-15">
            <Plan10Logo variant="symbol" size={500} light />
          </div>
          <div className="absolute bottom-6 left-6 right-6 md:right-auto rounded-2xl bg-white p-5 shadow-xl flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange/10">
              <Shield className="text-orange" size={24} />
            </div>
            <div>
              <div className="font-bold text-xl">+5.000 clientes</div>
              <div className="text-sm text-neutral-700">confiam na Plan10</div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner strip — rotating */}
      <div className="bg-ink text-white">
        <div className="container-x py-4 flex items-center gap-4 overflow-hidden">
          <span className="font-eyebrow text-orange flex-shrink-0">{banners[idx].kind}</span>
          <p key={idx} className="text-sm md:text-base truncate">
            {banners[idx].text}
          </p>
          <div className="ml-auto hidden md:flex gap-1.5 flex-shrink-0">
            {banners.map((_, i) => (
              <span
                key={i}
                className="h-1.5 w-6 rounded-full transition"
                style={{ backgroundColor: i === idx ? "#FF6B00" : "rgba(255,255,255,0.2)" }}
              />
            ))}
          </div>
          {/* BANNER PLACEHOLDER — atualizar conforme campanhas ativas */}
        </div>
      </div>
    </section>
  );
}
