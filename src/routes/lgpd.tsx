import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/lgpd")({
  head: () => ({
    meta: [
      { title: "LGPD | Plan10" },
      { name: "description", content: "Como a Plan10 cumpre a Lei Geral de Proteção de Dados." },
      { property: "og:title", content: "LGPD — Plan10" },
      { property: "og:description", content: "Base legal, finalidade e direitos dos titulares." },
    ],
  }),
  component: LgpdPage,
});

function LgpdPage() {
  const sections = [
    "Base legal",
    "Finalidade",
    "Retenção",
    "Direitos (Art. 18 LGPD)",
    "Como exercer seus direitos",
    "Contato do encarregado",
  ];
  return (
    <>
      <section className="pt-32 pb-12 bg-neutral-100">
        <div className="container-x">
          <p className="font-eyebrow text-orange mb-3">Legal</p>
          <h1 className="font-display">LGPD</h1>
        </div>
      </section>
      <section className="section-y">
        <div className="container-x max-w-3xl space-y-8">
          {/* TODO: inserir texto jurídico validado por advogado antes da publicação */}
          {sections.map((s) => (
            <div key={s}>
              <h2 className="font-h3 mb-2">{s}</h2>
              <p className="text-neutral-700">Conteúdo placeholder para a seção "{s}".</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
