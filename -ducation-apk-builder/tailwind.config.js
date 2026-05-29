/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { primary: "#0EA5E9" },
      fontFamily: { sans: ["Inter, system-ui, sans-serif", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
