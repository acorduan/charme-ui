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
import { tlMerge } from '../core/tailwind-merge'
import { checkboxThemes, CheckboxType } from './checkbox.theme'

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

  @Input() set indeterminate(value: boolean | undefined | null) {
    this.el.nativeElement.indeterminate = value as boolean
  }

  readonly elementRef = inject(ElementRef<HTMLInputElement>)

  @HostListener('input') onChange(): void {
    this.checked = !this.checked
    this.propagateChange(this.checked)
  }

  readonly $checked = signal<boolean>(this.elementRef.nativeElement.checked)

  @Input({ transform: booleanAttribute }) set checked(value: boolean) {
    this.$checked.set(value)
  }

  get checked(): boolean {
    return this.$checked()
  }

  $disabled = signal(false)
  @Input({ transform: booleanAttribute }) set disabled(value: boolean) {
    this.$disabled.set(value)
  }

  $customClass = signal('')
  @Input('class') set customClass(value: string) {
    this.$customClass.set(value)
  }

  $type = signal<CheckboxType>('primary')
  @Input('c-type') set type(value: CheckboxType) {
    this.$type.set(value)
  }

  $class = computed(() => tlMerge(checkboxThemes({ type: this.$type() }), this.$customClass()))

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
