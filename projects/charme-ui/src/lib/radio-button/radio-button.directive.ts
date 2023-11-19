import {
  booleanAttribute,
  Directive,
  effect,
  ElementRef, forwardRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  signal
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Directive({
  selector: '[c-radio-button]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonDirective),
      multi: true
    }
  ]
})
export class RadioButtonDirective implements ControlValueAccessor {
  @HostBinding('class') class = 'c-radio-button'
  @HostBinding('type') inputType = 'radio'

  constructor(private readonly el: ElementRef<HTMLInputElement>) {
    effect(() => this.elementRef.nativeElement.checked = this.#$checked())
  }

  readonly elementRef = inject(ElementRef<HTMLInputElement>)

  @HostListener('input', ['$event']) onChange(event: any): void {
    this.checked = event.target.checked
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
