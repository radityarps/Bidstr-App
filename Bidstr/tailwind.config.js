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
    },
  },
  plugins: [],
};
