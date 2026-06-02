import { useEffect, useState } from "react";
import { createFileRoute, useSearch, useNavigate } from "@tanstack/react-router";
import { Building2, Car, Truck, Sparkles } from "lucide-react";
import { VerticalPageTemplate } from "@/components/vertical/VerticalPageTemplate";
import { consorciosPF, consorciosPJ } from "@/data/products";
import { getVertical } from "@/data/verticals";
import { canonical, faqJsonLd } from "@/lib/seo";
import { categorias } from "@/data/consorcios";
import ConsorcioCategoryPage from "@/components/consorcios/ConsorcioCategoryPage";
import ConsorcioProductPage from "@/components/consorcios/ConsorcioProductPage";

const iconMap = { Building2, Car, Truck, Sparkles };

const consorciosFaq = [
  { title: "Consórcio tem juros?", content: "Não. O consórcio cobra apenas taxa de administração e fundo de reserva, sem juros." },
  { title: "Posso usar FGTS?", content: "Sim. O FGTS pode ser usado em consórcios imobiliários nas condições previstas." },
  { title: "Quanto tempo leva para ser contemplado?", content: "Depende do plano e do tipo de contemplação. Avaliamos isso na consultoria." },
];

export const Route = createFileRoute("/consorcios")({
  head: () => ({
    meta: [
      { title: "Consórcio sem Juros | Plan10, Imóveis e Veículos" },
      { name: "description", content: "Planejamento sem juros para imóveis, veículos e serviços." },
      { property: "og:title", content: "Consórcio, Plan10" },
      { property: "og:description", content: "Financiamento tem juros. Consórcio não." },
      { property: "og:url", content: canonical("/consorcios") },
    ],
    links: [{ rel: "canonical", href: canonical("/consorcios") }],
    scripts: [{ type: "application/ld+json", children: faqJsonLd(consorciosFaq) }],
  }),
  component: ConsorciosRoute,
});

function ConsorciosRoute() {
  const search = useSearch({ strict: false }) as { cat?: string; produto?: string; tipo?: "pf" | "pj" };
  if (search.cat && search.produto && search.tipo) {
    return (
      <ConsorcioProductPage
        categoriaId={search.cat}
        produtoId={search.produto}
        tipo={search.tipo}
      />
    );
  }
  if (search.cat) {
    return <ConsorcioCategoryPage categoriaId={search.cat} />;
  }
  return <ConsorciosPage />;
}

