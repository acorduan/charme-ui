import { cva, VariantProps } from 'class-variance-authority'

const base = 'inline-flex justify-center items-center relative rounded px-4 gap-2 min-w-min'
const baseDisable = 'disabled:disabled-el'
const baseFocus = 'focus-visible:focus-el'

export const buttonThemes = cva(
    `${base} ${baseDisable} ${baseFocus}`,
    {
      variants: {
        plain: {
          basic: 'text-primary bg-secondary hover:bg-zinc-200 hover:dark:bg-zinc-800',
          primary: 'text-white bg-ultramarine-500 hover:bg-ultramarine-600',
          success: 'text-white bg-green-700 hover:bg-green-800',
          warning: 'text-white bg-orange-700 hover:bg-orange-800',
          error: 'text-white bg-red-600 hover:bg-red-700 '
        },
        soft: {
          basic: 'text-zinc-800 dark:text-zinc-200 bg-secondary hover:bg-zinc-200 hover:dark:bg-zinc-800',
          primary: 'text-ultramarine-500 dark:text-ultramarine-300 bg-ultramarine-100 dark:bg-ultramarine-500/20 hover:bg-ultramarine-200 hover:dark:bg-ultramarine-600/30',
          success: 'text-green-700 dark:text-green-600 bg-green-100 dark:bg-green-600/20 hover:bg-green-200 hover:dark:bg-green-600/30',
          warning: 'text-orange-700 dark:text-orange-600 bg-orange-100 dark:bg-orange-600/20 hover:bg-orange-200 hover:dark:bg-orange-600/30',
          error: 'text-red-700 dark:text-red-600 bg-red-100 dark:bg-red-600/20 hover:bg-red-200 hover:dark:bg-red-600/30'
        },
        outline: {
          basic: 'text-primary bg-transparent hover:bg-zinc-200 ring-1 ring-black hover:dark:bg-zinc-800 dark:ring-white',
          primary: 'text-ultramarine-500 dark:text-ultramarine-300 hover:bg-ultramarine-500/20 hover:dark:bg-ultramarine-400/20 ring-1 ring-ultramarine-500 dark:ring-ultramarine-300',
          success: 'text-green-700 dark:text-green-500 hover:bg-green-500/20 hover:dark:bg-green-600/20 ring-1 ring-green-700 dark:ring-green-500',
          warning: 'text-orange-700 dark:text-orange-500 hover:bg-orange-400/20 hover:dark:bg-orange-500/20 ring-1 ring-orange-700 dark:ring-orange-500',
          error: 'text-red-700 dark:text-red-500 hover:bg-red-500/20 hover:dark:bg-red-600/20 ring-1 ring-red-700 dark:ring-red-500'
        },
        flat: {
          basic: 'text-primary bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800',
          primary: 'bg-transparent text-ultramarine-500 dark:text-ultramarine-300 hover:bg-ultramarine-400/20',
          success: 'bg-transparent text-green-700 dark:text-green-500 hover:bg-green-500/20 hover:dark:bg-green-600/20',
          warning: 'bg-transparent text-orange-700 dark:text-orange-500 hover:bg-orange-400/20 hover:dark:bg-orange-500/20',
          error: 'bg-transparent text-red-700 dark:text-red-500 hover:bg-red-500/20 hover:dark:bg-red-600/20'
        },
        size: {
          sm: 'h-6 text-[0.70rem]',
          md: 'h-8 text-sm',
          lg: 'h-11 text-base',
          'sm-icon': 'h-6 w-6 text-[0.70rem] px-0',
          'md-icon': 'h-8 w-8 text-sm px-0',
          'lg-icon': 'h-11 w-11 text-base px-0'
        }
      }
    }
)
export type ButtonTheme = VariantProps<typeof buttonThemes>

export type ButtonType = keyof Omit<ButtonTheme, 'size'>
export type ButtonSize = ButtonTheme['size']
export type ButtonColor = ButtonTheme['plain']
