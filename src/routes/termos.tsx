import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso | Plan10" },
      { name: "description", content: "Termos de uso do site da Plan10." },
      { property: "og:title", content: "Termos de Uso — Plan10" },
      { property: "og:description", content: "Regras de utilização do site." },
    ],
  }),
  component: TermosPage,
});

function TermosPage() {
  const sections = [
    "Objeto",
    "Uso do site",
    "Propriedade intelectual",
    "Limitação de responsabilidade",
    "Foro: São Paulo/SP",
  ];
  return (
    <>
      <section className="pt-32 pb-12 bg-neutral-100">
        <div className="container-x">
          <p className="font-eyebrow text-orange mb-3">Legal</p>
          <h1 className="font-display">Termos de Uso</h1>
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
