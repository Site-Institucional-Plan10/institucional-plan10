import { Link } from "@tanstack/react-router";

/**
 * "As Soluções Plan10": índice fino e editorial (sem cards quadrados), pedido do
 * cliente. Conteúdo oficial: 01_HOME.xlsx coluna D (nomes, microcopy e cores por solução).
 */
// Cores calmas/foscas por solução: acento discreto (padrão sóbrio, cor só realça no hover).
// Foto: derivadas otimizadas em /assets/solucoes. Saúde e assistência vêm do Pexels
// (licença livre para uso comercial, sem exigência de crédito); as demais foram
// recortadas do acervo do projeto, sempre para
// mostrar o assunto de cada frente. Nenhuma tem rosto reconhecível, o que mantém a regra
// da marca válida também em saúde e em dinheiro. Cada arquivo tem menos de 180KB.
const SOLUCOES = [
  {
    slug: "saude",
    nome: "Saúde e vida saudável",
    micro: "Cuidado, prevenção e acesso à saúde para pessoas, famílias e empresas.",
    cor: "#3F6B4F",
    soft: "#EEF1EA",
    foto: "/assets/solucoes/saude.jpg",
    alt: "Sala com vista para o mar ao amanhecer e uma planta junto à janela",
  },
  {
    slug: "protecao",
    nome: "Proteção à vida e ao patrimônio",
    micro: "Proteção para pessoas, patrimônio e responsabilidades em diferentes fases.",
    cor: "#2B4C68",
    soft: "#EDEDE7",
    foto: "/assets/solucoes/protecao.jpg",
    alt: "Casa contemporânea iluminada à beira de um lago ao pôr do sol",
  },
  {
    slug: "financeiras",
    nome: "Soluções financeiras",
    micro:
      "Crédito, liquidez, reservas e decisões financeiras conectados a objetivos de curto e longo prazo.",
    cor: "#A9843C",
    soft: "#F2EEE3",
    foto: "/assets/solucoes/financeiras.jpg",
    alt: "Documentos marcados, caneta e óculos sobre a mesa de trabalho",
  },
  {
    slug: "crescimento",
    nome: "Crescimento e mobilidade",
    micro: "Planejamento para aquisições, mobilidade, ativos e expansão.",
    cor: "#5A4A76",
    soft: "#EFEDE9",
    foto: "/assets/solucoes/crescimento.jpg",
    alt: "Automóvel em estrada de serra no fim da tarde",
  },
  {
    slug: "assistencia",
    nome: "Assistência pessoal e empresarial",
    micro:
      "Suporte para preservar rotina, ambientes, mobilidade e continuidade de pessoas e empresas.",
    cor: "#9A5A2A",
    soft: "#F3EBE2",
    foto: "/assets/solucoes/assistencia.jpg",
    alt: "Guincho transportando um automóvel na rodovia",
  },
] as const;

