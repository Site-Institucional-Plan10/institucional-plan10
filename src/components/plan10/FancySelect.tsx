import { useEffect, useId, useRef, useState } from "react";

export interface FancyOption {
  value: string;
  label: string;
}

interface Props {
  options: FancyOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  /** "dark" para formulário em fundo escuro (funil), "light" para fundo claro (home). */
  tone?: "dark" | "light";
  error?: string;
}

const CHEVRON = (
  <svg className="fsel-chev" width="13" height="9" viewBox="0 0 13 9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M1.5 2l5 5 5-5" />
  </svg>
);

const CHECK = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

/**
 * Dropdown próprio, no mesmo visual do formulário (o <select> nativo abre a lista
 * do sistema, que quebra o padrão premium). Acessível: teclado, ARIA e clique fora.
 */
export function FancySelect({ options, value, onChange, label, placeholder = "Selecione...", tone = "dark", error }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const uid = useId();
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (open) {
      const i = options.findIndex((o) => o.value === value);
      setActive(i >= 0 ? i : 0);
    }
  }, [open, value, options]);

  useEffect(() => {
    if (open && listRef.current) {
      const el = listRef.current.children[active] as HTMLElement | undefined;
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [active, open]);

  function choose(i: number) {
    const opt = options[i];
    if (!opt) return;
    onChange(opt.value);
    setOpen(false);
  }

  function onKey(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "Escape") { e.preventDefault(); setOpen(false); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, options.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Home") { e.preventDefault(); setActive(0); }
    else if (e.key === "End") { e.preventDefault(); setActive(options.length - 1); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(active); }
  }

  return (
    <div className={`fsel fsel-${tone}`} ref={rootRef}>
      <style>{FSEL_CSS}</style>
      {label && <span className="fsel-label" id={`${uid}-label`}>{label}</span>}
      <button
        type="button"
        className={`fsel-btn${open ? " is-open" : ""}${!selected ? " is-placeholder" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={label ? `${uid}-label ${uid}-btn` : undefined}
        id={`${uid}-btn`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKey}
      >
        <span className="fsel-value">{selected ? selected.label : placeholder}</span>
        {CHEVRON}
      </button>
      {open && (
        <ul className="fsel-panel" role="listbox" ref={listRef} tabIndex={-1} aria-labelledby={label ? `${uid}-label` : undefined}>
          {options.map((o, i) => (
            <li
              key={o.value + i}
              role="option"
              aria-selected={o.value === value}
              className={`fsel-opt${i === active ? " is-active" : ""}${o.value === value ? " is-selected" : ""}`}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => { e.preventDefault(); choose(i); }}
            >
              <span>{o.label}</span>
              {o.value === value && <span className="fsel-check">{CHECK}</span>}
            </li>
          ))}
        </ul>
      )}
      {error && <span className="fsel-err">{error}</span>}
    </div>
  );
}

const FSEL_CSS = `
.fsel { position: relative; display: block; width: 100%; }
.fsel-label { display: block; font-family: 'JetBrains Mono', ui-monospace, monospace; font-weight: 500; font-size: .7rem; letter-spacing: .12em; text-transform: uppercase; margin-bottom: 6px; }
.fsel-btn {
  width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 12px 14px; border-radius: 10px; cursor: pointer; text-align: left;
  font-family: 'Inter', system-ui, sans-serif; font-size: .95rem; line-height: 1.3;
  transition: border-color .2s ease, background .2s ease;
}
.fsel-btn .fsel-chev { flex: none; transition: transform .2s ease; }
.fsel-btn.is-open .fsel-chev { transform: rotate(180deg); }
.fsel-value { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.fsel-panel {
  position: absolute; z-index: 40; top: calc(100% + 6px); left: 0; right: 0; margin: 0; padding: 6px;
  list-style: none; border-radius: 12px; max-height: 264px; overflow-y: auto;
  box-shadow: 0 20px 44px rgba(6,16,26,.28); animation: fselIn .14s ease;
}
@keyframes fselIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
.fsel-opt {
  display: flex; align-items: center; justify-content: space-between; gap: 10px;
  padding: 10px 12px; border-radius: 8px; cursor: pointer; font-size: .93rem; line-height: 1.35;
  transition: background .12s ease, color .12s ease;
}
.fsel-check { flex: none; display: inline-flex; }
.fsel-err { display: block; margin-top: 6px; font-size: .8rem; }

/* Tom escuro (funil, dentro do .plan10-scope) */
.fsel-dark .fsel-label { color: rgba(244,240,232,.7); }
.fsel-dark .fsel-btn { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.18); color: #F4F0E8; }
.fsel-dark .fsel-btn:hover { border-color: rgba(255,255,255,.32); }
.fsel-dark .fsel-btn.is-open { border-color: #C6A24A; }
.fsel-dark .fsel-btn.is-placeholder .fsel-value { color: rgba(244,240,232,.55); }
.fsel-dark .fsel-chev { color: #C6A24A; }
.fsel-dark .fsel-panel { background: #0C2136; border: 1px solid rgba(255,255,255,.16); }
.fsel-dark .fsel-opt { color: rgba(244,240,232,.82); }
.fsel-dark .fsel-opt.is-active { background: rgba(255,255,255,.07); color: #fff; }
.fsel-dark .fsel-opt.is-selected { color: #E4C776; }
.fsel-dark .fsel-check { color: #C6A24A; }
.fsel-dark .fsel-err { color: #E9A063; }

/* Tom claro (home) */
.fsel-light .fsel-label { color: #6B6355; }
.fsel-light .fsel-btn { background: #fff; border: 1px solid #DED7C7; color: #0E2438; }
.fsel-light .fsel-btn:hover { border-color: #C7BCA3; }
.fsel-light .fsel-btn.is-open { border-color: #C6A24A; }
.fsel-light .fsel-btn.is-placeholder .fsel-value { color: #9A927F; }
.fsel-light .fsel-chev { color: #B08D57; }
.fsel-light .fsel-panel { background: #fff; border: 1px solid #E7E2D6; }
.fsel-light .fsel-opt { color: #3F3A31; }
.fsel-light .fsel-opt.is-active { background: #F4F1E8; color: #0E2438; }
.fsel-light .fsel-opt.is-selected { color: #9A6E1E; font-weight: 600; }
.fsel-light .fsel-check { color: #B08D57; }
.fsel-light .fsel-err { color: #C0392B; }

.fsel-btn:focus-visible { outline: 2px solid #C6A24A; outline-offset: 2px; }
`;
