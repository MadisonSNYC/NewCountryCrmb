/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFFDD0',
        'barn-red': '#A52A2A',
        'cornfield-yellow': '#F2DC5D',
        'sky-blue': '#87CEEB',
        'grass-green': '#4A7023',
        'warm-brown': '#8B4513',
        'soft-gray': '#D3D3D3',
      },
    },
  },
  plugins: [],
}
