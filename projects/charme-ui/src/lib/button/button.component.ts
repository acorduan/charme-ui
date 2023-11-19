import { booleanAttribute, Component, Input, signal, ViewEncapsulation } from '@angular/core'
import { ButtonColor, buttonColors, ButtonSize, buttonSizes, ButtonType, buttonTypes } from './button.model'
import { RippleDirective } from '../ripple/ripple.directive'
import { CharmeComponent } from '../charme-component/charme-component.directive'
import { NgIf } from '@angular/common'

const baseClass = 'c-button'

@Component({
  selector: 'button[c-button], a[c-button]',
  hostDirectives: [{
    directive: RippleDirective,
    inputs: ['rippleContained', 'rippleDuration', 'rippleDisabled: loading', 'rippleDisabled: disabled']
  }],
  host: { class: baseClass },
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [
    NgIf
  ],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent extends CharmeComponent {
  constructor() {
    super()
    this.type = 'plain'
    this.color = 'primary'
    this.size = 'md'
  }

  @Input({ transform: booleanAttribute }) set disabled(disabled: any) {
    const className = `${baseClass}-disabled`
    disabled ? this.addClass(className) : this.removeClass(className)
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
    value ? this.addClass(selectedClass) : this.removeClass(selectedClass)
  }
}
