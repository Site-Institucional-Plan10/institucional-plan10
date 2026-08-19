interface Props {
  /** proporção CSS, ex: "16 / 9", "21 / 9", "4 / 3" */
  ratio?: string;
  /** onde/o que é a imagem, ex: "Hero da solução" */
  label: string;
  /** direção de arte (do catálogo 00.3), ex: "Cuidado e bem-estar, ambiente sereno" */
  hint?: string;
  /** tom do placeholder sobre fundo claro (padrão) ou escuro */
  tone?: "light" | "dark";
}

/**
 * Espaço reservado para imagem. Marca onde a arte entra e some quando for
 * trocado por <img>. Usa a cor da solução (--vp) quando dentro de PageTheme.
 * Para inserir a imagem: substituir este componente por
 *   <img src="/assets/..." alt="..." style={{width:'100%',...}} />
 */
export function ImageSlot({ ratio = "16 / 9", label, hint, tone = "light" }: Props) {
  const dark = tone === "dark";
  return (
    <div className={`p10-slot ${dark ? "p10-slot-d" : ""}`} style={{ aspectRatio: ratio }} role="img" aria-label={`Espaço para imagem: ${label}`}>
      <style>{`
        .p10-slot {
          width: 100%;
          border: 1.5px dashed var(--vp, #1C4E80);
          border-radius: 12px;
          background:
            repeating-linear-gradient(135deg, transparent 0 14px, rgba(28,78,128,.03) 14px 15px),
            var(--vs, #F4F1EB);
          display: flex; align-items: center; justify-content: center;
          text-align: center; padding: 24px;
          overflow: hidden;
        }
        .p10-slot-d {
          border-color: rgba(255,255,255,.35);
          background: repeating-linear-gradient(135deg, transparent 0 14px, rgba(255,255,255,.04) 14px 15px), rgba(255,255,255,.04);
        }
        .p10-slot-in { display: flex; flex-direction: column; align-items: center; gap: 6px; max-width: 40ch; }
        .p10-slot svg { opacity: .5; margin-bottom: 4px; }
        .p10-slot-tag {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; letter-spacing: .18em; text-transform: uppercase;
          font-size: .68rem; color: var(--vp, #1C4E80);
        }
        .p10-slot-d .p10-slot-tag { color: rgba(255,255,255,.8); }
        .p10-slot-label { font-family: 'Playfair Display', Georgia, serif; font-size: 1.05rem; color: #1A1A1A; }
        .p10-slot-d .p10-slot-label { color: #fff; }
        .p10-slot-hint { font-family: 'Inter', system-ui, sans-serif; font-size: .82rem; color: #6B6456; line-height: 1.5; }
        .p10-slot-d .p10-slot-hint { color: rgba(255,255,255,.6); }
      `}</style>
      <div className="p10-slot-in">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={dark ? "#fff" : "var(--vp, #1C4E80)"} strokeWidth="1.5" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.5" cy="9.5" r="1.5" />
          <path d="M21 16l-5-5-6 6-3-3-4 4" />
        </svg>
        <span className="p10-slot-tag">Imagem</span>
        <span className="p10-slot-label">{label}</span>
        {hint && <span className="p10-slot-hint">{hint}</span>}
      </div>
    </div>
  );
}
