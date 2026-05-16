/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'stone-beige': '#D8C3A5',
        'warm-sand': '#EADBC8',
        'soft-ivory': '#F8F4EE',
        'warm-taupe': '#B89B84',
        'deep-espresso': '#4B3A2F',
        'charcoal': '#2B2B2B',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
