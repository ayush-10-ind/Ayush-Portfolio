import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:               "var(--color-bg)",
        surface:          "var(--color-surface)",
        "surface-elev":   "var(--color-surface-elev)",
        border:           "var(--color-border)",
        accent:           "var(--color-accent)",
        "accent-muted":   "var(--color-accent-muted)",
        "accent-subtle":  "var(--color-accent-subtle)",
        "text-primary":   "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-tertiary":  "var(--color-text-tertiary)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body:    ["var(--font-body)"],
        mono:    ["var(--font-mono)"],
      },
      screens: {
        mobile:  "375px",
        tablet:  "768px",
        laptop:  "1024px",
        desktop: "1280px",
        wide:    "1600px",
      },
    },
  },
  plugins: [],
};

export default config;