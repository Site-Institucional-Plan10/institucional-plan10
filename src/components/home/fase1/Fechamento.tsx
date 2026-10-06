import { Link } from "@tanstack/react-router";
import { getWhatsAppUrl } from "@/lib/utils";

/**
 * Experiência, perguntas e o CTA final da Home. Texto do wireframe do pacote.
 */

const ATRIBUTOS = [
  { t: "Atendimento humano", d: "Espaço para perguntar, explicar e entender." },
  { t: "Clareza nas opções", d: "Condições traduzidas para uma escolha consciente." },
  { t: "Um olhar para o conjunto", d: "Suas diferentes necessidades no contexto da sua vida." },
];

export function Experiencia() {
  return (
    <section className="f1 f1-sec" id="experiencia" aria-labelledby="exp-h">
      <div className="f1-wrap">
        <div className="f1-cab">
          <div>
            <p className="f1-eyebrow">Experiência Plan10</p>
            <h2 className="f1-h2" id="exp-h">
              Atenção ao detalhe. Proximidade na conversa.
            </h2>
          </div>
          <p className="f1-lede">O alto padrão aparece na qualidade da orientação e no cuidado com a sua decisão.</p>
        </div>

        <div className="f1-quatro" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {ATRIBUTOS.map((a) => (
            <div key={a.t} className="f1-item">
              <h3>{a.t}</h3>
              <p>{a.d}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28 }}>
          <Link to="/fale-conosco" className="f1-btn f1-btn-p">
            Começar uma conversa
          </Link>
        </div>

        {/* Nosso horizonte: o bloco de marca que fecha a seção no wireframe */}
        <div
          style={{
            marginTop: 40,
            paddingTop: 30,
            borderTop: "1px solid #E6E1D6",
            display: "grid",
            gap: 14,
          }}
        >
          <p className="f1-eyebrow" style={{ margin: 0 }}>
            Nosso horizonte
          </p>
          <p
            style={{
              fontSize: "clamp(1.18rem, 2.3vw, 1.6rem)",
              lineHeight: 1.35,
              fontWeight: 500,
              letterSpacing: "-.015em",
              color: "#16222F",
              margin: 0,
              maxWidth: "26ch",
            }}
          >
            Tranquilidade para cuidar do hoje. Confiança para ir além. Seguros que abrem novos
            horizontes.
          </p>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 600, margin: "6px 0 0", color: "#16222F" }}>
            Uma marca. Um olhar consultivo.
          </h3>
          <p className="f1-lede" style={{ marginTop: 0 }}>
            A Plan10 conecta proteção, cuidado e planejamento em diferentes especialidades. A
            proposta é ajudar pessoas e empresas a entender suas opções e avançar com mais clareza.
          </p>
          <div>
            <Link to="/quem-somos" className="f1-btn f1-btn-s">
              Conheça nosso jeito de atuar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const PERGUNTAS = [
  {
    q: "A Plan10 é consultoria ou corretora?",
    a: "A Plan10 atua como corretora com atendimento consultivo. Você encontra seguros e outras soluções, com orientação para entender opções, comparar condições e escolher.",
  },
  {
    q: "Posso buscar soluções para mim e para minha empresa?",
    a: "Sim. Seus favoritos podem reunir interesses de diferentes áreas e perfis. Use o filtro para explorar e mantenha todos os itens nos Favoritos.",
  },
  {
    q: "Favoritar já é contratar?",
    a: "Os favoritos organizam seus interesses para pedir uma cotação. Disponibilidade, condições, valores e contratação são tratados separadamente com o consultor e os fornecedores envolvidos.",
  },
  {
    q: "Preciso saber o nome do produto?",
    a: "Você pode descrever o que precisa, como uma viagem, proteção para a casa ou saúde para a equipe. As sugestões ajudam a chegar às soluções relacionadas.",
  },
  {
    q: "Posso revisar uma proteção que já tenho?",
    a: "Salve a solução nos favoritos e escreva que deseja revisar uma contratação existente. Isso ajuda a preparar uma conversa sobre necessidades, condições e alternativas.",
  },
  {
    q: "O que comparar além do preço de um seguro?",
    a: "Observe coberturas, limites de indenização, franquias, exclusões e assistências. Verifique se as propostas consideram as mesmas necessidades e condições antes de comparar o valor total.",
  },
];

export function Perguntas() {
  return (
    <section className="f1 f1-sec f1-alt" id="perguntas" aria-labelledby="perg-h">
      <style>{`
        .f1-faq { margin-top: 26px; display: grid; gap: 10px; max-width: 880px; }
        .f1-faq details {
          background: #fff; border: 1px solid #E6E1D6; border-radius: 10px; overflow: hidden;
        }
        .f1-faq summary {
          cursor: pointer; list-style: none; padding: 16px 48px 16px 20px; position: relative;
          font-size: 1rem; font-weight: 600; color: #16222F;
        }
        .f1-faq summary::-webkit-details-marker { display: none; }
        .f1-faq summary::after {
          content: "+"; position: absolute; right: 20px; top: 50%; transform: translateY(-50%);
          font-size: 1.2rem; color: #9A7B23; font-weight: 400;
        }
        .f1-faq details[open] summary::after { content: "\\2212"; }
        .f1-faq summary:focus-visible { outline: 2px solid #C45016; outline-offset: -2px; }
        .f1-faq .f1-resp { padding: 0 20px 18px; font-size: .95rem; line-height: 1.62; color: #5B6472; }
      `}</style>

      <div className="f1-wrap">
        <div className="f1-cab">
          <div>
            <p className="f1-eyebrow">Decida com informação</p>
            <h2 className="f1-h2" id="perg-h">
              Uma boa pergunta abre caminhos.
            </h2>
          </div>
          <p className="f1-lede">Respostas para começar. Uma conversa para ir mais fundo.</p>
        </div>

        <div className="f1-faq">
          {PERGUNTAS.map((p) => (
            <details key={p.q}>
              <summary>{p.q}</summary>
              <div className="f1-resp">{p.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaFinal() {
  return (
    <section className="f1 f1-sec f1-dark" aria-labelledby="final-h">
      <div className="f1-wrap">
        <h2 className="f1-h2" id="final-h">
          Vamos encontrar a solução que faz sentido para você?
        </h2>
        <p className="f1-lede">
          Conte o que precisa ou favorite as soluções para pedir suas cotações.
        </p>
        <div style={{ marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link to="/fale-conosco" className="f1-btn f1-btn-p">
            Falar com um consultor
          </Link>
          <a
            href={getWhatsAppUrl("default")}
            target="_blank"
            rel="noopener noreferrer"
            className="f1-btn f1-btn-s"
          >
            Conversar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
