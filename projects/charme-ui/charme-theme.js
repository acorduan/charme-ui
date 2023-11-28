const colors = require('tailwindcss/colors')
const ultramarine = {
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
}

module.exports = {
    darkMode: 'class',
    theme: {
        fontFamily: {
            material: ['"Material Icons"'],
            'material-outlined': ['"Material Icons Outlined"'],
            'material-round': ['"Material Icons Round"']

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
            ultramarine,
            primary: ultramarine,
            success: colors.green,
            warning: colors.orange,
            error: colors.red

        }
    },
    plugins: [
        function ({addVariant})  {
            addVariant('selected', '&[data-selected="true"]')
            addVariant('not-focus', '&:not(:focus)')
            addVariant('not-hover', '&:not(:hover)')
        },

        function ({addUtilities}) {
            addUtilities({
                '.focus-el': {
                    '@apply outline outline-2 focus-visible:outline-primary-400': {}
                },

                '.disabled-el': {
                    '@apply cursor-default opacity-40 pointer-events-none select-none': {}
                },

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

                '.ring-primary': {
                    '@apply ring-1 ring-zinc-400 dark:ring-zinc-600': {}
                },

                '.ring-secondary': {
                    '@apply ring-1 ring-zinc-200 dark:ring-zinc-800': {}
                },

                '.border-primary': {
                    '@apply border-zinc-400 dark:border-zinc-600': {}
                },

                '.border-secondary': {
                    '@apply border-zinc-200 dark:border-zinc-800': {}
                },

                '.card': {
                    '@apply shadow-sm rounded bg-secondary': {}
                },

                '.material-icon': {
                    '@apply font-material font-normal not-italic leading-none normal-case inline-block whitespace-nowrap': {}
                },

                '.material-icon-outlined': {
                    '@apply font-material-outlined font-normal not-italic leading-none normal-case inline-block whitespace-nowrap': {}
                },

                '.material-icon-round': {
                    '@apply font-material-round font-normal not-italic leading-none normal-case inline-block whitespace-nowrap': {}
                }
            })
        },
    ]
}
