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
        beige: "#FAF6F0",
        sand: "#F3ECE2",
        stone: "#D4C8B8",
        espresso: "#1F1410",
        taupe: "#8A7B6B",
        crimson: "#C41230",
        "crimson-light": "#D42040",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        "space-grotesk": ["var(--font-space-grotesk)", "sans-serif"],
        "space-mono": ["var(--font-space-mono)", "monospace"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["72px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["54px", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["48px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": ["36px", { lineHeight: "1.25" }],
        "body-lg": ["18px", { lineHeight: "1.6" }],
        "body-md": ["17px", { lineHeight: "1.6" }],
        "body-sm": ["14px", { lineHeight: "1.5" }],
      },
      spacing: {
        "18": "72px",
        "22": "88px",
      },
    },
  },
  plugins: [],
};

export default config;
