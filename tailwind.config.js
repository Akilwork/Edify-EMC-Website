/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: { 
        "sm": "640px",
        "md": "768px", 
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1400px" 
      },
    },
    extend: {
      // ─── Responsive breakpoints ────────────────────────────
      screens: {
        "xs": "375px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1440px",
        "3xl": "1600px",
        "4xl": "1920px",
      },
      // ─── shadcn/ui CSS-variable color tokens ────────────────
      colors: {
        border:      "hsl(var(--border))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // ─── Edify V2 brand tokens ─────────────────────────────
        brand: {
          primary:       "#0A0D14",
          secondary:     "#121620",
          teal:          "#3ABAB4",
          "teal-light":  "#5DD9D3",
          "teal-dark":   "#2ea8a2",
          gold:          "#E8C97A",
          "gold-light":  "#F5E4A8",
          dark:          "#060810",
          light:         "#F8F9FA",
          gray:          "#6B7280",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans:    ["var(--font-inter-tight)", "Inter Tight", "sans-serif"],
        heading: ["var(--font-playfair)",  "Playfair Display","serif"],
      },
      // ─── Responsive spacing scale ─────────────────────────
      spacing: {
        "safe-top": "max(env(safe-area-inset-top), 72px)",
        "safe-bottom": "max(env(safe-area-inset-bottom), 0px)",
      },
      // ─── Fluid typography scale ─────────────────────────
      fontSize: {
        "fluid-xs": ["clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)", { lineHeight: "1.4" }],
        "fluid-sm": ["clamp(0.875rem, 0.8rem + 0.375vw, 1rem)", { lineHeight: "1.5" }],
        "fluid-base": ["clamp(1rem, 0.9rem + 0.5vw, 1.125rem)", { lineHeight: "1.6" }],
        "fluid-lg": ["clamp(1.125rem, 1rem + 0.625vw, 1.25rem)", { lineHeight: "1.6" }],
        "fluid-xl": ["clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)", { lineHeight: "1.5" }],
        "fluid-2xl": ["clamp(1.5rem, 1.3rem + 1vw, 1.875rem)", { lineHeight: "1.4" }],
        "fluid-3xl": ["clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem)", { lineHeight: "1.3" }],
        "fluid-4xl": ["clamp(2.25rem, 1.9rem + 1.75vw, 3rem)", { lineHeight: "1.2" }],
        "fluid-5xl": ["clamp(3rem, 2.5rem + 2.5vw, 4rem)", { lineHeight: "1.1" }],
        "fluid-6xl": ["clamp(4rem, 3rem + 5vw, 6rem)", { lineHeight: "1" }],
        "fluid-7xl": ["clamp(4.5rem, 3.5rem + 5vw, 7rem)", { lineHeight: "1" }],
        "fluid-8xl": ["clamp(6rem, 4rem + 10vw, 8rem)", { lineHeight: "1" }],
      },
      // ─── Max width constraints ─────────────────────────
      maxWidth: {
        "container": "min(95vw, 1440px)",
        "prose": "min(90vw, 65ch)",
      },
      // ─── Responsive height utilities ─────────────────────────
      height: {
        "screen-small": "100vh",
        "screen-dynamic": "100dvh",
        "screen-safe": "100svh",
      },
      minHeight: {
        "screen-small": "100vh", 
        "screen-dynamic": "100dvh",
        "screen-safe": "100svh",
      },
      // ─── shadcn/ui animations ──────────────────────────────
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        // ─── Edify custom keyframes ──────────────────────────
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-16px)" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-in":        "fadeIn 0.6s ease-out forwards",
        "slide-up":       "slideUp 0.7s ease-out forwards",
        float:            "float 6s ease-in-out infinite",
        "gradient-x":     "gradientX 8s ease infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

