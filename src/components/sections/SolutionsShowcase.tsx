import { Link } from "@tanstack/react-router";

/**
 * "As Soluções Plan10": índice fino e editorial (sem cards quadrados), pedido do
 * cliente. Conteúdo oficial: 01_HOME.xlsx coluna D (nomes, microcopy e cores por solução).
 */
// Cores calmas/foscas por solução: acento discreto (padrão sóbrio, cor só realça no hover).
const SOLUCOES = [
  { slug: "saude", nome: "Saúde e vida saudável", micro: "Cuidado, prevenção e acesso à saúde para pessoas, famílias e empresas.", cor: "#3F6B4F", soft: "#EEF1EA" },
  { slug: "protecao", nome: "Proteção à vida e ao patrimônio", micro: "Proteção para pessoas, patrimônio e responsabilidades em diferentes fases.", cor: "#2B4C68", soft: "#EDEDE7" },
  { slug: "financeiras", nome: "Soluções financeiras", micro: "Crédito, liquidez, reservas e decisões financeiras conectados a objetivos de curto e longo prazo.", cor: "#A9843C", soft: "#F2EEE3" },
  { slug: "crescimento", nome: "Crescimento e mobilidade", micro: "Planejamento para aquisições, mobilidade, ativos e expansão.", cor: "#5A4A76", soft: "#EFEDE9" },
  { slug: "assistencia", nome: "Assistência pessoal e empresarial", micro: "Suporte para preservar rotina, ambientes, mobilidade e continuidade de pessoas e empresas.", cor: "#9A5A2A", soft: "#F3EBE2" },
] as const;

export function SolutionsShowcase() {
  return (
    <section className="p10x" aria-labelledby="p10x-h">
      <style>{`
        .p10x { background: #F4F2EC; color: #0B1A2F; padding: 84px 24px; font-family: 'Inter', system-ui, sans-serif; }
        .p10x-in { max-width: 1120px; margin: 0 auto; }
        .p10x-eyebrow {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-weight: 500; font-size: .72rem; letter-spacing: .3em; text-transform: uppercase;
          color: #9A7B23; margin: 0 0 18px; display: inline-flex; align-items: center; gap: 12px;
        }
        .p10x-eyebrow::before { content: ""; width: 26px; height: 1px; background: #C9A83C; }
        .p10x-h2 {
          font-family: 'Schibsted Grotesk', 'Inter', sans-serif; font-weight: 600;
          font-size: clamp(1.9rem, 4vw, 3rem); line-height: 1.06; letter-spacing: -.025em;
          color: #0B1A2F; margin: 0; max-width: 18ch;
        }
        .p10x-lede { font-size: 1.05rem; line-height: 1.6; color: #4A5568; margin: 20px 0 0; max-width: 52ch; }
        .p10x-list { margin-top: 40px; border-top: 1px solid #E2DDD3; }
        .p10x-row {
          --c: #C9A83C; --soft: #F0EEE8;
          display: grid; grid-template-columns: 22px 1.05fr 1.15fr auto;
          align-items: center; gap: 28px;
          padding: 30px 20px 30px 8px; border-bottom: 1px solid #E2DDD3;
          text-decoration: none; color: #0B1A2F; position: relative;
          transition: background .28s ease, padding-left .28s ease;
        }
        .p10x-row::before {
          content: ""; position: absolute; left: 0; top: 50%; transform: translateY(-50%);
          width: 3px; height: 0; background: var(--c); border-radius: 3px; transition: height .28s ease;
        }
        .p10x-marker { width: 11px; height: 11px; border-radius: 999px; background: var(--c); transition: transform .28s ease; }
        .p10x-name {
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
        .p10x-row:hover .p10x-marker { transform: scale(1.35); }
        .p10x-row:hover .p10x-name { color: var(--c); }
        .p10x-row:hover .p10x-go { color: var(--c); gap: 12px; }
        .p10x-row:focus-visible { outline: 2px solid var(--c); outline-offset: -2px; }
        @media (max-width: 860px) {
          .p10x { padding: 84px 20px; }
          .p10x-row { grid-template-columns: 14px 1fr auto; gap: 14px 16px; padding: 22px 8px; }
          .p10x-micro { grid-column: 2 / 4; font-size: .92rem; }
          .p10x-marker { width: 9px; height: 9px; }
        }
      `}</style>
      <div className="p10x-in">
        <p className="p10x-eyebrow">As Soluções Plan10</p>
        <h2 id="p10x-h" className="p10x-h2">Cinco soluções, uma jornada consultiva.</h2>
        <p className="p10x-lede">Conheça as Soluções Plan10 e encontre o caminho mais próximo da sua fase.</p>

        <div className="p10x-list">
          {SOLUCOES.map((s) => (
            <Link
              key={s.slug}
              to="/solucoes/$solucao"
              params={{ solucao: s.slug }}
              className="p10x-row"
              style={{ ["--c" as string]: s.cor, ["--soft" as string]: s.soft } as React.CSSProperties}
            >
              <span className="p10x-marker" aria-hidden />
              <span className="p10x-name">{s.nome}</span>
              <span className="p10x-micro">{s.micro}</span>
              <span className="p10x-go" aria-hidden>Explorar
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
