import { Quote } from "lucide-react";
import { testimonials, type Testimonial } from "@/data/testimonials";

function Card({ t }: { t: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-[320px] md:w-[380px] rounded-2xl bg-white p-6 border border-neutral-200 shadow-sm mr-6">
      <Quote size={20} style={{ color: t.hubColor }} />
      <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{t.text}</p>
      <div className="mt-5 flex items-center gap-3">
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            border: `2px solid ${t.hubColor}`,
          }}
        >
          <img
            src={t.photo}
            alt={t.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 20%",
            }}
          />
        </div>
        <div>
          <div className="font-semibold text-sm">{t.name}</div>
          <div className="text-xs text-neutral-500">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials({ filter, ids }: { filter?: string; ids?: string[] }) {
  let list: Testimonial[];
  if (ids && ids.length) {
    list = ids
      .map((id) => testimonials.find((t) => t.id === id))
      .filter((t): t is Testimonial => Boolean(t));
  } else if (filter) {
    list = testimonials.filter((t) => t.hub === filter);
  } else {
    list = testimonials;
  }

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
