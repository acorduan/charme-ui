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
        },
        'from-bottom': {
          '0%': {
            left: '0',
            top: '100%'
          },
          '100%': {
            left: '0',
            top: '0'
          }
        }
      }
    },
    colors: {
      transparent: 'transparent',
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
      black: colors.black,
      white: colors.white,

      steel: {
        1000: '#48545E',
        900: '#5C6B77',
        800: '#6B7F8E',
        700: '#7D95A6',
        600: '#8BA6BA',
        400: '#B1C5D3',
        300: '#C8D6E1',
        200: '#DDE7ED',
        100: '#F1F5F9'
      },
      ultramarine: {
        900: '#001CD9',
        600: '#0040FB',
        500: '#335FFF',
        400: '#667EFF',
        300: '#98A3FE',
        200: '#C3C7FE',
        100: '#E8E9FF'
      },
      charcoal: '#111111'
    }
  },
  plugins: [
    function ({addUtilities}) {
      addUtilities({
        '.bg-primary': {
          '@apply bg-steel-100 dark:bg-charcoal': {}
        },

        '.bg-secondary': {
          '@apply bg-white dark:bg-zinc-800': {}
        },

        '.text-primary': {
          '@apply text-indigo-950 dark:text-white': {}
        },

        '.text-secondary': {
          '@apply text-slate-800 dark:text-indigo-100': {}
        },

        '.border-primary': {
          '@apply border-slate-500 dark:border-indigo-500': {}
        },

        '.border-secondary': {
          '@apply border-slate-200 dark:border-slate-900': {}
        },

        '.c-overlay-shadow': {
          '@apply shadow-[2px_4px_8px_2px_rgba(72,84,94,0.15)] dark:shadow-[0px_4px_8px_0px_rgba(0,0,0,0.88)]': {}
        },

        '.c-card-shadow': {
          '@apply shadow-[0px_4px_8px_0px_rgba(72,84,94,0.04)] dark:shadow-[0px_4px_8px_0px_rgba(0,32,52,0.80)]': {}
        },

        '.c-card': {
          '@apply c-card-shadow rounded bg-secondary': {}
        }
      })
    }
  ]
}
