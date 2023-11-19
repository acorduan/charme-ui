import {
  booleanAttribute,
  Directive,
  effect,
  ElementRef,
  forwardRef,
  HostBinding,
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
  ]
})
export class CheckboxDirective implements ControlValueAccessor {
  @HostBinding('type') inputType = 'checkbox'
  @HostBinding('class') class = 'c-checkbox'

  constructor(private readonly el: ElementRef<HTMLInputElement>) {
    effect(() => this.elementRef.nativeElement.checked = this.#$checked())
  }

  @Input() set indeterminate(value: boolean | undefined | null) {
    this.el.nativeElement.indeterminate = value as boolean
  }

  readonly elementRef = inject(ElementRef<HTMLInputElement>)

  @HostListener('input', ['$event']) onChange(event: any): void {
    this.checked = !this.checked
    this.propagateChange(this.checked)
  }

  readonly #$checked = signal<boolean>(this.elementRef.nativeElement.checked)

  @Input({ transform: booleanAttribute }) set checked(value: any) {
    this.#$checked.set(value)
  }

  get checked(): boolean {
    return this.#$checked()
  }

  propagateChange = (_: any) => { }
  onTouchedCallback!: (() => {})

  writeValue(value: any) {
    if (value !== undefined && value !== null) {
      this.checked = value
    }
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn
  };
}
