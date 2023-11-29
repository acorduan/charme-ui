import { cva, VariantProps } from 'class-variance-authority'

const base = 'inline-flex justify-center items-center relative rounded px-4 gap-2 min-w-min'
const baseDisable = 'disabled:disabled-el'
const baseFocus = 'focus-visible:focus-el'

export const buttonThemes = cva(
  `${base} ${baseDisable} ${baseFocus}`,
  {
    variants: {
      plain: {
        basic: 'text-primary bg-secondary hover:bg-base-200 aria-expanded:bg-base-200 selected:bg-base-200 aria-expanded:dark:bg-base-800 hover:dark:bg-base-800 selected:hover:dark:bg-base-800',
        primary: 'text-white bg-primary-500 hover:bg-primary-600 aria-expanded:bg-primary-600 selected:bg-primary-600',
        success: 'text-white bg-success-700 hover:bg-success-800',
        warning: 'text-white bg-warning-700 hover:bg-warning-800',
        error: 'text-white bg-error-600 hover:bg-error-700'
      },
      soft: {
        basic: 'text-base-800 dark:text-base-200 bg-secondary hover:bg-base-200 hover:dark:bg-base-800 selected:bg-base-200 selected:dark:bg-base-800 aria-expanded:bg-base-200 aria-expanded:dark:bg-base-800',
        primary: 'text-primary-500 dark:text-primary-300 bg-primary-100 dark:bg-primary-500/20 hover:bg-primary-200 hover:dark:bg-primary-600/30 selected:bg-primary-200 selected:dark:bg-primary-600/30 aria-expanded:bg-primary-200 aria-expanded:dark:bg-primary-600/30',
        success: 'text-success-700 dark:text-success-600 bg-success-100 dark:bg-success-600/20 hover:bg-success-200 hover:dark:bg-success-600/30',
        warning: 'text-warning-700 dark:text-warning-600 bg-warning-100 dark:bg-warning-600/20 hover:bg-warning-200 hover:dark:bg-warning-600/30',
        error: 'text-error-700 dark:text-error-600 bg-error-100 dark:bg-error-600/20 hover:bg-error-200 hover:dark:bg-error-600/30'
      },
      outline: {
        basic: 'text-primary bg-transparent ring-secondary  hover:dark:bg-base-800 hover:bg-base-200  selected:dark:bg-base-800 selected:bg-base-200  aria-expanded:dark:bg-base-800 aria-expanded:bg-base-200',
        primary: 'text-primary-500 dark:text-primary-300 ring-1 ring-primary-200 dark:ring-primary-800 hover:bg-primary-500/20 hover:dark:bg-primary-400/20 selected:bg-primary-500/20 selected:dark:bg-primary-400/20  aria-expanded:bg-primary-500/20 aria-expanded:dark:bg-primary-400/20 ',
        success: 'text-success-700 dark:text-success-500 hover:bg-success-500/20 hover:dark:bg-success-600/20 ring-1 ring-success-200 dark:ring-success-800',
        warning: 'text-warning-700 dark:text-warning-500 hover:bg-warning-400/20 hover:dark:bg-warning-500/20 ring-1 ring-warning-200 dark:ring-warning-800',
        error: 'text-error-700 dark:text-error-500 hover:bg-error-500/20 hover:dark:bg-error-600/20 ring-1 ring-error-200 dark:ring-error-800'
      },
      flat: {
        basic: 'text-primary bg-transparent hover:bg-base-200 dark:hover:bg-base-800 selected:bg-base-200 selected:hover:bg-base-800 aria-expanded:bg-base-200 dark:aria-expanded:bg-base-800',
        primary: 'bg-transparent text-primary-500 dark:text-primary-300 hover:bg-primary-400/20 selected:bg-primary-400/20 aria-expanded:bg-primary-400/20',
        success: 'bg-transparent text-success-700 dark:text-success-500 hover:bg-success-500/20 hover:dark:bg-success-600/20',
        warning: 'bg-transparent text-warning-700 dark:text-warning-500 hover:bg-warning-400/20 hover:dark:bg-warning-500/20',
        error: 'bg-transparent text-error-700 dark:text-error-500 hover:bg-error-500/20 hover:dark:bg-error-600/20'
      },
      size: {
        sm: 'h-6 text-xs',
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
