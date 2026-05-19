export interface Testimonial {
  id: string;
  name: string;
  role: string;
  photo: string;
  text: string;
  hub: string;
  hubColor: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "depo-01",
    name: "Diego Kaupp",
    role: "Empresário",
    photo: "/assets/testimonials/testimonial-diego-kaupp.jpg",
    text: "Sempre atenciosos e prestativos. Seja seguro de auto, vida, saúde, etc.... Só faço com eles! Recomendo.",
    hub: "seguros",
    hubColor: "#3D8BF2",
  },
  {
    id: "depo-02",
    name: "Marlene Saggiomo e Júlio Domingos Vieira",
    role: "Do lar / Aposentado",
    photo: "/assets/testimonials/testimonial-marlene-julio.jpg",
    text: "Somos clientes desde 2014. Profissional e especialistas no seguimento. Atendimento de primeira linha. Dedicados e prestativos. Aconselho e recomendo. Excelente em todos os aspectos.",
    hub: "seguros",
    hubColor: "#3D8BF2",
  },
  {
    id: "depo-03",
    name: "Johnny Neves",
    role: "Empresário",
    photo: "/assets/testimonials/testimonial-johnny-neves.jpg",
    text: "Sempre faço meus seguros com eles. Excelente profissionais. Recomendo sempre. Parabéns e obrigado pelos serviços prestados.",
    hub: "seguros",
    hubColor: "#3D8BF2",
  },
  {
    id: "depo-04",
    name: "Dra. Mara Lúcia Peçanha",
    role: "Advogada",
    photo: "/assets/testimonials/testimonial-dra-mara.jpg",
    text: "Gostaria de deixar o meu agradecimento pelo ótimo serviço prestado. Sempre fui atendida muito bem e prontamente. Muito obrigada.",
    hub: "saude",
    hubColor: "#24BF5B",
  },
  {
    id: "depo-05",
    name: "Antônio Carlos da Conceição",
    role: "Secretário — Palácio dos Bandeirantes",
    photo: "/assets/testimonials/testimonial-antonio-carlos.jpg",
    text: "Sempre fui muito bem atendido, com rapidez e eficiência. Melhor custo benefício não existe. Parabéns à equipe.",
    hub: "financas",
    hubColor: "#1A4FA0",
  },
  {
    id: "depo-06",
    name: "Ademario R. de Oliveira",
    role: "Administrador",
    photo: "/assets/testimonials/testimonial-ademario.jpg",
    text: "Já há alguns anos sou atendido por essa equipe. Uma boa consultoria com ótimo atendimento. Recomendo.",
    hub: "consorcios",
    hubColor: "#9857F2",
  },
];

export const verticalTestimonialIds: Record<string, string[]> = {
  seguros: ["depo-01", "depo-02", "depo-03"],
  saude: ["depo-04", "depo-02"],
  consorcios: ["depo-06", "depo-02"],
  financas: ["depo-05", "depo-04"],
  servicos: ["depo-05", "depo-06"],
};
