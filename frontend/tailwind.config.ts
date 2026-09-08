import type { Config } from "tailwindcss";

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
          blue: "#2563EB",
          slate: "#0F172A",
          cyan: "#06B6D4"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.08)"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["Sora", "Poppins", "Inter", "system-ui", "sans-serif"]
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
