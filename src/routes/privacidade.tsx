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
    {
      t: "Coleta de dados",
      b: "A Plan10 coleta os dados que você fornece ao entrar em contato ou solicitar orientação: nome, telefone ou WhatsApp, e-mail, perfil (pessoa física ou jurídica) e as informações necessárias para analisar a solução de interesse. Também registramos dados de navegação por meio de cookies, como páginas visitadas e origem do acesso.",
    },
    {
      t: "Uso dos dados",
      b: "Utilizamos seus dados para responder ao seu contato, elaborar recomendações adequadas ao seu perfil, conduzir a contratação junto às seguradoras e instituições parceiras e manter você informado sobre o andamento e sobre os conteúdos que solicitou. O tratamento observa as bases legais previstas na Lei Geral de Proteção de Dados.",
    },
    {
      t: "Compartilhamento",
      b: "Compartilhamos dados apenas quando necessário para viabilizar a solução escolhida, com as seguradoras, administradoras e instituições parceiras envolvidas, e com prestadores que apoiam a nossa operação sob obrigação de confidencialidade. Também podemos compartilhar quando exigido por lei ou por autoridade competente. A Plan10 não comercializa dados pessoais.",
    },
    {
      t: "Direitos do titular",
      b: "Você pode, a qualquer momento, confirmar a existência de tratamento, acessar seus dados, corrigir informações, solicitar anonimização ou eliminação, revogar consentimento e obter informações sobre eventuais compartilhamentos. Para exercer seus direitos, use os canais indicados abaixo.",
    },
    {
      t: "Cookies",
      b: "Usamos cookies para lembrar suas preferências, medir o desempenho do site e melhorar a sua experiência. Alguns são essenciais para o funcionamento do site. Você pode gerenciar os cookies nas configurações do seu navegador.",
    },
    {
      t: "Encarregado de dados",
      b: "Para tratar de assuntos relacionados aos seus dados pessoais, fale com o nosso Encarregado de Dados pelo e-mail contato@plan10.com.br. Respondemos dentro dos prazos previstos na legislação.",
    },
    {
      t: "Vigência e atualizações",
      b: "Esta Política pode ser atualizada periodicamente. A versão vigente é sempre a publicada nesta página. Recomendamos consultá-la de tempos em tempos.",
    },
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
