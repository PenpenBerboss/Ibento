/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#0f0f0f',
        surface: '#1a1a1a',
        primary: '#1e90ff',
        secondary: '#2a2a2a',
        text: '#ffffff',
        textSecondary: '#a0a0a0',
        accent: '#1e90ff',
        success: '#4ade80',
        warning: '#fbbf24',
        error: '#ef4444',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}