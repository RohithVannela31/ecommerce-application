/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        dark: "#111827",
        muted: "#6B7280",
      },
    },
  },
  plugins: [],
};
