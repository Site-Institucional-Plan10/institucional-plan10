import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (!localStorage.getItem("plan10_cookies")) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const choose = (choice: "all" | "essential") => {
    try {
      localStorage.setItem("plan10_cookies", choice);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <div className="ck" role="dialog" aria-label="Aviso de cookies">
      <style>{`
        .ck {
          position: fixed; z-index: 60; left: 20px; bottom: 20px;
          width: min(370px, calc(100vw - 40px));
          background: linear-gradient(160deg, #0E2438 0%, #0B1D2E 100%);
          color: #F1EFEA; border: 1px solid rgba(255,255,255,.1); border-radius: 16px;
          padding: 18px 18px 16px; box-shadow: 0 20px 50px rgba(6,16,26,.42);
          font-family: 'Inter', system-ui, sans-serif; animation: ckin .4s cubic-bezier(.2,.7,.2,1);
        }
        @keyframes ckin { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .ck-eyebrow { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: .6rem; letter-spacing: .22em; text-transform: uppercase; color: #D8B879; margin: 0 0 8px; }
        .ck-txt { font-size: .85rem; line-height: 1.55; color: rgba(241,239,234,.8); margin: 0 0 15px; }
        .ck-txt a { color: #D8B879; font-weight: 600; text-decoration: underline; text-underline-offset: 2px; }
        .ck-actions { display: flex; gap: 10px; }
        .ck-btn { font-family: 'Inter', sans-serif; font-weight: 600; font-size: .82rem; padding: 9px 16px; border-radius: 999px; cursor: pointer; border: 1px solid transparent; transition: background .2s ease, border-color .2s ease, color .2s ease; }
        .ck-btn.gold { background: #C6A24A; color: #0E2438; flex: 1; }
        .ck-btn.gold:hover { background: #D8B879; }
        .ck-btn.ghost { background: transparent; color: rgba(241,239,234,.82); border-color: rgba(255,255,255,.22); }
        .ck-btn.ghost:hover { border-color: #F1EFEA; color: #fff; }
        .ck-btn:focus-visible { outline: 2px solid #D8B879; outline-offset: 2px; }
        @media (max-width: 520px) { .ck { left: 12px; right: 12px; bottom: 12px; width: auto; } }
      `}</style>
      <p className="ck-eyebrow">Privacidade</p>
      <p className="ck-txt">
        Usamos cookies para melhorar sua experiência. Ao continuar, você concorda com a{" "}
        <Link to="/privacidade">Política de Privacidade</Link> conforme a LGPD.
      </p>
      <div className="ck-actions">
        <button type="button" className="ck-btn ghost" onClick={() => choose("essential")}>
          Apenas essenciais
        </button>
        <button type="button" className="ck-btn gold" onClick={() => choose("all")}>
          Aceitar todos
        </button>
      </div>
    </div>
  );
}
