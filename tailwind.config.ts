import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          950: "var(--c-base-950)",
          900: "var(--c-base-900)",
          800: "var(--c-base-800)",
          700: "var(--c-base-700)",
          600: "var(--c-base-600)",
        },
        ink: {
          100: "var(--c-ink-100)",
          300: "var(--c-ink-300)",
          500: "var(--c-ink-500)",
        },
        brand: {
          DEFAULT: "#AE9B84",
          600: "#B8A893",
          700: "#9A876F",
        },
        accent: {
          coral: "#FF6B57",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        xl2: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
