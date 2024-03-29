import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component, computed,
  Input, signal,
  ViewEncapsulation
} from '@angular/core'
import { RippleDirective } from '@charme/ui/ripple'
import { NgIf } from '@angular/common'
import { ButtonColor, ButtonSize, buttonThemes, ButtonType } from './buttom.theme'
import { twMerge } from 'tailwind-merge'

@Component({
  selector: 'button[c-button], a[c-button]',
  hostDirectives: [{
    directive: RippleDirective,
    inputs: ['rippleContained', 'rippleDuration', 'rippleDisabled: disabled']
  }],
  host: {
    '[class]': '$class()',
    '[disabled]': 'disabled',
    '[attr.data-selected]': 'selected'
  },
  templateUrl: './button.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input({ transform: booleanAttribute }) disabled = false
  @Input({ transform: booleanAttribute }) loading = false
  @Input({ transform: booleanAttribute }) selected = false

  $customClass = signal<string>('')
  @Input('class') set customClass(value: string) {
    this.$customClass.set(value)
  }

  $size = signal<ButtonSize>('md')
  @Input() set size(value: ButtonSize) {
    this.$size.set(value)
  }

  $color = signal<ButtonColor>('primary')
  @Input() set color(value: ButtonColor) {
    this.$color.set(value)
  }

  $type = signal<ButtonType>('plain')
  @Input('b-type') set type(value: ButtonType) {
    this.$type.set(value)
  }

  $class = computed(() => twMerge(buttonThemes({ [this.$type()]: this.$color(), size: this.$size() }), this.$customClass()))
}
