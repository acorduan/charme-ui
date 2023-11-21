const colors = require('tailwindcss/colors')


module.exports = {
  darkMode: 'class',
  theme: {
    fontFamily: {
      material: ['"Material Icons"']
    },
    extend: {
      animation: {
        fade: 'fade 0.15s ease-in-out forwards',
        fadeout: 'fadeout 0.15s ease-in-out forwards',
        scale: 'scale 150ms cubic-bezier(0, 0, 0.2, 1) forwards',
        tooltip: 'fade 150ms cubic-bezier(0, 0, 0.2, 1) forwards, scale 150ms cubic-bezier(0, 0, 0.2, 1) forwards',
        'dialog-open': 'fade 150ms cubic-bezier(0, 0, 0.2, 1) forwards, scale 150ms cubic-bezier(0, 0, 0.2, 1) forwards',
        'dialog-close': 'fadeout 150ms cubic-bezier(0, 0, 0.2, 1) forwards, scaledown 150ms cubic-bezier(0, 0, 0.2, 1) forwards',
        'dialog-overlay-open': 'fade 150ms cubic-bezier(0, 0, 0.2, 1) forwards',
        'dialog-overlay-close': 'fadeout 150ms cubic-bezier(0, 0, 0.2, 1) forwards'
      },
      keyframes: {
        fade: {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'}
        },
        fadeout: {
          '0%': {opacity: '1'},
          '100%': {opacity: '0'}
        },
        scale: {
          '0%': {transform: 'scale(0.8)'},
          '100%': {transform: 'scale(1)'}
        },
        scaledown: {
          '0%': {transform: 'scale(1)'},
          '100%': {transform: 'scale(0.8)'}
        }
      }
    },
    colors: {
      transparent: 'transparent',
      ...colors,

      'green': {
        '50': '#e8ffe4',
        '100': '#cbffc5',
        '200': '#9aff92',
        '300': '#5bff53',
        '400': '#24fb20',
        '500': '#00eb00',
        '600': '#00b505',
        '700': '#028907',
        '800': '#086c0c',
        '900': '#0c5b11',
        '950': '#003305',
      },

      'ultramarine': {
        '50': '#f0f0ff',
        '100': '#e5e4ff',
        '200': '#ceccff',
        '300': '#aaa4ff',
        '400': '#8170ff',
        '500': '#5a37ff',
        '600': '#470fff',
        '700': '#3700ff',
        '800': '#2d00da',
        '900': '#200094',
        '950': '#13007a',
      },

    }
  },
  plugins: [
    function ({addUtilities}) {
      addUtilities({
        '.bg-primary': {
          '@apply bg-white dark:bg-zinc-950': {}
        },

        '.bg-secondary': {
          '@apply bg-zinc-100 dark:bg-zinc-900': {}
        },

        '.text-primary': {
          '@apply text-zinc-900 dark:text-zinc-100': {}
        },

        '.text-secondary': {
          '@apply bg-zinc-800 dark:bg-zinc-50': {}
        },

        '.border-primary': {
          '@apply border-zinc-400 dark:border-zinc-600': {}
        },

        '.border-secondary': {
          '@apply border-zinc-200 dark:border-zinc-800': {}
        },

        '.overlay-shadow': {
          '@apply shadow-sm	shadow-zinc-400 dark:shadow-zinc-700': {}
        },

        '.card-shadow': {
          '@apply shadow-sm	shadow-zinc-300 dark:shadow-zinc-800': {}
        },

        '.card': {
          '@apply card-shadow rounded bg-secondary': {}
        }
      })
    }
  ]
}
