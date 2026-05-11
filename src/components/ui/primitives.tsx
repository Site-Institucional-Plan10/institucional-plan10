import { forwardRef, useState, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export const Card = ({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) => (
  <div className={cn("rounded-2xl bg-white p-6 shadow-sm border border-neutral-200", className)} style={style}>
    {children}
  </div>
);

export const Badge = ({ children, color, className }: { children: ReactNode; color?: string; className?: string }) => (
  <span
    className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider", className)}
    style={color ? { backgroundColor: color, color: "#fff" } : { backgroundColor: "#f5f5f5", color: "#1a1a1a" }}
  >
    {children}
  </span>
);

interface FieldProps {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & FieldProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && <label htmlFor={inputId} className="font-small font-semibold text-ink">{label}</label>}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "h-11 rounded-lg border border-neutral-300 bg-white px-4 text-base text-ink placeholder:text-neutral-500 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20 transition",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className,
          )}
          {...props}
        />
        {hint && !error && <span className="text-xs text-neutral-500">{hint}</span>}
        {error && <span className="text-xs text-red-600">{error}</span>}
      </div>
    );
  },
);
Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & FieldProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && <label htmlFor={inputId} className="font-small font-semibold text-ink">{label}</label>}
        <textarea
          id={inputId}
          ref={ref}
          rows={5}
          className={cn(
            "rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base text-ink placeholder:text-neutral-500 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20 transition resize-y",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className,
          )}
          {...props}
        />
        {hint && !error && <span className="text-xs text-neutral-500">{hint}</span>}
        {error && <span className="text-xs text-red-600">{error}</span>}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement> & FieldProps & { options: { value: string; label: string }[] }>(
  ({ label, error, options, className, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && <label htmlFor={inputId} className="font-small font-semibold text-ink">{label}</label>}
        <div className="relative">
          <select
            id={inputId}
            ref={ref}
            className={cn(
              "h-11 w-full appearance-none rounded-lg border border-neutral-300 bg-white px-4 pr-10 text-base text-ink focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20 transition",
              error && "border-red-500",
              className,
            )}
            {...props}
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
        </div>
        {error && <span className="text-xs text-red-600">{error}</span>}
      </div>
    );
  },
);
Select.displayName = "Select";

export function Accordion({ items }: { items: { title: string; content: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
      {items.map((item, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-ink hover:bg-neutral-100 transition"
          >
            <span>{item.title}</span>
            <ChevronDown className={cn("transition-transform", open === i && "rotate-180")} size={20} />
          </button>
          {open === i && <div className="px-6 pb-5 text-neutral-700">{item.content}</div>}
        </div>
      ))}
    </div>
  );
}

export function Toggle({ options, value, onChange }: { options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-neutral-100 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded-full px-5 py-2 text-sm font-semibold transition",
            value === o.value ? "bg-white text-ink shadow-sm" : "text-neutral-700 hover:text-ink",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">{children}</div>
    </div>
  );
}
