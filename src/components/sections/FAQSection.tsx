import { Accordion } from "@/components/ui/primitives";

export function FAQSection({ items, title = "Perguntas Frequentes" }: { items?: { title: string; content: string }[]; title?: string }) {
  /* TODO: confirmar respostas com cliente antes da publicação */
  const defaultItems = [
    { title: "A Plan10 é uma seguradora?", content: "Não. A Plan10 é uma corretora multimodal credenciada pela SUSEP que conecta você às melhores seguradoras e instituições do país." },
    { title: "Quanto custa a consultoria?", content: "A consultoria Plan10 é gratuita. Você só paga pelo produto contratado, com o mesmo preço da seguradora." },
    { title: "Atendem todo o Brasil?", content: "Sim. O atendimento é digital e chega a todo o território nacional." },
    { title: "Como funciona o suporte em sinistro?", content: "Acompanhamos o processo do início ao fim, ajudando na documentação e comunicação com a seguradora." },
    { title: "Quais seguradoras vocês trabalham?", content: "Trabalhamos com as principais seguradoras do mercado brasileiro. Veja a lista completa na seção Parceiros." },
  ];

  const list = (items ?? defaultItems).map((i) => ({
    title: i.title,
    content: <p>{i.content}</p>,
  }));

  return (
    <section className="section-y">
      <div className="container-x max-w-3xl">
        <p className="font-eyebrow text-orange mb-3">Dúvidas</p>
        <h2 className="font-h1 mb-8">{title}</h2>
        <Accordion items={list} />
      </div>
    </section>
  );
}
