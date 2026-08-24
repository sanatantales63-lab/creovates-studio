import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ComponentProps } from "react";
type ButtonProps = ComponentProps<typeof Link> & { subtle?: boolean; arrow?: boolean };
export function Button({ children, subtle = false, arrow = true, className = "", ...props }: ButtonProps) {
  const base =
    "focus-ring group inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full px-5 py-3 text-[11px] font-semibold uppercase tracking-[.11em] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.01]";
  const variant = subtle
    ? "border border-white/15 bg-transparent hover:border-white/40 hover:bg-white/[.04]"
    : "bg-[#f4f4f2] hover:bg-[#dfe5f0]";
  /* text color is set via inline style to prevent any Tailwind / specificity override */
  const textColor = subtle ? "#f4f4f2" : "#08090b";
  return (
    <Link
      {...props}
      className={`${base} ${variant} ${className}`}
      style={{ color: textColor }}
    >
      {children}
      {arrow && (
        <ArrowUpRight
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          size={14}
          strokeWidth={2.2}
          style={{ color: textColor }}
        />
      )}
    </Link>
  );
}

