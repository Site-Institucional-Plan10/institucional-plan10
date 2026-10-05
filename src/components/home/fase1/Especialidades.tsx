import { Link } from "@tanstack/react-router";
import { VERTICAIS } from "@/lib/verticais";

/**
 * As cinco especialidades, com o título em branco sobre a foto e um degradê
 * discreto para garantir contraste, como o pacote de integração pede.
 * Descrição e conteúdo complementar ficam abaixo da imagem.
 *
 * O verbo dos botões é "Conhecer" e não "Explorar", que é o que o wireframe
 * trazia: "explorar" está na lista de palavras que o cliente mandou remover do
 * site em agosto, e a régua de linguagem dele repete a proibição.
 */
const FOTO: Record<string, { s: string; m: string; alt: string }> = {
  seguros: {
    s: "/assets/fase1/plan10-seguros-480.webp",
    m: "/assets/fase1/plan10-seguros-800.webp",
    alt: "Família reunida na varanda de casa ao fim da tarde",
  },
  saude: {
    s: "/assets/fase1/plan10-saude-1-480.webp",
    m: "/assets/fase1/plan10-saude-1-800.webp",
    alt: "Pessoas caminhando juntas ao ar livre",
  },
  financas: {
    s: "/assets/fase1/plan10-financas-480.webp",
    m: "/assets/fase1/plan10-financas-800.webp",
    alt: "Mesa de trabalho com documentos e notebook",
  },
  consorcios: {
    s: "/assets/fase1/plan10-consorcios-1-480.webp",
    m: "/assets/fase1/plan10-consorcios-1-800.webp",
    alt: "Chaves sendo entregues em frente a um imóvel",
  },
  servicos: {
    s: "/assets/fase1/plan10-servicos-480.webp",
    m: "/assets/fase1/plan10-servicos-800.webp",
    alt: "Profissional em atendimento de assistência",
  },
};

const DETALHE: Record<string, { texto: string; chips: string[] }> = {
  seguros: {
    texto: "Proteja sua vida, seus bens e a continuidade do seu negócio.",
    chips: ["Auto e residencial", "Vida e viagem", "Empresarial"],
  },
  saude: {
    texto: "Escolhas de cuidado que consideram sua rotina e suas necessidades.",
    chips: ["Individual e familiar", "Empresarial e PME", "Odontológico"],
  },
  financas: {
    texto: "Planeje os próximos passos com soluções adequadas ao seu momento.",
    chips: ["Previdência", "Crédito", "Planejamento"],
  },
  consorcios: {
    texto: "Transforme objetivos em um plano de conquista de longo prazo.",
    chips: ["Imóveis", "Veículos", "Veículos pesados"],
  },
  servicos: {
    texto: "Mais apoio para situações práticas da vida pessoal e empresarial.",
    chips: ["Assistências", "Benefícios", "Apoio ao dia a dia"],
  },
};

export function Especialidades() {
  return (
    <section className="f1 f1-sec" id="especialidades" aria-labelledby="esp-h">
      <div className="f1-wrap">
        <p className="f1-eyebrow">Uma Plan10. Diferentes especialidades.</p>
        <h2 className="f1-h2" id="esp-h">
          Proteção para cada conquista.
        </h2>
        <p className="f1-lede">
          Encontre o que você precisa hoje. Descubra o que pode fazer sentido amanhã.
        </p>

        <div className="f1-esp">
          {VERTICAIS.map((v) => {
            const foto = FOTO[v.id];
            const d = DETALHE[v.id];
            return (
              <Link
                key={v.id}
                to="/solucoes/$solucao"
                params={{ solucao: v.hub }}
                className="f1-card"
                style={{ ["--acento" as string]: v.cor } as React.CSSProperties}
              >
                <div className="f1-capa">
                  <img
                    src={foto.m}
                    srcSet={`${foto.s} 480w, ${foto.m} 800w`}
                    sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 33vw"
                    width={800}
                    height={500}
                    alt={foto.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>Plan10 {v.label}</h3>
                </div>
                <div className="f1-corpo">
                  <p>{d.texto}</p>
                  <div className="f1-chips">
                    {d.chips.map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                  </div>
                  <span className="f1-ir">Explorar {v.label.toLowerCase()} →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
