interface Props {
  value: "PF" | "PJ";
  onChange: (v: "PF" | "PJ") => void;
}

export function PerfilToggle({ value, onChange }: Props) {
  return (
    <div className="p10-toggle" role="tablist" aria-label="Perfil">
      {(["PF", "PJ"] as const).map((k) => (
        <button
          key={k}
          role="tab"
          aria-selected={value === k}
          onClick={() => onChange(k)}
          type="button"
        >
          {k === "PF" ? "Para você" : "Para empresa"}
        </button>
      ))}
    </div>
  );
}
