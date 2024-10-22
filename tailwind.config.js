/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        honeydew: "#F1FAEE",
        photo_blue: "#A8DADC",
        cerulean_blue: "#457B9D",
        berkley_blue: "#1D3557",
        pantone_red:"#E63946"
      },
    },
  },
  plugins: [],
};
