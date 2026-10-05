import { createFileRoute } from "@tanstack/react-router";
import { PremiumHero } from "@/components/home/PremiumHero";
import { EstiloFase1 } from "@/components/home/fase1/EstiloFase1";
import { Especialidades } from "@/components/home/fase1/Especialidades";
import { FoqueNasConquistas, ContratacaoOnline, Metodo, Perfis } from "@/components/home/fase1/BlocosHome";
import { Descoberta } from "@/components/home/fase1/Descoberta";
import { Seguradoras } from "@/components/home/fase1/Seguradoras";
import { Experiencia, Perguntas, CtaFinal } from "@/components/home/fase1/Fechamento";
import { BlogHome } from "@/components/home/fase1/BlogHome";
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Plan10 | Soluções e seguros para você, sua família e sua empresa" },
      {
        name: "description",
        content:
          "Consultoria e corretora de seguros. A Plan10 ajuda a comparar as opções e escolher com clareza o que faz sentido para o seu momento.",
      },
      { property: "og:title", content: "Plan10, suas conquistas merecem horizontes tranquilos" },
      {
        property: "og:description",
        content: "Soluções e seguros para você, sua família e sua empresa.",
      },
      { property: "og:url", content: canonical("/") },
    ],
    links: [{ rel: "canonical", href: canonical("/") }],
  }),
  component: HomePage,
});

/**
 * Ordem exigida pelo pacote de integração: hero, especialidades, "Foque nas
 * conquistas", CTA de contratação online, método, perfis, descoberta,
 * seguradoras, experiência, perguntas, blog e CTA final.
 *
 * Duas regras de ordem são explícitas e estão respeitadas: a descoberta vem
 * logo depois dos perfis, e as seguradoras logo depois da descoberta.
 *
 * O bloco Plan10 Resolve fica fora desta revisão, como o documento pede, com a
 * estrutura preservada no repositório para reavaliação futura.
 */
function HomePage() {
  return (
    <>
      <EstiloFase1 />
      <PremiumHero />
      <Especialidades />
      <FoqueNasConquistas />
      <ContratacaoOnline />
      <Metodo />
      <Perfis />
      <Descoberta />
      <Seguradoras />
      <Experiencia />
      <Perguntas />
      <BlogHome />
      <CtaFinal />
    </>
  );
}
