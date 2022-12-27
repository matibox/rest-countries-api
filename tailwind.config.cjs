/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      blue: {
        dark: 'hsl(209, 23%, 22%)',
        'very-dark-dm': 'hsl(207, 26%, 17%)',
        'very-dark': 'hsl(200, 15%, 8%)',
      },
      gray: {
        dark: 'hsl(0, 0%, 52%)',
        'very-light': 'hsl(0, 0%, 98%)',
      },
      white: 'hsl(0, 0%, 100%)',
    },
    fontFamily: {
      nunito: '"Nunito Sans", sans-serif',
    },
  },
  plugins: [],
  darkMode: 'class',
};
