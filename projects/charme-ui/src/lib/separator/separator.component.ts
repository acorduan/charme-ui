import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core'
import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

export const separatorThemes = cva('flex', {
  variants: {
    orientation: {
      horizontal: 'border-b h-px',
      vertical: 'border-r w-px'
    },
    color: {
      primary: 'border-primary',
      secondary: 'border-secondary'
    }
  }
})

type SeparatorTheme = VariantProps<typeof separatorThemes>
export type SeparatorOrientation = SeparatorTheme['orientation']
export type SeparatorColor = SeparatorTheme['color']

@Component({
  standalone: true,
  selector: 'c-separator',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'separator',
    '[attr.aria-orientation]': 'orientation',
    '[style.width]': '$orientation() === \'horizontal\' ? size : \'1px\'',
    '[style.height]': '$orientation() === \'horizontal\' ? \'1px\' : size',
    '[class]': '$class()'
  }
})
export class SeparatorComponent {
  $orientation = signal<SeparatorOrientation>('horizontal')
  @Input() set orientation(value: SeparatorOrientation) {
    this.$orientation.set(value)
  }

  $color = signal<SeparatorColor>('primary')
  @Input() set color(value: SeparatorColor) {
    this.$color.set(value)
  }

  @Input() size: string = '100%'

  $customClass = signal('')
  @Input('class') set customClass(value: string) {
    this.$customClass.set(value)
  }

  $class = computed(() => twMerge(separatorThemes({ orientation: this.$orientation(), color: this.$color() }), this.$customClass()))
}
