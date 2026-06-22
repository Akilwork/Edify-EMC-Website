import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes safely.
 * Usage: cn("px-4", condition && "py-2", "text-white")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
