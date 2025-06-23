/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        'default': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        'md': '3px 3px 6px rgba(0, 0, 0, 0.6)',
        'lg': '4px 4px 8px rgba(0, 0, 0, 0.7)',
      },
      colors:{
        'verde':'#69CEC3',
        'verdeclaro':'#BCE9E3',
      },
    },
  },
  plugins: [
     require('@tailwindcss/typography'),
     require('@tailwindcss/forms'),
    require('tailwindcss-textshadow')
  ],
}