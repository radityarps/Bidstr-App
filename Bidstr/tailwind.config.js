/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBackground: "#FFFFFF",
        secondary: "#F6B203",
        third: "#1A3846",
      },
      fontFamily: {
        regular: ["Montserrat-Regular", "sans-serif"],
        medium: ["Montserrat-Medium", "sans-serif"],
        semibold: ["Montserrat-SemiBold", "sans-serif"],
        bold: ["Montserrat-Bold", "sans-serif"],
        italic: ["Montserrat-Italic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
