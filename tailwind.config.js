/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'element-primary': '#4C5C68',
        'background-body': '#edeee6',
        'background-header': '#E4CEAD',
        'background-ultra-light': '#DCDCDD'
      },
      borderColor: {
        'element-delimiter': '#46494C',
      },
    },
  },
  plugins: [],
}

