import logoUrl from "@/assets/plan10-logo.png";

interface Plan10LogoProps {
  variant?: "full" | "symbol";
  hubColor?: string;
  hubLabel?: string;
  light?: boolean;
  size?: number;
}

export function Plan10Logo({
  variant = "full",
  hubColor,
  hubLabel,
  light = false,
  size = 140,
}: Plan10LogoProps) {
  // Aspect ratio of the official logo (~1075x255 → ~4.2:1)
  const logoHeight = variant === "symbol" ? size * 0.5 : size * 0.32;
  const logoWidth = variant === "symbol" ? logoHeight : logoHeight * 4.2;

  const img = (
    <img
      src={logoUrl}
      alt="Plan10"
      width={logoWidth}
      height={logoHeight}
      style={{
        height: logoHeight,
        width: variant === "symbol" ? logoHeight : "auto",
        objectFit: "contain",
        objectPosition: variant === "symbol" ? "left center" : "center",
        filter: light ? "brightness(0) invert(1)" : undefined,
      }}
      className={variant === "symbol" ? "object-left" : ""}
    />
  );

  if (variant === "symbol" || !hubLabel) {
    return <span className="inline-flex items-center">{img}</span>;
  }

  return (
    <div className="inline-flex flex-col items-start leading-none">
      {img}
      <span
        className="font-eyebrow mt-1"
        style={{ color: hubColor || "var(--orange)", fontSize: size * 0.075 }}
      >
        {hubLabel}
      </span>
    </div>
  );
}
