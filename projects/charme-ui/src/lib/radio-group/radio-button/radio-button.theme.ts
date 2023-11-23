import { cva, VariantProps } from 'class-variance-authority'

export const radioButtomThemes = cva(
  'w-4 h-4 cursor-pointer after:material-icon-round after:text-[0.5rem] after:checked:content-["circle"] rounded-full focus-visible:focus-el ring-primary disabled:pointer-events-none flex items-center justify-center appearance-none',
  {
    variants: {
      type: {
        primary: 'text-white checked:bg-ultramarine-500 dark:hover:ring-ultramarine-300 hover:ring-ultramarine-700',
        success: 'text-white checked:bg-green-700 dark:hover:ring-green-400 hover:ring-green-900',
        warning: 'text-white checked:bg-orange-700 dark:hover:ring-orange-400 hover:ring-orange-900',
        error: 'text-white checked:bg-red-700 dark:hover:ring-red-400 hover:ring-red-900'
      }
    }
  }
)

type RadioButtomTheme = VariantProps<typeof radioButtomThemes>
export type RadioButtonColor = RadioButtomTheme['type']
