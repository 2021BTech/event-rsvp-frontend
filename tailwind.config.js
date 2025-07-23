/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#063970",
        secondary: "#deaf24",
        accent: "#f97316",
        background: "#f3f4f6",
        text: "#111827",
        border: "#e5e7eb",
        success: "#16a34a",
        warning: "#f59e0b",
        error: "#dc2626",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
}