export function SolutionsShowcase() {
  return (
    <section className="p10x" aria-labelledby="p10x-h">
      <style>{`
        .p10x { background: #F4F2EC; color: #0B1A2F; padding: 52px 24px; font-family: 'Inter', system-ui, sans-serif; }
        .p10x-in { max-width: 1120px; margin: 0 auto; }
        .p10x-h2 {
          font-family: 'Schibsted Grotesk', 'Inter', sans-serif; font-weight: 600;
          font-size: clamp(1.9rem, 4vw, 3rem); line-height: 1.06; letter-spacing: -.025em;
          color: #0B1A2F; margin: 0; max-width: 46ch;
        }
        .p10x-lede {
          display: inline; font-size: 1.05rem; line-height: 1.6; color: #4A5568;
          margin: 20px 0 0; max-width: 52ch;
          text-decoration: underline; text-decoration-color: #CFC9BC;
          text-decoration-thickness: 1px; text-underline-offset: 5px;
          transition: color .2s ease, text-decoration-color .2s ease;
        }
        .p10x-lede-wrap { margin: 20px 0 0; max-width: 52ch; }
        .p10x-lede-fim { white-space: nowrap; }
        .p10x-lede svg { vertical-align: -3px; margin-left: 7px; transition: transform .2s ease; }
        .p10x-lede:hover { color: #0B1A2F; text-decoration-color: #0B1A2F; }
        .p10x-lede:hover svg { transform: translateX(4px); }
        .p10x-lede:focus-visible { outline: 2px solid #C45016; outline-offset: 3px; }
        .p10x-list { margin-top: 26px; border-top: 1px solid #E2DDD3; }
        .p10x-row {
          --c: #C9A83C; --soft: #F0EEE8;
          display: grid; grid-template-columns: 104px 1.3fr 1fr auto;
          align-items: center; gap: 28px;
          padding: 14px 20px 14px 8px; border-bottom: 1px solid #E2DDD3;
          text-decoration: none; color: #0B1A2F; position: relative;
          transition: background .28s ease, padding-left .28s ease;
        }
        .p10x-row::before {
          content: ""; position: absolute; left: 0; top: 50%; transform: translateY(-50%);
          width: 3px; height: 0; background: var(--c); border-radius: 3px; transition: height .28s ease;
        }
        .p10x-foto { position: relative; width: 104px; aspect-ratio: 16 / 11; overflow: hidden; border-radius: 6px; background: #E4E0D6; }
        .p10x-foto img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s cubic-bezier(.2,.7,.3,1); }
        .p10x-foto::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: var(--c); }
        .p10x-row:hover .p10x-foto img { transform: scale(1.06); }
        .p10x-name {
          text-wrap: balance;
          font-family: 'Schibsted Grotesk', 'Inter', sans-serif; font-weight: 600;
          font-size: clamp(1.3rem, 2.2vw, 1.85rem); line-height: 1.15; letter-spacing: -.02em;
          color: #0B1A2F; transition: color .2s ease;
        }
        .p10x-micro { font-size: .98rem; line-height: 1.55; color: #5B6472; }
        .p10x-go {
          font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: .72rem;
          letter-spacing: .16em; text-transform: uppercase; color: #9AA1AC;
          display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; transition: color .2s ease, gap .2s ease;
        }
        .p10x-row:hover { background: var(--soft); padding-left: 22px; }
        .p10x-row:hover::before { height: 62%; }
        
        .p10x-row:hover .p10x-name { color: var(--c); }
        .p10x-row:hover .p10x-go { color: var(--c); gap: 12px; }
        .p10x-row:focus-visible { outline: 2px solid var(--c); outline-offset: -2px; }
        @media (max-width: 860px) {
          .p10x { padding: 44px 20px; }
          .p10x-row { position: relative; grid-template-columns: 72px 1fr; gap: 14px; padding: 13px 34px 13px 6px; align-items: center; }
          .p10x-micro { display: none; }
          .p10x-foto { width: 72px; align-self: center; }

          /* seta alinhada ao nome, que agora é a única linha do item */
          .p10x-go { position: absolute; right: 4px; top: 50%; transform: translateY(-50%); }
          .p10x-row:hover { padding-left: 8px; }
        }
      `}</style>
      <div className="p10x-in">
        <h2 id="p10x-h" className="p10x-h2">
          Soluções Plan10
        </h2>
        <p className="p10x-lede-wrap">
          <Link to="/solucoes" className="p10x-lede">
            Conheça as Soluções Plan10 e encontre o caminho mais próximo da sua{" "}
            <span className="p10x-lede-fim">
              fase.
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </p>

        <div className="p10x-list">
          {SOLUCOES.map((s) => (
            <Link
              key={s.slug}
              to="/solucoes/$solucao"
              params={{ solucao: s.slug }}
              className="p10x-row"
              style={
                { ["--c" as string]: s.cor, ["--soft" as string]: s.soft } as React.CSSProperties
              }
            >
              <span className="p10x-foto">
                <img src={s.foto} alt={s.alt} loading="lazy" decoding="async" />
              </span>
              <span className="p10x-name">{s.nome}</span>
              <span className="p10x-micro">{s.micro}</span>
              <span className="p10x-go" aria-hidden>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
