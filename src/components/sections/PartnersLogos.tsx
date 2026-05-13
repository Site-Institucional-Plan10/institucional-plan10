import { partnerGroups } from "@/data/partners";

export function PartnersLogos() {
  const all = partnerGroups.flatMap((g) => g.items);
  const half = Math.ceil(all.length / 2);
  const row1 = all.slice(0, half);
  const row2 = all.slice(half);

  const LogoBox = ({ name }: { name: string }) => (
    <div className="flex h-[60px] w-[160px] flex-shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-white text-sm font-semibold text-neutral-500">
      {name}
    </div>
  );

  const Row = ({ items, reverse = false }: { items: string[]; reverse?: boolean }) => {
    const doubled = [...items, ...items];
    return (
      <div className="overflow-hidden">
        <div className={reverse ? "flex gap-4 animate-marquee-reverse w-max" : "flex gap-4 animate-marquee-slow w-max"}>
          {doubled.map((p, i) => (
            <LogoBox key={`${p}-${i}`} name={p} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="section-y bg-neutral-100">
      <div className="container-x">
        <div className="max-w-3xl mb-8">
          <p className="font-eyebrow text-orange mb-3">Parceiros</p>
          <h2 className="font-h1">Parceiros</h2>
        </div>

        <div className="space-y-4">
          <Row items={row1} />
          <Row items={row2} reverse />
        </div>
      </div>
    </section>
  );
}
