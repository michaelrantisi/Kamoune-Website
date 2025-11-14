/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2D6A4F",      // deep olive green
          dark: "#1B4332",
          light: "#D8F3DC",
        },
        accent: {
          red: "#B02A30",          // pomegranate red
          gold: "#D4A373",
        },
        cream: "#F6EEE3",          // warm background
        ink: "#1F2933",            // dark text
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
