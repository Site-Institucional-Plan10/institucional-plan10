import { partnerGroups } from "@/data/partners";

export function PartnersLogos() {
  return (
    <section className="section-y bg-neutral-100">
      <div className="container-x">
        <div className="max-w-3xl mb-10">
          <p className="font-eyebrow text-orange mb-3">Parceiros</p>
          <h2 className="font-h1">Parceiros</h2>
        </div>

        <div className="space-y-8">
          {partnerGroups.map((g) => (
            <div key={g.label}>
              <h4 className="font-eyebrow text-neutral-500 mb-3">{g.label}</h4>
              <div className="flex flex-wrap gap-4">
                {/* TODO: replace boxes with actual logo SVGs/PNGs when provided by client */}
                {g.items.map((p) => (
                  <div
                    key={p}
                    className="flex h-[60px] w-[160px] items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-white text-sm font-semibold text-neutral-500"
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
