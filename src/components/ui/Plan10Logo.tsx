interface Plan10LogoProps {
  variant?: "full" | "symbol";
  hubColor?: string;
  hubLabel?: string;
  light?: boolean;
  size?: number;
}

/* TODO: Replace this SVG with official logo files from client when available */
export function Plan10Logo({
  variant = "full",
  hubColor,
  hubLabel,
  light = false,
  size = 140,
}: Plan10LogoProps) {
  const orange = "#FF6B00";
  const planColor = light ? "#FFFFFF" : "#1A1A1A";
  const tenColor = hubColor || orange;
  const descColor = hubColor || "transparent";
  const symbolHeight = size * 0.5;
  const symbolWidth = symbolHeight;

  const Symbol = (
    <svg
      width={symbolWidth}
      height={symbolHeight}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="plan10-orange" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF6B00" />
          <stop offset="50%" stopColor="#FFB347" />
          <stop offset="100%" stopColor="#FF6B00" />
        </linearGradient>
      </defs>
      <path
        d="M8 56 A28 28 0 0 1 56 28 L56 56 Z"
        fill="url(#plan10-orange)"
      />
      <path d="M32 6 L36 56 L32 60 L28 56 Z" fill="url(#plan10-orange)" />
    </svg>
  );

  if (variant === "symbol") return Symbol;

  return (
    <div className="inline-flex items-center gap-2" style={{ height: symbolHeight }}>
      {Symbol}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline" style={{ fontSize: size * 0.32, fontWeight: 800, letterSpacing: "-0.02em" }}>
          <span style={{ color: planColor }}>PLAN</span>
          <span style={{ color: tenColor }}>10</span>
        </div>
        {hubLabel && (
          <span
            className="font-eyebrow mt-1"
            style={{ color: descColor, fontSize: size * 0.075 }}
          >
            {hubLabel}
          </span>
        )}
      </div>
    </div>
  );
}
