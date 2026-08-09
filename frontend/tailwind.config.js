/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "'Inter'", "system-ui", "sans-serif"],
        heading: ["'Manrope'", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Fira Code'", "monospace"],
      },
      colors: {
        // InterviewAgent Light Palette
        purple: {
          50: "#fbf9fe",
          100: "#f0e8fc",
          200: "#e7dcf7",
          300: "#cdb8e9",
          400: "#ae8ade",
          500: "#7650c9",
          600: "#6742b2",
          700: "#5b3ca4",
          800: "#482e85",
          900: "#382367",
        },
        brand: {
          bg: "#f8f6fb",
          card: "#ffffff",
          text: "#191522",
          muted: "#706879",
          line: "#e5dfeb",
          purple: "#7650c9",
          "purple-dark": "#5b3ca4",
          "purple-soft": "#f0e8fc",
          lavender: "#e7dcf7",
          green: "#26ad82",
          "green-soft": "#e7f7f1",
        }
      },
      boxShadow: {
        "ia-card": "0 22px 65px rgba(67, 45, 102, 0.09)",
        "ia-soft": "0 12px 35px rgba(67, 45, 102, 0.06)",
        "ia-purple": "0 12px 28px rgba(118, 80, 201, 0.22)",
      }
    },
  },
  plugins: [],
};

