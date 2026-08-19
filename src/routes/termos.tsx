import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso | Plan10" },
      { name: "description", content: "Termos de uso do site da Plan10." },
      { property: "og:title", content: "Termos de Uso, Plan10" },
      { property: "og:description", content: "Regras de utilização do site." },
      { property: "og:url", content: canonical("/termos") },
    ],
    links: [{ rel: "canonical", href: canonical("/termos") }],
  }),
  component: TermosPage,
});

function TermosPage() {
  const sections = [
    {
      t: "Objeto",
      b: "Estes Termos regem o uso do site da Plan10 e a relação entre você e a Plan10 no ambiente digital. Ao navegar pelo site, você concorda com as regras aqui descritas. A Plan10 atua como consultoria e corretora, conectando pessoas, famílias e empresas às seguradoras e instituições parceiras.",
    },
    {
      t: "Uso do site",
      b: "O site destina-se a apresentar as soluções da Plan10, orientar a sua escolha e viabilizar o contato com um consultor. As informações têm caráter informativo e não substituem a análise consultiva individual. Você se compromete a fornecer dados verdadeiros e a utilizar o site de boa-fé.",
    },
    {
      t: "Propriedade intelectual",
      b: "A marca, o logotipo, os textos, o layout e os demais elementos do site pertencem à Plan10 ou aos seus parceiros e são protegidos por lei. A reprodução, total ou parcial, depende de autorização prévia e por escrito.",
    },
    {
      t: "Limitação de responsabilidade",
      b: "A Plan10 empenha-se para manter as informações corretas e atualizadas, mas condições, coberturas e disponibilidade de produtos são definidas pelas seguradoras e instituições parceiras e podem mudar. A contratação e as condições finais são sempre confirmadas durante o atendimento consultivo.",
    },
    {
      t: "Foro",
      b: "Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de São Paulo, São Paulo, para dirimir eventuais questões, com renúncia a qualquer outro, por mais privilegiado que seja.",
    },
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
          {sections.map((s) => (
            <div key={s.t}>
              <h2 className="font-h3 mb-2">{s.t}</h2>
              <p className="text-neutral-700 leading-relaxed">{s.b}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
