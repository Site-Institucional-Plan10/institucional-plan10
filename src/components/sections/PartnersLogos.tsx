const row1Logos = [
  { name: "Porto", src: "/assets/partners/logo-porto.png" },
  { name: "Bradesco Seguros", src: "/assets/partners/logo-bradesco.png" },
  { name: "SulAmérica", src: "/assets/partners/logo-sulamerica.png" },
  { name: "Mapfre Seguros", src: "/assets/partners/logo-mapfre.png" },
  { name: "Liberty Seguros", src: "/assets/partners/logo-liberty.svg" },
  { name: "AIG", src: "/assets/partners/logo-aig.png" },
  { name: "AGF Brasil", src: "/assets/partners/logo-agf.png" },
];

const row2Logos = [
  { name: "Amil", src: "/assets/partners/logo-amil.webp" },
  { name: "Hapvida", src: "/assets/partners/logo-hapvida.png" },
  { name: "Grupo NotreDame Intermédica", src: "/assets/partners/logo-notredame.png" },
  { name: "Embracon", src: "/assets/partners/logo-embracon.png" },
  { name: "Porto Bank", src: "/assets/partners/logo-porto-bank.png" },
  { name: "CarSystem", src: "/assets/partners/logo-carsystem.png" },
  { name: "Ituran", src: "/assets/partners/logo-ituran.png" },
];

const cardStyle: React.CSSProperties = {
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
  marginRight: "16px",
};

const imgStyle: React.CSSProperties = {
  maxHeight: "44px",
  maxWidth: "120px",
  width: "auto",
  height: "auto",
  objectFit: "contain",
  filter: "none",
};

export function PartnersLogos() {
  return (
    <section className="section-y bg-neutral-100">
      <style>{`
        @keyframes partners-marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes partners-marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
      <div className="container-x">
        <div className="max-w-3xl mb-8">
          <p className="font-eyebrow text-orange mb-3">Parceiros</p>
          <h2 className="font-h1">Parceiros</h2>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden">
            <div
              style={{
                display: "flex",
                width: "max-content",
                animation: "partners-marquee-left 40s linear infinite",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.animationPlayState = "paused")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.animationPlayState = "running")
              }
            >
              {[...row1Logos, ...row1Logos].map((logo, i) => (
                <div key={`r1-${i}`} style={cardStyle}>
                  <img src={logo.src} alt={logo.name} style={imgStyle} />
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              style={{
                display: "flex",
                width: "max-content",
                animation: "partners-marquee-right 40s linear infinite",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.animationPlayState = "paused")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.animationPlayState = "running")
              }
            >
              {[...row2Logos, ...row2Logos].map((logo, i) => (
                <div key={`r2-${i}`} style={cardStyle}>
                  <img src={logo.src} alt={logo.name} style={imgStyle} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
