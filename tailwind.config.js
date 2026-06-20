/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        vine: { DEFAULT: "#1F4D2C", light: "#4A7C59", dark: "#163823" },
        plum: { DEFAULT: "#6B2545", light: "#8C3B61" },
        gold: { DEFAULT: "#C98A2C", light: "#E0A94F" },
        cream: "#FAF6EF",
        ink: "#2B2420",
      },
      fontFamily: {
        display: ['"Noto Serif Bengali"', "serif"],
        body: ['"Hind Siliguri"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