function CategoriasGrid() {
  const navigate = useNavigate();
  return (
    <>
      <style>{`
        .consorcios-categorias-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }
        @media (max-width: 767px) {
          .consorcios-categorias-grid {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
        }
      `}</style>
      <div className="consorcios-categorias-grid">
        {categorias.map((c) => {
          const Icon = iconMap[c.icone as keyof typeof iconMap];
          const clickable = c.ativo;
          return (
            <div
              key={c.id}
              onClick={
                clickable
                  ? () => navigate({ to: "/consorcios", search: { cat: c.rota } as any })
                  : undefined
              }
              className={`bg-white rounded-xl border border-neutral-200 p-6 transition-all duration-200 ${
                clickable ? "cursor-pointer hover:border-[#9857F2] hover:shadow-md" : "pointer-events-none"
              }`}
              style={{
                borderLeft: "4px solid #9857F2",
                opacity: clickable ? 1 : 0.6,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                {Icon ? <Icon size={28} color="#9857F2" /> : null}
                {!c.ativo && (
                  <span className="text-xs bg-neutral-100 text-neutral-500 rounded-full px-2 py-0.5">
                    Em breve
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-lg text-neutral-900">{c.titulo}</h3>
              <p className="text-sm text-neutral-600 mt-2">{c.descricao}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

const simuladorData = {
  imovel: [
    {
      faixa: "R$ 70.000 a R$ 140.000",
      colunas: ["Crédito", "Parcela sem oferta", "Com redução"],
      linhas: [
        ["R$ 70.000", "R$ 1.871", "R$ 272"],
        ["R$ 90.000", "R$ 2.405", "R$ 350"],
        ["R$ 110.000", "R$ 2.940", "R$ 428"],
        ["R$ 140.000", "R$ 3.742", "R$ 545"],
      ],
    },
    {
      faixa: "R$ 150.000 a R$ 280.000",
      colunas: ["Crédito", "Parcela sem oferta", "Com redução"],
      linhas: [
        ["R$ 150.000", "R$ 3.993", "R$ 586"],
        ["R$ 190.000", "R$ 5.058", "R$ 743"],
        ["R$ 240.000", "R$ 6.390", "R$ 939"],
        ["R$ 280.000", "R$ 7.455", "R$ 1.095"],
      ],
    },
    {
      faixa: "R$ 300.000 a R$ 560.000",
      colunas: ["Crédito", "Parcela sem oferta", "Com redução"],
      linhas: [
        ["R$ 300.000", "R$ 7.955", "R$ 1.135"],
        ["R$ 400.000", "R$ 10.606", "R$ 1.513"],
        ["R$ 500.000", "R$ 13.258", "R$ 1.892"],
        ["R$ 560.000", "R$ 14.849", "R$ 2.119"],
      ],
    },
  ],
  veiculo: [
    {
      faixa: "R$ 34.000 a R$ 60.000",
      colunas: ["Crédito", "Parcela sem oferta", "Com redução"],
      linhas: [
        ["R$ 34.000", "R$ 573", "R$ 322"],
        ["R$ 35.000", "R$ 590", "R$ 331"],
        ["R$ 45.000", "R$ 758", "R$ 426"],
        ["R$ 60.000", "R$ 1.011", "R$ 568"],
      ],
    },
    {
      faixa: "R$ 72.500 a R$ 125.000",
      colunas: ["Crédito", "Parcela sem oferta", "Com redução"],
      linhas: [
        ["R$ 72.500", "R$ 1.086", "R$ 612"],
        ["R$ 92.500", "R$ 1.386", "R$ 781"],
        ["R$ 102.500", "R$ 1.536", "R$ 865"],
        ["R$ 125.000", "R$ 1.874", "R$ 1.055"],
      ],
    },
    {
      faixa: "R$ 140.000 a R$ 200.000",
      colunas: ["Crédito", "Parcela sem oferta", "Com redução"],
      linhas: [
        ["R$ 140.000", "R$ 1.882", "R$ 1.063"],
        ["R$ 160.000", "R$ 2.151", "R$ 1.215"],
        ["R$ 180.000", "R$ 2.420", "R$ 1.367"],
        ["R$ 200.000", "R$ 2.688", "R$ 1.518"],
      ],
    },
  ],
  pesados: [
    {
      faixa: "R$ 180.000 a R$ 210.000",
      colunas: ["Crédito", "Parcela sem oferta", "Com redução"],
      linhas: [
        ["R$ 180.000", "R$ 1.863", "R$ 1.060"],
        ["R$ 190.000", "R$ 1.967", "R$ 1.119"],
        ["R$ 200.000", "R$ 2.071", "R$ 1.178"],
        ["R$ 210.000", "R$ 2.174", "R$ 1.237"],
      ],
    },
    {
      faixa: "R$ 220.000 a R$ 280.000",
      colunas: ["Crédito", "Parcela sem oferta", "Com redução"],
      linhas: [
        ["R$ 220.000", "R$ 2.278", "R$ 1.296"],
        ["R$ 240.000", "R$ 2.485", "R$ 1.414"],
        ["R$ 260.000", "R$ 2.692", "R$ 1.532"],
        ["R$ 280.000", "R$ 2.899", "R$ 1.650"],
      ],
    },
    {
      faixa: "R$ 300.000 a R$ 360.000",
      colunas: ["Crédito", "Parcela sem oferta", "Com redução"],
      linhas: [
        ["R$ 300.000", "R$ 3.106", "R$ 1.798"],
        ["R$ 320.000", "R$ 3.313", "R$ 1.886"],
        ["R$ 340.000", "R$ 3.520", "R$ 2.003"],
        ["R$ 360.000", "R$ 3.727", "R$ 2.121"],
      ],
    },
  ],
} as const;

type SimCategoria = "imovel" | "veiculo" | "pesados";

function ConsorciosPage() {
  const v = getVertical("consorcios");

  const [simAberto, setSimAberto] = useState(false);
  const [simCategoria, setSimCategoria] = useState<SimCategoria>("imovel");
  const [simFaixa, setSimFaixa] = useState<number>(0);
  const [faixaDropdownAberto, setFaixaDropdownAberto] = useState(false);
  const [formNome, setFormNome] = useState("");
  const [formWhatsApp, setFormWhatsApp] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMensagem, setFormMensagem] = useState("");

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-faixa-dropdown]")) {
        setFaixaDropdownAberto(false);
      }
    };
    if (faixaDropdownAberto) {
      document.addEventListener("mousedown", handler);
    }
    return () => document.removeEventListener("mousedown", handler);
  }, [faixaDropdownAberto]);

  const abrirSimulador = (cat: SimCategoria) => {
    setSimCategoria(cat);
    setSimFaixa(0);
    setSimAberto(true);
    setTimeout(() => {
      document
        .getElementById("simulador-parcelas")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const triggerCards: { cat: SimCategoria; titulo: string; descricao: string }[] = [
    { cat: "imovel", titulo: "Imóvel", descricao: "De R$ 70 mil a R$ 560 mil" },
    { cat: "veiculo", titulo: "Veículo", descricao: "De R$ 34 mil a R$ 200 mil" },
    { cat: "pesados", titulo: "Veículos Pesados", descricao: "De R$ 180 mil a R$ 360 mil" },
  ];

  return (
    <VerticalPageTemplate
      vertical={v}
      productsTitle="Segmentos de Consórcio"
      productGroupsPF={consorciosPF}
      productGroupsPJ={consorciosPJ}
      productsOverride={<CategoriasGrid />}
      extraTop={
        <section className="py-8 bg-white">
          <div className="container-x">
            <div
              className="rounded-2xl p-8 text-center text-white"
              style={{ background: "linear-gradient(135deg, #9857F2 0%, #6D2FBF 100%)" }}
            >
              <h2 className="font-h2" style={{ color: "#fff" }}>
                Financiamento tem juros. Consórcio não.
              </h2>
            </div>
          </div>
        </section>
      }
      belowProducts={
        <>
          <section className="section-y bg-neutral-100">
            <div className="container-x max-w-5xl">
              <h2 className="font-h2 mb-4 text-center">Simulador de Consórcio</h2>
              <p className="text-neutral-700 mb-8 text-center">
                Escolha um segmento para simular sua parcela.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {triggerCards.map((t) => (
                  <button
                    key={t.cat}
                    onClick={() => abrirSimulador(t.cat)}
                    className="rounded-2xl bg-white border border-neutral-200 p-6 text-left hover:border-orange transition-colors"
                  >
                    <h3 className="font-semibold text-lg mb-1">{t.titulo}</h3>
                    <p className="text-sm text-neutral-600 mb-4">{t.descricao}</p>
                    <span
                      className="inline-block rounded-full px-4 py-2 text-sm font-semibold text-white"
                      style={{ background: "#FF6B00" }}
                    >
                      Simular agora →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {simAberto && (
            <section
              id="simulador-parcelas"
              className="relative py-16 px-4"
              style={{ background: "#0A0520" }}
            >
              <div className="max-w-4xl mx-auto flex justify-end mb-4">
                <button
                  onClick={() => setSimAberto(false)}
                  className="text-gray-400 hover:text-white text-sm flex items-center gap-1.5 transition-colors"
                >
                  ✕ Fechar simulação
                </button>
              </div>

              <div className="max-w-4xl mx-auto">
                <p
                  className="text-center text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "#9857F2" }}
                >
                  SIMULADOR DE PARCELAS
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
                  Simule sua parcela agora
                </h2>

                <div className="flex gap-2 justify-center mb-8 flex-wrap">
                  {(["imovel", "veiculo", "pesados"] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSimCategoria(cat);
                        setSimFaixa(0);
                      }}
                      className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                      style={{
                        background:
                          simCategoria === cat ? "#FF6B00" : "rgba(255,255,255,0.08)",
                        color: simCategoria === cat ? "#FFFFFF" : "#D4D4D4",
                        boxShadow:
                          simCategoria === cat
                            ? "0 4px 16px rgba(255,107,0,0.35)"
                            : "none",
                      }}
                    >
                      {cat === "imovel"
                        ? "Imóvel"
                        : cat === "veiculo"
                          ? "Veículo"
                          : "Veículos Pesados"}
                    </button>
                  ))}
                </div>

                <div
                  className="relative w-full max-w-sm mx-auto mb-8"
                  data-faixa-dropdown
                >
                  <p className="text-gray-400 text-xs mb-1.5 uppercase tracking-widest text-center">
                    Faixa de crédito
                  </p>
                  <button
                    type="button"
                    onClick={() => setFaixaDropdownAberto(!faixaDropdownAberto)}
                    className="w-full flex items-center justify-between rounded-xl px-4 py-3.5 text-white text-sm font-medium transition-colors duration-200 focus:outline-none"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    <span>
                      {simuladorData[simCategoria][simFaixa]?.faixa ||
                        "Selecione a faixa"}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${faixaDropdownAberto ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {faixaDropdownAberto && (
                    <div
                      className="absolute top-full left-0 right-0 z-50 mt-1 rounded-xl overflow-hidden shadow-2xl"
                      style={{
                        background: "#1A1F6E",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      {simuladorData[simCategoria].map((f, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSimFaixa(idx);
                            setFaixaDropdownAberto(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm transition-colors duration-150"
                          style={{
                            borderBottom:
                              idx < simuladorData[simCategoria].length - 1
                                ? "1px solid rgba(255,255,255,0.08)"
                                : "none",
                            background:
                              simFaixa === idx
                                ? "rgba(255,107,0,0.15)"
                                : "transparent",
                            color: simFaixa === idx ? "#FF6B00" : "#D4D4D4",
                          }}
                        >
                          {f.faixa}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className="hidden md:block overflow-hidden rounded-xl"
                  style={{ border: "1px solid rgba(255,255,255,0.10)" }}
                >
                  <table
                    className="w-full text-sm"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    <thead>
                      <tr>
                        {simuladorData[simCategoria][simFaixa].colunas.map(
                          (col, i) => (
                            <th
                              key={i}
                              className="px-4 py-3 text-left font-bold"
                              style={{
                                background:
                                  i === 2
                                    ? "#FF6B00"
                                    : i === 1
                                      ? "rgba(255,255,255,0.08)"
                                      : "rgba(255,255,255,0.04)",
                                color: i === 1 ? "#888888" : "#FFFFFF",
                              }}
                            >
                              {col}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {simuladorData[simCategoria][simFaixa].linhas.map(
                        (linha, i) => (
                          <tr
                            key={i}
                            style={{
                              background:
                                i % 2 === 0
                                  ? "rgba(255,255,255,0.02)"
                                  : "transparent",
                            }}
                          >
                            {linha.map((cel, j) => (
                              <td
                                key={j}
                                className="px-4 py-3"
                                style={{
                                  color:
                                    j === 2
                                      ? "#4ade80"
                                      : j === 1
                                        ? "#888888"
                                        : "#FFFFFF",
                                  fontWeight: j === 2 ? 700 : 400,
                                  textDecoration:
                                    j === 1 ? "line-through" : "none",
                                }}
                              >
                                {cel}
                              </td>
                            ))}
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="md:hidden space-y-3">
                  {simuladorData[simCategoria][simFaixa].linhas.map(
                    (linha, i) => (
                      <div
                        key={i}
                        className="rounded-xl p-4"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.10)",
                        }}
                      >
                        <p className="text-white font-bold text-lg mb-2">
                          {linha[0]}
                        </p>
                        <div className="flex justify-between items-center">
                          <div>
                            <p
                              className="text-xs mb-0.5"
                              style={{ color: "#888888" }}
                            >
                              Parcela sem oferta
                            </p>
                            <p
                              className="text-sm"
                              style={{
                                color: "#888888",
                                textDecoration: "line-through",
                              }}
                            >
                              {linha[1]}
                            </p>
                          </div>
                          <div className="text-right">
                            <p
                              className="text-xs mb-0.5"
                              style={{ color: "#9CA3AF" }}
                            >
                              Com redução
                            </p>
                            <p
                              className="text-xl font-bold"
                              style={{ color: "#4ade80" }}
                            >
                              {linha[2]}
                            </p>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>

                <div
                  className="mt-10 rounded-2xl p-6"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <h3 className="text-white font-bold text-lg text-center mb-2">
                    Gostou? Fale com nosso consultor
                  </h3>
                  <p
                    className="text-center text-sm mb-6"
                    style={{ color: "#9CA3AF" }}
                  >
                    Garanta essa condição com um especialista Plan10.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    {[
                      {
                        placeholder: "Seu nome",
                        value: formNome,
                        setter: setFormNome,
                        type: "text",
                      },
                      {
                        placeholder: "Seu e-mail",
                        value: formEmail,
                        setter: setFormEmail,
                        type: "email",
                      },
                      {
                        placeholder: "Seu WhatsApp",
                        value: formWhatsApp,
                        setter: setFormWhatsApp,
                        type: "tel",
                      },
                    ].map(({ placeholder, value, setter, type }) => (
                      <input
                        key={placeholder}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        className="rounded-xl px-4 py-3 text-white text-sm focus:outline-none w-full"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          fontFamily: "Plus Jakarta Sans, sans-serif",
                        }}
                      />
                    ))}
                  </div>
                  <textarea
                    placeholder="Mensagem (opcional)"
                    value={formMensagem}
                    onChange={(e) => setFormMensagem(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl px-4 py-3 text-white text-sm focus:outline-none resize-none mb-3"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                    }}
                  />
                  <button
                    onClick={() => {
                      const cat =
                        simCategoria === "imovel"
                          ? "Imóvel"
                          : simCategoria === "veiculo"
                            ? "Veículo"
                            : "Veículos Pesados";
                      const faixa =
                        simuladorData[simCategoria][simFaixa]?.faixa || "";
                      const msg = encodeURIComponent(
                        `Olá! Tenho interesse no Consórcio de ${cat}.\n` +
                          `Faixa: ${faixa}\n` +
                          `Nome: ${formNome}\n` +
                          `WhatsApp: ${formWhatsApp}\n` +
                          `E-mail: ${formEmail}\n` +
                          (formMensagem ? `Mensagem: ${formMensagem}` : ""),
                      );
                      window.open(
                        `https://api.whatsapp.com/send/?phone=5511938012222&text=${msg}`,
                        "_blank",
                      );
                    }}
                    className="w-full text-white font-bold py-4 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2"
                    style={{ background: "#FF6B00" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#E05A00")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#FF6B00")
                    }
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.847L0 24l6.336-1.508A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.014-1.376l-.36-.214-3.732.888.944-3.637-.235-.374A9.818 9.818 0 1112 21.818z" />
                    </svg>
                    Quero essa condição no WhatsApp
                  </button>
                </div>
              </div>
            </section>
          )}
        </>
      }
      freeServices={[
        "Simulação personalizada",
        "Comparação entre administradoras",
        "Análise de lance",
        "Orientação para uso de FGTS",
        "Consultoria para investimento via consórcio",
      ]}
      faqItems={consorciosFaq}
    />
  );
}
