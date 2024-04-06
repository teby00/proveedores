const { fontFamily } = require("tailwindcss/defaultTheme")
const {nextui} = require('@nextui-org/theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{js,jsx,ts,tsx}", "components/**/*.{js,jsx,ts,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        banner: '16 / 8'
      }
    },
  },
  plugins: [require("tailwindcss-animate"), nextui()],
}
