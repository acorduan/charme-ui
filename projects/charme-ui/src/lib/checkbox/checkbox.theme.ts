import { cva, VariantProps } from 'class-variance-authority'

export const checkboxThemes = cva(
  'w-4 h-4 cursor-pointer focus-visible:focus-el ring-primary disabled:pointer-events-none rounded flex items-center justify-center appearance-none after:font-material-outlined checked:after:content-["done"] text-sm after:text-sm after:checked:animate-fade',
  {
    variants: {
      color: {
        primary: 'text-white checked:bg-primary-500 dark:hover:ring-primary-300 hover:ring-primary-700',
        success: 'text-white checked:bg-success-700 dark:hover:ring-success-400 hover:ring-success-900',
        warning: 'text-white checked:bg-warning-700 dark:hover:ring-warning-400 hover:ring-warning-900',
        error: 'text-white checked:bg-error-700 dark:hover:ring-error-400 hover:ring-error-900'
      }
    }
  }
)

type CheckboxTheme = VariantProps<typeof checkboxThemes>
export type CheckboxColor = CheckboxTheme['color']
