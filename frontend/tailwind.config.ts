import type { Config } from "tailwindcss";

/**
 * Brand accent scale. `navy-600` (#00022E) is the company Dark Navy Blue.
 * 50–200 washes · 300 dark-theme text · 400 accent that survives both themes ·
 * 500 solid that survives both themes · 600 brand · 700+ hover/active.
 */
const navy = {
  50: "#F3F6FC",
  100: "#E6EDFA",
  200: "#C7D6F5",
  300: "#93B4EC",
  400: "#1468F0",
  500: "#115CD4",
  600: "#00022E",
  700: "#000225",
  800: "#00011D",
  900: "#000116",
  950: "#00010C"
};

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          slate: "#0F172A",
          cyan: "#06B6D4"
        },
        navy
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(15 23 42 / 0.06)",
        soft: "0 18px 50px rgba(15, 23, 42, 0.08)"
      },
      spacing: {
        "4.5": "1.125rem",
        18: "4.5rem", /* 72px — section top */
        30: "7.5rem" /* 120px — section bottom */
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Helvetica Neue", "Helvetica", "Arial", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Inter", "Helvetica Neue", "Helvetica", "Arial", "system-ui", "sans-serif"]
      },
      opacity: {
        "6": "0.06",
        "8": "0.08",
        "12": "0.12",
        "14": "0.14",
        "15": "0.15",
        "16": "0.16",
        "18": "0.18",
        "24": "0.24",
        "28": "0.28",
        "35": "0.35",
        "45": "0.45",
        "55": "0.55",
        "65": "0.65",
        "72": "0.72",
        "78": "0.78",
        "82": "0.82",
        "94": "0.94"
      }
    }
  },
  plugins: []
};

export default config;
