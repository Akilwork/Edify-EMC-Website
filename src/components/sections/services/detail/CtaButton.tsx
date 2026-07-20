"use client";

import { ArrowRight } from "lucide-react";

type Variant = "solid" | "outline";
type Theme = "light" | "dark";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 sm:px-8 py-3 sm:py-4 text-[clamp(0.8125rem,0.75rem+0.28vw,0.875rem)] font-semibold transition-colors duration-200 cursor-pointer border outline-none active:scale-[0.98]";

const styles: Record<Theme, Record<Variant, string>> = {
  // Buttons rendered on a white/light section.
  light: {
    solid: "bg-black text-white border-transparent hover:bg-black/85",
    outline: "bg-transparent text-black border-black/20 hover:bg-black hover:text-white",
  },
  // Buttons rendered on a dark/black hero.
  dark: {
    solid: "bg-white text-black border-transparent hover:bg-white/85",
    outline: "bg-transparent text-white border-white/40 hover:bg-white hover:text-black",
  },
};

export default function CtaButton({
  label,
  onClick,
  variant = "solid",
  theme = "light",
  withArrow = true,
}: {
  label: string;
  onClick: () => void;
  variant?: Variant;
  theme?: Theme;
  withArrow?: boolean;
}) {
  return (
    <button onClick={onClick} className={`${base} ${styles[theme][variant]}`}>
      {label}
      {withArrow && <ArrowRight size={16} />}
    </button>
  );
}
