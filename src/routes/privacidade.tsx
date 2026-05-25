import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Plan10" },
      { name: "description", content: "Política de Privacidade da Plan10 conforme LGPD." },
      { property: "og:title", content: "Política de Privacidade, Plan10" },
      { property: "og:description", content: "Como tratamos seus dados pessoais." },
      { property: "og:url", content: canonical("/privacidade") },
    ],
    links: [{ rel: "canonical", href: canonical("/privacidade") }],
  }),
  component: PrivacidadePage,
});

function PrivacidadePage() {
  const sections = [
    "Coleta de dados",
    "Uso",
    "Compartilhamento",
    "Direitos do titular",
    "Cookies",
    "DPO contato",
    "Data de vigência",
  ];
  return (
    <>
      <section className="pt-32 pb-12 bg-neutral-100">
        <div className="container-x">
          <p className="font-eyebrow text-orange mb-3">Legal</p>
          <h1 className="font-display">Política de Privacidade</h1>
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
