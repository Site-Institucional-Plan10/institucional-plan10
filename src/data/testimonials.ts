export interface Testimonial {
  name: string;
  hub: string;
  hubColor: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  { name: "Mariana S.", hub: "seguros", hubColor: "#3D8BF2", text: "Economizei 28% no meu seguro auto sem abrir mão de nenhuma cobertura." },
  { name: "Ricardo M.", hub: "saude", hubColor: "#24BF5B", text: "Encontrei o plano ideal para minha família com a orientação da equipe." },
  { name: "Fernanda A.", hub: "consorcios", hubColor: "#9857F2", text: "Comprei meu primeiro imóvel usando consórcio. O acompanhamento foi excepcional." },
  { name: "João P.", hub: "financas", hubColor: "#C5D0D9", text: "Consegui crédito empresarial com orientação completa do início ao fim." },
  { name: "Eduardo T.", hub: "saude", hubColor: "#24BF5B", text: "Economizei 22% no plano PME da minha empresa." },
  { name: "Roberto F.", hub: "servicos", hubColor: "#27DEF2", text: "Guincho chegou em 20 minutos. Rápido e profissional." },
];
