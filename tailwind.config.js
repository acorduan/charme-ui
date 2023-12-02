/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('./projects/charme/ui/tailwind.config')
  ],
  content: [
    './src/**/*.{html,ts,scss,css}',
    './projects/charme/ui/**/*.{html,ts,scss,css}'
  ],
  plugins: []
}
