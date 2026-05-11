import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "hub";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  hubColor?: string;
}

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-13 px-8 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", hubColor, className, style, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants: Record<Variant, string> = {
      primary: "bg-orange text-white hover:bg-orange-hover shadow-sm hover:shadow-md",
      secondary: "bg-blue text-white hover:bg-blue-hover",
      outline: "border-2 border-blue text-blue bg-transparent hover:bg-blue hover:text-white",
      ghost: "bg-transparent text-ink hover:bg-neutral-100",
      hub: "text-white shadow-sm hover:shadow-md",
    };

    const hubStyle = variant === "hub" && hubColor ? { backgroundColor: hubColor, ...style } : style;

    return (
      <button
        ref={ref}
        className={cn(base, sizes[size], variants[variant], className)}
        style={hubStyle}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
