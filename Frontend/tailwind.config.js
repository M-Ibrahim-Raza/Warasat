/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        TCLG1: "#edfff2",
        TCLG2: "#D9FFE4",
        TCT1: "#57ffc4",
        TCDG1: "#02615E",
        TCDG2: "#032945",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        Montserrat: ["Montserrat", "serif"],
      },
    },
  },
  plugins: [],
};
