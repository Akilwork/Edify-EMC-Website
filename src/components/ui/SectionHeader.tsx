import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title:    string;
  subtitle?: string;
  align?:   "left" | "center";
}

export default function SectionHeader({
  eyebrow, title, subtitle, align = "left", className, ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center mx-auto",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <p className="text-[#E8C97A] text-sm font-semibold uppercase tracking-widest mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-4 text-white/60 text-lg leading-relaxed",
          align === "center" ? "max-w-2xl mx-auto" : "max-w-xl"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
