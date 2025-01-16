/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cursive: ["Dancing Script", "cursive"],
        decorative: ["Great Vibes", "cursive"],
        playfair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
