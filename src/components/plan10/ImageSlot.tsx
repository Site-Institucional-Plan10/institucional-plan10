interface Props {
  /** proporção CSS, ex: "16 / 9", "21 / 9", "4 / 3" */
  ratio?: string;
  /** onde/o que é a imagem, ex: "Hero da solução" */
  label: string;
  /** direção de arte (do catálogo 00.3), ex: "Cuidado e bem-estar, ambiente sereno" */
  hint?: string;
  /** tom do painel sobre fundo claro (padrão) ou escuro */
  tone?: "light" | "dark";
}

/**
 * Painel de espaço negativo para imagem. Fica finalizado, premium e discreto
 * (não tracejado), e marca onde a arte entra. Usa a cor da solução (--vp)
 * quando dentro de PageTheme. Para inserir a imagem, trocar por:
 *   <img src="/assets/..." alt="..." style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:5}} />
 */
export function ImageSlot({ ratio = "16 / 9", label, hint, tone = "light" }: Props) {
  const dark = tone === "dark";
  return (
    <div className={`p10-slot ${dark ? "p10-slot-d" : ""}`} style={{ aspectRatio: ratio }} role="img" aria-label={`Espaço de imagem: ${label}`}>
      <style>{`
        .p10-slot {
          width: 100%;
          border: 1px solid #D8D2C6;
          border-radius: 5px;
          background: #EFEBE3;
          display: flex; align-items: center; justify-content: center;
          text-align: center; padding: 28px;
          overflow: hidden;
        }
        .p10-slot-d {
          border-color: rgba(255,255,255,.16);
          background: rgba(255,255,255,.04);
        }
        .p10-slot-in { display: flex; flex-direction: column; align-items: center; gap: 8px; max-width: 42ch; }
        .p10-slot-orn { width: 34px; height: 1px; background: var(--gold, #C9A83C); position: relative; margin-bottom: 4px; }
        .p10-slot-orn::before { content: '\\25C6'; position: absolute; top: -8px; left: 50%; transform: translateX(-50%); color: var(--gold, #C9A83C); font-size: .62rem; }
        .p10-slot-tag {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600; letter-spacing: .2em; text-transform: uppercase;
          font-size: .64rem; color: var(--gold, #C9A83C);
        }
        .p10-slot-label { font-family: 'Playfair Display', Georgia, serif; font-size: 1.15rem; color: #1A1A1A; line-height: 1.3; }
        .p10-slot-d .p10-slot-label { color: #fff; }
        .p10-slot-hint { font-family: 'Inter', system-ui, sans-serif; font-size: .82rem; color: #7A7160; line-height: 1.5; }
        .p10-slot-d .p10-slot-hint { color: rgba(255,255,255,.55); }
      `}</style>
      <div className="p10-slot-in">
        <span className="p10-slot-orn" aria-hidden="true" />
        <span className="p10-slot-tag">Espaço de imagem</span>
        <span className="p10-slot-label">{label}</span>
        {hint && <span className="p10-slot-hint">{hint}</span>}
      </div>
    </div>
  );
}
