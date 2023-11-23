import { cva, VariantProps } from 'class-variance-authority'

export const checkboxThemes = cva(
  'w-5 h-5 cursor-pointer focus-visible:focus-el border border-primary disabled:pointer-events-none rounded flex items-center justify-center appearance-none font-material checked:after:content-["done"] text-sm after:text-sm after:checked:animate-fade',
  {
    variants: {
      type: {
        primary: 'text-white checked:bg-ultramarine-500 checked:hover:bg-ultramarine-600',
        success: 'text-white checked:bg-green-700 checked:hover:bg-green-800',
        warning: 'text-white checked:bg-orange-700 checked:hover:bg-orange-800',
        error: 'text-white checked:bg-red-700 checked:hover:bg-red-800'

      }
    }
  }
)

type CheckboxTheme = VariantProps<typeof checkboxThemes>
export type CheckboxType = CheckboxTheme['type']
