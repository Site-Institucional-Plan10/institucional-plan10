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
      "inline-flex items-center justify-center gap-2 rounded-lg font-semibold cursor-pointer transition-[background-color,transform,box-shadow,color] duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:translate-y-0 active:shadow-none";

    const variants: Record<Variant, string> = {
      primary: "bg-orange text-white hover:bg-orange-hover hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,107,0,0.35)] shadow-sm",
      secondary: "bg-blue text-white hover:bg-blue-hover hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(26,79,160,0.35)]",
      outline: "border-2 border-blue text-blue bg-transparent hover:bg-blue hover:text-white hover:-translate-y-0.5",
      ghost: "bg-transparent text-ink hover:bg-neutral-100 hover:-translate-y-0.5",
      hub: "text-white shadow-sm hover:shadow-md hover:-translate-y-0.5",
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
