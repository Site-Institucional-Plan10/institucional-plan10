import { Quote } from "lucide-react";
import { testimonials, type Testimonial } from "@/data/testimonials";

function getInitials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

function Card({ t }: { t: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-[320px] md:w-[380px] rounded-2xl bg-white p-6 border border-neutral-200 shadow-sm mr-6">
      <Quote size={20} style={{ color: t.hubColor }} />
      <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{t.text}</p>
      <div className="mt-5 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-white font-bold text-sm"
          style={{ backgroundColor: t.hubColor }}
        >
          {getInitials(t.name)}
        </div>
        <div>
          <div className="font-semibold text-sm">{t.name}</div>
          <div className="text-xs uppercase tracking-wider" style={{ color: t.hubColor }}>{t.hub}</div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials({ filter }: { filter?: string }) {
  const list = filter ? testimonials.filter((t) => t.hub === filter) : testimonials;
  // Duplicate for seamless marquee
  const row1 = [...list, ...list];
  const row2 = [...list.slice().reverse(), ...list.slice().reverse()];

  return (
    <section className="section-y bg-neutral-100">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="font-eyebrow text-orange mb-3">Depoimentos</p>
          <h2 className="font-h1 mb-4">O que nossos clientes dizem</h2>
        </div>
      </div>
      {/* PLACEHOLDER — substituir por depoimentos reais com foto quando disponíveis */}
      <div className="mt-10 space-y-6 overflow-hidden">
        <div className="flex animate-marquee w-max">
          {row1.map((t, i) => <Card key={`a-${i}`} t={t} />)}
        </div>
        <div className="flex animate-marquee-reverse w-max">
          {row2.map((t, i) => <Card key={`b-${i}`} t={t} />)}
        </div>
      </div>
    </section>
  );
}
