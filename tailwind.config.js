const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fontFamily: {
        ...fontFamily,
        sans: ['Abhaya Libre', 'sans-serif'],
        serif: ['Abhaya Libre', 'serif'],
      },
      colors: {
        primary: 'var(--color-primary)', 
        secondary: 'var(--color-secondary)', 
        whiteAlt: 'var(--color-white-alt)',
        primaryLight: 'var(--color-primary-light)',
        primaryDanger: 'var(--color-primary-danger)',
        baseText: 'var(--color-text)',
        baseGray: 'var(--color-gray)',
        yellowWarning: 'var(--color-yellow-warning)',
        greenSuccess: 'var(--color-green-success)',
        redBlocked: 'var(--color-red-blocked)',
      },
    },
  },
  // important: '#root',
};
