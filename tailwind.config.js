/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00C853',
        background: '#0a0a0a',
        surface: '#1a1a1a',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        heading: ['Sora', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
