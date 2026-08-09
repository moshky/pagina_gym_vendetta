import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        negro: "#0A0A0A",
        rojo: "#B01E23",
        "rojo-oscuro": "#7A1418",
        blanco: "#F5F5F5",
        gris: "#6B6B6B",
      },
      fontFamily: {
        display: ["var(--font-anton)"],
        sans: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
export default config;