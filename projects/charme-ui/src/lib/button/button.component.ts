import { booleanAttribute, ChangeDetectionStrategy, Component, Input, signal, ViewEncapsulation } from '@angular/core'
import { ButtonColor, buttonColors, ButtonSize, buttonSizes, ButtonType, buttonTypes } from './button.model'
import { RippleDirective } from '../ripple/ripple.directive'
import { CharmeComponent } from '../charme-component/charme-component.directive'
import { NgIf } from '@angular/common'

const baseClass = 'c-button'

@Component({
  selector: 'button[c-button], a[c-button]',
  hostDirectives: [{
    directive: RippleDirective,
    inputs: ['rippleContained', 'rippleDuration', 'rippleDisabled: disabled']
  }],
  host: {
    class: baseClass,
    '[disabled]': `disabled`,
  },
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [
    NgIf
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent extends CharmeComponent {
  constructor() {
    super()
    this.type = 'plain'
    this.color = 'primary'
    this.size = 'md'
  }

  #disabled = false
  @Input({ transform: booleanAttribute }) set disabled(disabled: any) {
    this.#disabled = disabled
    const className = `${baseClass}-disabled`
    disabled as boolean
      ? this.addClass(className)
      : this.removeClass(className)
  }

  get disabled(): boolean {
    return this.#disabled
  }

  $loading = signal(false)
  @Input({ transform: booleanAttribute }) set loading(value: any) {
    this.$loading.set(value)
    this.$loading() ? this.addClass(`${baseClass}-loading`) : this.removeClass(`${baseClass}-loading`)
  }

  @Input() set size(value: ButtonSize) {
    buttonSizes.forEach((size) => this.removeClass(`${baseClass}-${size}`))
    this.addClass(`${baseClass}-${value}`)
  }

  @Input() set color(value: ButtonColor) {
    buttonColors.forEach((color) => this.removeClass(`${baseClass}-${color}`))
    this.addClass(`${baseClass}-${value}`)
  }

  @Input('b-type') set type(value: ButtonType) {
    buttonTypes.forEach((type) => this.removeClass(`${baseClass}-${type}`))
    this.addClass(`${baseClass}-${value}`)
  }

  @Input({ transform: booleanAttribute }) set selected(value: any) {
    const selectedClass = `${baseClass}-selected`
    value as boolean ? this.addClass(selectedClass) : this.removeClass(selectedClass)
  }
}
