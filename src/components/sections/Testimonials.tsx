import { Quote } from "lucide-react";
import { testimonials, type Testimonial } from "@/data/testimonials";

function Card({ t }: { t: Testimonial }) {
  return (
    <figure
      className="flex h-full flex-col gap-4 rounded-[5px] bg-white p-7"
      style={{ border: "1px solid #E6E1D6" }}
    >
      <Quote size={22} style={{ color: "#C9A83C" }} aria-hidden />
      <blockquote className="flex-1 text-[0.95rem] leading-relaxed text-neutral-700">
        {t.text}
      </blockquote>
      <figcaption className="flex items-center gap-3 pt-1">
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            border: "1px solid #E6E1D6",
          }}
        >
          <img
            src={t.photo}
            alt={t.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}
          />
        </div>
        <div>
          <div className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>{t.name}</div>
          <div className="text-xs text-neutral-500">{t.role}</div>
        </div>
      </figcaption>
    </figure>
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

  // Grade estática curada (sem esteira, sem repetição, sem corte nas bordas).
  const shown = list.slice(0, 6);

  return (
    <section id="depoimentos" className="section-y" style={{ background: "#F4F1EB" }}>
      <div className="container-x">
        <div className="max-w-3xl mb-10">
          <p className="font-eyebrow text-orange mb-3">Clientes que confiam na Plan10</p>
          <h2 className="font-h1">O que nossos clientes dizem</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((t) => (
            <Card key={t.id} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
