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
        display: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        luxury: '-0.01em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      lineHeight: {
        'luxury-tight': '1.2',
        'luxury': '1.4',
        'luxury-relaxed': '1.6',
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        'glass-sm': '0 2px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
        'glass': '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.15)',
        'glass-lg': '0 12px 48px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.2)',
        'glass-xl': '0 20px 64px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.25)',
        'glow-gold': '0 0 24px rgba(200,169,106,0.3), 0 0 8px rgba(200,169,106,0.6)',
        'glow-white': '0 0 32px rgba(255,255,255,0.15)',
        luxe: "0 10px 40px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.15)",
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
        '3xl': '64px',
      },
      animation: {
        'shimmer': 'shimmer 14s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 8px rgba(200,169,106,0.4), 0 0 2px rgba(200,169,106,0.8)',
          },
          '50%': {
            boxShadow: '0 0 16px rgba(200,169,106,0.6), 0 0 4px rgba(200,169,106,1)',
          },
        },
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth': 'cubic-bezier(0.45, 0, 0.55, 1)',
        'elegant': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
      },
    },
  },
  plugins: [],
};

export default config;
