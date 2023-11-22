/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Nun': ['Nunito', 'sans-serif'],
        'Pops': ['Poppins', 'sans-serif'],
        'Osans': ['Open Sans', 'sans-serif']
      },
      colors: {
        'primary_color': '#5F35F5',
      }
    },
  },
  plugins: [],
}