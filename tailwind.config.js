/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        topBg: "url('/images/top-bg.svg')",
        bottomBg: "url('/images/bottom-bg.svg')"
      },
      colors: {
        primary: '#32435F',
        background: '#E1DCD9',
        decoration: '#8F8681',
        textBlack: '#1C0707',
        textWhite: 'rgba(255, 255, 255, 0.82)',
        svgFill: '#d2dbed'

      }
    },
  },
  plugins: [],
}
