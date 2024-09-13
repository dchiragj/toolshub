/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/*.{html,js,jsx}", "./src/pages/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    colors: {
      'black': "black",
      'white': "white",
      'lightBlue': "#1A8FE3",
      "darkBlue": "#0f172a",
      "gray50": "#f9fafb",
      "gray200": "#d1d5db",
      "gray400": "#9ca3af",
      "gray500": "#6b7280",
      "gray600": "#6b7280",
    },
  },
  plugins: [],
};
