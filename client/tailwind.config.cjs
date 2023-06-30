/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      colors: {
        'custom-blue': '#6368D9',
        'fade-blue': '#AFB5ED',
        'custom-gray': '#9C98A1',
        'regular-fade': '#D1D0F9',
        'custom-white': '#F6F2FF'
      }
    },
   
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwindcss-scrollbar'),
    require('tailwind-scrollbar-hide'),
],
}
