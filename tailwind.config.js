/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@mui/**/*.{js,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        fuente: ['ConcertOne', 'sans-serif'], // Define aquí tu fuente
      },
    },
  },
  plugins: [],
}