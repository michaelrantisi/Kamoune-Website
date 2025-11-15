/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#136f63",      // deep green
        primaryDark: "#0b3b34",
        accent: "#b91c1c",       // Palestinian red
        sand: "#f7f1e5",         // warm beige background
        card: "#ffffff",
        cardBorder: "#e2d3c1",
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 45px rgba(19, 111, 99, 0.16)",
      },
    },
  },
  plugins: [],
};
