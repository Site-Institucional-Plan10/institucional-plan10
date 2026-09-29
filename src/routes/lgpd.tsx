import { createFileRoute } from "@tanstack/react-router";
import { PageTheme, PALETTES } from "@/components/plan10/PageTheme";
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/lgpd")({
  head: () => ({
    meta: [
      { title: "LGPD | Plan10" },
      { name: "description", content: "Como a Plan10 cumpre a Lei Geral de Proteção de Dados." },
      { property: "og:title", content: "LGPD, Plan10" },
      { property: "og:description", content: "Base legal, finalidade e direitos dos titulares." },
      { property: "og:url", content: canonical("/lgpd") },
    ],
    links: [{ rel: "canonical", href: canonical("/lgpd") }],
  }),
  component: LgpdPage,
});

function LgpdPage() {
  const sections = [
    {
      t: "Base legal",
      b: "O tratamento de dados pela Plan10 apoia-se nas bases legais da Lei Geral de Proteção de Dados, especialmente o consentimento do titular, a execução de procedimentos preliminares e de contratos a pedido do titular, o cumprimento de obrigação legal ou regulatória e o legítimo interesse, sempre respeitados os seus direitos.",
    },
    {
      t: "Finalidade",
      b: "Tratamos dados para orientar a sua escolha, elaborar recomendações adequadas, viabilizar a contratação junto às seguradoras e instituições parceiras, prestar atendimento e cumprir obrigações legais. Não utilizamos seus dados para finalidades incompatíveis com essas ou sem a devida base legal.",
    },
    {
      t: "Retenção",
      b: "Mantemos os dados apenas pelo tempo necessário às finalidades informadas e ao cumprimento de obrigações legais e regulatórias. Encerrado esse período, os dados são eliminados ou anonimizados, salvo hipóteses de guarda previstas em lei.",
    },
    {
      t: "Direitos do titular (Art. 18)",
      b: "A LGPD assegura a você: confirmação da existência de tratamento; acesso aos dados; correção de dados incompletos ou desatualizados; anonimização, bloqueio ou eliminação de dados desnecessários; portabilidade; informação sobre compartilhamentos; e revogação do consentimento.",
    },
    {
      t: "Como exercer seus direitos",
      b: "Basta enviar a sua solicitação para o e-mail contato@plan10.com.br, identificando o pedido. Podemos solicitar informações adicionais para confirmar a sua identidade antes de atender, como medida de segurança, e respondemos dentro dos prazos legais.",
    },
    {
      t: "Contato do encarregado",
      b: "O Encarregado de Dados (DPO) da Plan10 pode ser contatado pelo e-mail contato@plan10.com.br para qualquer assunto relacionado à proteção dos seus dados pessoais.",
    },
  ];
  return (
    <PageTheme palette={PALETTES.institucional}>
      <header className="p10-hero">
        <div className="p10-hero-inner">
          <p className="eyebrow">Legal</p>
          <h1>LGPD</h1>
        </div>
      </header>
      <section className="sec">
        <div className="wrap" style={{ maxWidth: 760, display: "grid", gap: 26 }}>
          {sections.map((s) => (
            <div key={s.t}>
              <h2 style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: "clamp(1.1rem, 1.8vw, 1.32rem)", color: "var(--preto)", margin: "0 0 8px" }}>
                {s.t}
              </h2>
              <p className="p10-lede">{s.b}</p>
            </div>
          ))}
        </div>
      </section>
    </PageTheme>
  );
}
