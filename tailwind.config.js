/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'wine-red': '#a7585b',
        'navy-blue': '#022d40',
        'fog-blue': '#57778e',
        'pale-red': '#da6b62',
        'pale-blue': '#59788a',
      },
    },
  },
  plugins: [],
};
