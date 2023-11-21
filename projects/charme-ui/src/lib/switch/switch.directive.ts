import {
  booleanAttribute,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  Input,
  signal
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Directive({
  selector: 'input [c-switch]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchDirective),
      multi: true
    }
  ],
  host: {
    tabindex: '-1',
    role: 'switch',
    type: 'checkbox',
    class: 'fixed opacity-0 pointer-events-none outline-0',
    '[checked]': '$checked()',
    '[disabled]': '$disabled()'
  }

})
export class SwitchDirective implements ControlValueAccessor {
  readonly elementRef = inject(ElementRef<HTMLInputElement>)

  @HostListener('input') onChange(): void {
    const checked = !this.$checked()
    this.$checked.set(checked)
    this.propagateChange(checked)
  }

  readonly $checked = signal<boolean>(false)
  @Input({ transform: booleanAttribute }) set checked(value: any) {
    this.$checked.set(value)
  }

  readonly $disabled = signal<boolean>(false)
  @Input({ transform: booleanAttribute }) set disabled(value: any) {
    this.setDisabledState(value)
  }

  propagateChange = (_: any): void => { }
  onTouchedCallback!: (() => any)

  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.checked = value
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn
  };

  setDisabledState(value: boolean): void {
    this.$disabled.set(value)
  }
}
