/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        abee: ["ABeeZee", "sans-serif"],
        Averia: ["Averia Serif Libre", "cursive"],
        Matemasie: ["Matemasie", "cursive"],
      }
    },
  },
  plugins: [],
}

