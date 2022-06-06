const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "libre": ["Libre Franklin", ...defaultTheme.fontFamily.sans],
        "roboto": ["Roboto", ...defaultTheme.fontFamily.sans],
        "sans": ["Roboto", ...defaultTheme.fontFamily.sans],
      },

    },
  },
  plugins: [],
}
