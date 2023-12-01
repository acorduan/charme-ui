import { computed, Directive, Input, signal } from '@angular/core'
import { cva, VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const badgeThemes = cva('rounded-xl text-xs py-0.5 px-2', {
  variants: {
    color: {
      basic: 'text-primary bg-secondary',
      primary: 'text-white bg-primary-500',
      success: 'text-white bg-success-700',
      warning: 'text-white bg-warning-700',
      error: 'text-white bg-error-700'
    }
  }
})

type BadgeTheme = VariantProps<typeof badgeThemes>
type BadgeColor = BadgeTheme['color']

@Directive({
  standalone: true,
  selector: '[c-badge]',
  host: {
    '[class]': '$class()'
  }
})
export class BadgeDirective {
  $color = signal<BadgeColor>('primary')
  @Input() set color(value: BadgeColor) {
    this.$color.set(value)
  }

  $customClass = signal('')
  @Input('class') set customClass(value: string) {
    this.$customClass.set(value)
  }

  $class = computed(() => twMerge(badgeThemes({ color: this.$color() }), this.$customClass()))
}
