import { Link } from "@tanstack/react-router";

/**
 * Blocos de texto da Home nova: critérios de escolha, CTA de contratação
 * online, método e os dois perfis. Todo o texto vem do wireframe do pacote.
 *
 * O CTA de contratação online é deliberadamente informativo. O pacote pede que
 * ele sinalize integração em preparação e proíbe simular uma compra concluída,
 * então ele leva às soluções digitais que já existem e diz o estado do canal.
 */

const CRITERIOS = [
  { t: "Coberturas", d: "O que está protegido e em quais situações?" },
  { t: "Limites e franquias", d: "Quanto você assume e quais são os limites da proteção?" },
  { t: "Condições e exclusões", d: "Que detalhes precisam ser conhecidos antes de decidir?" },
  { t: "Custo e benefício", d: "As opções estão sendo comparadas nas mesmas condições?" },
];

export function FoqueNasConquistas() {
  return (
    <section className="f1 f1-sec f1-alt" aria-labelledby="foco-h">
      <div className="f1-wrap">
        <p className="f1-eyebrow">O valor de uma boa escolha</p>
        <h2 className="f1-h2" id="foco-h">
          Foque nas conquistas. Nós cuidamos dos detalhes.
        </h2>
        <p className="f1-lede">
          Da comparação das coberturas ao entendimento das condições, a Plan10 orienta sua escolha
          para você seguir com seus planos com mais tranquilidade.
        </p>

        <div className="f1-quatro">
          {CRITERIOS.map((c) => (
            <div key={c.t} className="f1-item">
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28 }}>
          <Link to="/solucoes" className="f1-btn f1-btn-p">
            Quero entender minhas opções
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ContratacaoOnline() {
  return (
    <section className="f1 f1-sec f1-dark" aria-labelledby="online-h">
      <div className="f1-wrap">
        <p className="f1-eyebrow">Acesso direto quando disponível</p>
        <h2 className="f1-h2" id="online-h">
          Contratação online imediata
        </h2>
        <p className="f1-lede">
          Um caminho para soluções elegíveis com contratação digital. A integração com o canal
          oficial está em preparação, então a confirmação ainda passa por um consultor.
        </p>
        <div style={{ marginTop: 24 }}>
          <Link to="/solucoes-online" className="f1-btn f1-btn-s">
            Ver as soluções digitais →
          </Link>
        </div>
      </div>
    </section>
  );
}

const PASSOS = [
  { n: "01", t: "Entender", d: "Conhecer seu momento, o que você quer proteger e suas prioridades." },
  { n: "02", t: "Comparar", d: "Organizar opções e observar diferenças de coberturas e condições." },
  { n: "03", t: "Recomendar", d: "Explicar as alternativas e os motivos que orientam a escolha." },
  { n: "04", t: "Acompanhar", d: "Tirar dúvidas depois e revisar suas necessidades quando seu momento mudar." },
];

export function Metodo() {
  return (
    <section className="f1 f1-sec" id="metodo" aria-labelledby="metodo-h">
      <div className="f1-wrap">
        <p className="f1-eyebrow">Consultoria que você entende</p>
        <h2 className="f1-h2" id="metodo-h">
          Você conta o que precisa. A Plan10 ajuda a escolher.
        </h2>
        <p className="f1-lede">
          Um atendimento que começa na sua necessidade e dá contexto à decisão.
        </p>

        <div className="f1-quatro">
          {PASSOS.map((p) => (
            <div key={p.n} className="f1-item">
              <span className="f1-num">{p.n}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Perfis() {
  return (
    <section className="f1 f1-sec f1-alt" id="perfis" aria-labelledby="perfis-h">
      <div className="f1-wrap">
        <p className="f1-eyebrow">Cada momento pede um olhar</p>
        <h2 className="f1-h2" id="perfis-h">
          Soluções para sua vida. Segurança para sua empresa.
        </h2>

        <div className="f1-perfis">
          <div className="f1-perfil">
            <p className="f1-eyebrow" style={{ margin: 0 }}>
              Você e sua família
            </p>
            <h3>Proteção para quem você ama.</h3>
            <p>
              Cuide da sua família, proteja sua casa e seu carro e planeje os próximos passos com
              tranquilidade.
            </p>
            <a href="#descoberta" className="f1-btn f1-btn-s" style={{ alignSelf: "start", marginTop: 6 }}>
              Encontrar soluções para mim
            </a>
          </div>

          <div className="f1-perfil">
            <p className="f1-eyebrow" style={{ margin: 0 }}>
              Sua empresa
            </p>
            <h3>Segurança para o seu negócio avançar.</h3>
            <p>
              Proteção para a operação, cuidado com a equipe e planejamento para crescer com mais
              segurança.
            </p>
            <a href="#descoberta" className="f1-btn f1-btn-s" style={{ alignSelf: "start", marginTop: 6 }}>
              Encontrar soluções empresariais
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
