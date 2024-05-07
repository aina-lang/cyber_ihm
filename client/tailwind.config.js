/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [flowbite.content(), "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'text': '#07060d',
        'background': '#f5f3fb',
        'primary': '#2ed396',
        'secondary': '#83efc7',
        'accent-200': '#4bf4b5',
        'accent-400': '#e25c66'
       }
    },
  },
  plugins: [flowbite.plugin()],
};
