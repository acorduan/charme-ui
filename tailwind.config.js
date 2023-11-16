/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('./projects/charme-ui/charme-theme.js')
  ],
  content: [
    './src/**/*.{html,ts}',
    './projects/charme-ui/src/**/*.{html,ts}',
  ],
  plugins: []
}
