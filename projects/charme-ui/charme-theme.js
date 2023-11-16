module.exports = {
  darkMode: 'class',
  theme: {
    fontFamily: {
      'material': ['"Material Icons"']
    },
    extend: {
      animation: {
        fade: 'fade 0.15s ease-in-out forwards',
        fadeout: 'fadeout 0.15s ease-in-out forwards',
        scale: 'scale 150ms cubic-bezier(0, 0, 0.2, 1) forwards',
        tooltip: 'fade 150ms cubic-bezier(0, 0, 0.2, 1) forwards, scale 150ms cubic-bezier(0, 0, 0.2, 1) forwards',
        ['dialog-open']: 'fade 150ms cubic-bezier(0, 0, 0.2, 1) forwards, scale 150ms cubic-bezier(0, 0, 0.2, 1) forwards',
        ['dialog-close']: 'fadeout 150ms cubic-bezier(0, 0, 0.2, 1) forwards',
        ['dialog-overlay-open']: 'fade 150ms cubic-bezier(0, 0, 0.2, 1) forwards',
        ['dialog-overlay-close']: 'fadeout 150ms cubic-bezier(0, 0, 0.2, 1) forwards',

      },
      keyframes: {
        fade: {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'},
        },
        fadeout: {
          '0%': {opacity: '1'},
          '100%': {opacity: '0'},
        },
        scale: {
          '0%': {transform: 'scale(0.8)'},
          '100%': {transform: 'scale(1)'},
        },
        'from-bottom': {
          '0%': {
            left: '0',
            top: '100%',
          },
          '100%': {
            left: '0',
            top: '0',
          }
        }
      },
    },
    colors: {
      transparent: 'transparent',
      c: {
        slate: {
          100: '#21252D',
          90: '#434650',
          80: '#62666F',
          70: '#767A84',
          60: '#9FA3AE',
          50: '#BEC2CD',
          40: '#E0E4F0',
          20: '#F2F6FF',
        },
        red: {
          100: '#2D0709',
          90: '#520408',
          80: '#750E13',
          70: '#A2191F',
          60: '#DA1E28',
          50: '#FA4D56',
          40: '#FF8389',
          30: '#FFB3B8',
          20: '#FFD7D9',
          10: '#FFF1F1',
        },
        orange: {
          100: '#231000',
          90: '#3E1A00',
          80: '#5E2900',
          70: '#8A3800',
          60: '#BA4E00',
          50: '#EB6200',
          40: '#FF832B',
          30: '#FFB784',
          20: '#FFD9BE',
          10: '#FFF2E8',
        },
        green: {
          100: '#071908',
          90: '#022D0D',
          80: '#044317',
          70: '#0e6027',
          60: '#198038',
          50: '#24A148',
          40: '#42BE65',
          30: '#6FDC8C',
          20: '#A7F0BA',
          10: '#DEFBE6'
        },
        sky: {
          50: '#00BBFF',
          70: '#0099FF',
          10: '#DFF6FF',
        },
        white: {
          100: '#FFFFFF',
        },
        black: {
          100: '#111111',
        },
        prussian: {
          100: '#00263D',
          90: '#153955',
          80: '#224C6A',
          70: '#335F81',
          60: '#416C92',
          50: '#5C81A5',
          40: '#7697B9',
          30: '#98B5D3',
          20: '#B8D4EE',
          10: '#DDEEFF',
        },
        steel: {
          100: '#48545E',
          90: '#5C6B77',
          80: '#6B7F8E',
          70: '#7D95A6',
          60: '#8BA6BA',
          40: '#B1C5D3',
          30: '#C8D6E1',
          20: '#DDE7ED',
          10: '#F1F5F9',
        },
        ultramarine: {
          90: '#001CD9',
          60: '#0040FB',
          50: '#335FFF',
          40: '#667EFF',
          30: '#98A3FE',
          20: '#C3C7FE',
          10: '#E8E9FF',
        },
        dark:{
          100: '#21252D'
        },
        blue: {
          60: '#0F62FE',
          50: '#4589FF',
          40: '#78A9FF',
          10: '#F0F6FF'
        },
        yellow: {
          100: '#1C1500',
          90: '#302400',
          80: '#483700',
          70: '#684E00',
          60: '#8E6A00',
          50: '#B28600',
          40: '#D2A106',
          30: '#F1C21B',
          20: '#FDDC69',
          10: '#FCF4D6',
        },
        purple: {
          70: '#6929C4',
          50: '#A56EFF',
          40: '#BE95FF',
          20: '#E8DAFF',
          10: '#F8F5FF',
        },
        teal: {
          50: '#009D9A'
        },
        cyan: {
          50: '#1192E8'
        },
        magenta: {
          70: '#9F1853',
          50: '#EE5396',
          10: '#FFF0F7'
        },
        charcoal: {
          100: '#111111'
        },
        chrome: {
          90: '#8C711C',
          40: '#E9D390'
        },
        fern: {
          80: '#479E5F',
          40: '#B2DCBD'
        }
      },
    }
  },
  plugins: [
    function ({addUtilities}) {
      addUtilities({
        '.bg-primary': {
          '@apply bg-c-steel-10 dark:bg-c-charcoal-100': {},
        },

        '.bg-secondary': {
          '@apply bg-c-white-100 dark:bg-c-slate-100': {}
        },

        '.text-primary': {
          '@apply text-c-prussian-100 dark:text-c-white-100': {}
        },

        '.text-secondary': {
          '@apply text-c-slate-80 dark:text-c-prussian-10': {}
        },

        '.border-primary': {
          '@apply border-c-slate-50 dark:border-c-prussian-50': {}
        },

        '.border-secondary': {
          '@apply border-c-slate-20 dark:border-c-slate-90': {}
        },

        '.c-overlay-shadow': {
          '@apply shadow-[2px_4px_8px_2px_rgba(72,84,94,0.15)] dark:shadow-[0px_4px_8px_0px_rgba(0,0,0,0.88)]': {}
        },

        '.c-card-shadow': {
          '@apply shadow-[0px_4px_8px_0px_rgba(72,84,94,0.04)] dark:shadow-[0px_4px_8px_0px_rgba(0,32,52,0.80)]': {}
        },

        '.c-card': {
          '@apply aiq-card-shadow rounded bg-secondary': {}
        }
      })
    }
  ]
}
