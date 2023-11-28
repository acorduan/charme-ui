import { cva, VariantProps } from 'class-variance-authority'

export const radioButtomThemes = cva(
  'w-4 h-4 cursor-pointer after:material-icon-round after:text-[0.5rem] after:checked:content-["circle"] rounded-full focus-visible:focus-el ring-primary disabled:pointer-events-none flex items-center justify-center appearance-none',
  {
    variants: {
      type: {
        primary: 'text-white checked:bg-primary-500 dark:hover:ring-primary-300 hover:ring-primary-700',
        success: 'text-white checked:bg-success-700 dark:hover:ring-success-400 hover:ring-success-900',
        warning: 'text-white checked:bg-warning-700 dark:hover:ring-warning-400 hover:ring-warning-900',
        error: 'text-white checked:bg-error-700 dark:hover:ring-error-400 hover:ring-error-900'
      }
    }
  }
)

type RadioButtomTheme = VariantProps<typeof radioButtomThemes>
export type RadioButtonColor = RadioButtomTheme['type']
