/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          100: '#ffffff',
          200: '#f5f5f5',
          300: '#e5e5e5',
          content: '#333333',
        },
        primary: '#4a90e2',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
