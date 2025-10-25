/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        surface: '#F9F9F9',
        primary: '#1e90ff',
        secondary: '#CC0000',
        text: '#000000',
        textSecondary: '#555555',
        accent: '#1e90ff',
        success: '#4ade80',
        warning: '#fbbf24',
        error: '#CC0000',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}