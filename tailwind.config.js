/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { wine: '#2b1018', champagne: '#e6cc95', parchment: '#f7f0e4', ink: '#251718' },
    fontFamily: { editorial: ['Cormorant Garamond', 'serif'], script: ['Great Vibes', 'cursive'], sans: ['Manrope', 'sans-serif'] }
  }},
  plugins: []
};
