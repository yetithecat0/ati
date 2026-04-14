import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0e0e10",
        surface: "#16161a",
        elevated: "#1e1e24",
        "ati-purple": "#534AB7",
        "ati-purple-light": "#7F77DD",
        "ati-teal": "#1D9E75",
        "ati-coral": "#993C1D",
        "ati-amber": "#854F0B",
        hi: "#f0f0f0",
        lo: "#888888",
        divider: "#2a2a2e",
      },
      fontFamily: {
        headline: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
