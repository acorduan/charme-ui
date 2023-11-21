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
    '[checked]': '$checked()',
    type: 'checkbox',
    class: 'c-checkbox'
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

  @Input({ transform: booleanAttribute }) set checked(value: any) {
    this.$checked.set(value)
  }

  get checked(): boolean {
    return this.$checked()
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
}
