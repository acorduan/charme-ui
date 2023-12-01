import {
  booleanAttribute,
  computed,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  Input,
  signal
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { CheckboxColor, checkboxThemes } from './checkbox.theme'
import { twMerge } from 'tailwind-merge'

@Directive({
  selector: '[c-checkbox]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxDirective),
      multi: true
    }
  ],
  host: {
    '[class]': '$class()',
    '[checked]': '$checked()',
    '[disabled]': '$disabled()',
    type: 'checkbox'
  }
})
export class CheckboxDirective implements ControlValueAccessor {
  readonly el = inject(ElementRef<HTMLInputElement>)
  readonly elementRef = inject(ElementRef<HTMLInputElement>)

  @HostListener('input') onChange(): void {
    this.checked = !this.$checked()
    this.propagateChange(this.$checked())
  }

  $checked = signal<boolean>(this.elementRef.nativeElement.checked)
  @Input({ transform: booleanAttribute }) set checked(value: boolean) {
    this.$checked.set(value)
  }

  $disabled = signal(false)
  @Input({ transform: booleanAttribute }) set disabled(value: boolean) {
    this.$disabled.set(value)
  }

  $customClass = signal('')
  @Input('class') set customClass(value: string) {
    this.$customClass.set(value)
  }

  $type = signal<CheckboxColor>('primary')
  @Input('c-type') set type(value: CheckboxColor) {
    this.$type.set(value)
  }

  $class = computed(() => twMerge(checkboxThemes({ color: this.$type() }), this.$customClass()))

  propagateChange = (_: any): void => {}
  onTouchedCallback!: () => any

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
  }
}
