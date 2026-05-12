export interface Testimonial {
  name: string;
  hub: string;
  hubColor: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  // Seguros
  { name: "Mariana S.", hub: "seguros", hubColor: "#3D8BF2", text: "Economizei 28% no meu seguro auto sem abrir mão de nenhuma cobertura." },
  { name: "João P.", hub: "seguros", hubColor: "#3D8BF2", text: "Seguro empresarial mais completo que já contratei. Suporte excelente." },
  { name: "Fernanda R.", hub: "seguros", hubColor: "#3D8BF2", text: "O processo foi simples e rápido. Recomendo a todos." },
  { name: "Carlos M.", hub: "seguros", hubColor: "#3D8BF2", text: "Compararam várias seguradoras e encontraram a melhor opção para mim." },

  // Saúde
  { name: "Juliana R.", hub: "saude", hubColor: "#24BF5B", text: "Encontrei um plano melhor e mais barato com a orientação da Plan10." },
  { name: "Eduardo T.", hub: "saude", hubColor: "#24BF5B", text: "Economizei 22% no plano PME da minha empresa. Vale muito a consultoria." },
  { name: "Ana P.", hub: "saude", hubColor: "#24BF5B", text: "Migrei de plano sem perder nenhuma cobertura. Processo sem burocracia." },
  { name: "Rafael S.", hub: "saude", hubColor: "#24BF5B", text: "A equipe me explicou tudo com clareza antes de eu assinar." },

  // Consórcio
  { name: "Fernanda A.", hub: "consorcios", hubColor: "#9857F2", text: "Comprei meu primeiro imóvel via consórcio. O acompanhamento foi excepcional." },
  { name: "Rafael M.", hub: "consorcios", hubColor: "#9857F2", text: "Fui contemplado mais rápido do que esperava. Ótima orientação de lance." },
  { name: "Lucas B.", hub: "consorcios", hubColor: "#9857F2", text: "Usaram meu FGTS da forma mais inteligente possível. Muito profissional." },
  { name: "Camila F.", hub: "consorcios", hubColor: "#9857F2", text: "Sem juros e com suporte do início ao fim. Não tem como errar." },

  // Finanças
  { name: "Patrícia L.", hub: "financas", hubColor: "#1A4FA0", text: "Taxa muito melhor do que qualquer banco me ofereceu. Recomendo." },
  { name: "Carlos E.", hub: "financas", hubColor: "#1A4FA0", text: "Reorganizei minhas finanças com a orientação da Plan10 em poucas semanas." },
  { name: "Beatriz N.", hub: "financas", hubColor: "#1A4FA0", text: "Portabilidade feita sem complicação. Economizo todo mês agora." },
  { name: "André T.", hub: "financas", hubColor: "#1A4FA0", text: "Análise gratuita e sem compromisso. Me sentei e saí com a solução certa." },

  // Serviços 24h
  { name: "Roberto F.", hub: "servicos", hubColor: "#27DEF2", text: "Guincho chegou em 20 minutos. Serviço rápido e muito profissional." },
  { name: "Ana C.", hub: "servicos", hubColor: "#27DEF2", text: "Chaveiro eficiente e cordial. Resolveu em minutos." },
  { name: "Marcos V.", hub: "servicos", hubColor: "#27DEF2", text: "Atendimento 24h de verdade. Me ajudaram às 2h da manhã sem problema." },
  { name: "Juliana K.", hub: "servicos", hubColor: "#27DEF2", text: "Profissionais qualificados e pontuais. Não fico sem este serviço." },
];
