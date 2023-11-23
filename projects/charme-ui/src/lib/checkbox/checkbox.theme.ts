import { cva, VariantProps } from 'class-variance-authority'

export const checkboxThemes = cva(
  'w-4 h-4 cursor-pointer focus-visible:focus-el ring-primary disabled:pointer-events-none rounded flex items-center justify-center appearance-none after:font-material-outlined checked:after:content-["done"] text-sm after:text-sm after:checked:animate-fade',
  {
    variants: {
      color: {
        primary: 'text-white checked:bg-ultramarine-500 dark:hover:ring-ultramarine-300 hover:ring-ultramarine-700',
        success: 'text-white checked:bg-green-700 dark:hover:ring-green-400 hover:ring-green-900',
        warning: 'text-white checked:bg-orange-700 dark:hover:ring-orange-400 hover:ring-orange-900',
        error: 'text-white checked:bg-red-700 dark:hover:ring-red-400 hover:ring-red-900'
      }
    }
  }
)

type CheckboxTheme = VariantProps<typeof checkboxThemes>
export type CheckboxColor = CheckboxTheme['color']
