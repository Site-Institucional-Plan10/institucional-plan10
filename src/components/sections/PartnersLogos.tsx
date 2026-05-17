import { partnerGroups } from "@/data/partners";

const seguradoras = [
  { name: "Porto", src: "/assets/partners/logo-porto.png" },
  { name: "Bradesco Seguros", src: "/assets/partners/logo-bradesco.png" },
  { name: "SulAmérica", src: "/assets/partners/logo-sulamerica.png" },
  { name: "Mapfre Seguros", src: "/assets/partners/logo-mapfre.png" },
  { name: "Liberty Seguros", src: "/assets/partners/logo-liberty.svg" },
  { name: "AIG", src: "/assets/partners/logo-aig.png" },
  { name: "AGF Brasil", src: "/assets/partners/logo-agf.png" },
];

export function PartnersLogos() {
  const others = partnerGroups
    .filter((g) => g.label !== "Seguradoras")
    .flatMap((g) => g.items);
  const half = Math.ceil(others.length / 2);
  const row1 = others.slice(0, half);
  const row2 = others.slice(half);

  const LogoBox = ({ name }: { name: string }) => (
    <div className="flex h-[60px] w-[160px] flex-shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-white text-sm font-semibold text-neutral-500">
      {name}
    </div>
  );

  const Row = ({ items, reverse = false }: { items: string[]; reverse?: boolean }) => {
    const doubled = [...items, ...items];
    return (
      <div className="overflow-hidden">
        <div
          className="flex gap-4 animate-marquee-slow w-max"
          style={reverse ? { animationDirection: "reverse" } : undefined}
        >
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
          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
            {seguradoras.map((logo) => (
              <div
                key={logo.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#FFFFFF",
                  borderRadius: "10px",
                  padding: "16px 24px",
                  width: "160px",
                  height: "80px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  flexShrink: 0,
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  style={{
                    maxHeight: "44px",
                    maxWidth: "120px",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    filter: "none",
                  }}
                />
              </div>
            ))}
          </div>
          <Row items={row1} />
          <Row items={row2} reverse />
        </div>
      </div>
    </section>
  );
}
