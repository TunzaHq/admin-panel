/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    screens: {
        'xs': '360px',
        'sm': '576px',
        'md': '768px',
        'lg': '1024px',

    },
    extend: {},
  },
  plugins: [],
}
