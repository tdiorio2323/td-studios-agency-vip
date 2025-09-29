import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0C",
        ivory: "#F7F7F5",
        gold: {
          50: "#F4EDD9",
          100: "#E9DAB3",
          200: "#DEC688",
          300: "#D3B25C",
          400: "#C8A96A",
          500: "#B8964D",
          600: "#9A7A3E",
          700: "#7C5E2F",
          800: "#5E4221",
          900: "#402612",
          DEFAULT: "#C8A96A",
        },
        stone: "#9FA4AD",
        text: {
          primary: "rgba(255, 255, 255, 0.95)",
          secondary: "rgba(255, 255, 255, 0.75)",
          tertiary: "rgba(255, 255, 255, 0.55)",
          accent: "#C8A96A",
        },
      },
      fontFamily: {
        display: ["Inter", "ui-serif", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        luxe: "0 10px 30px rgba(0,0,0,.15)",
      },
    },
  },
  plugins: [],
};

export default config;
