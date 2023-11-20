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
  selector: '[c-radio-button-behavior]',
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

  constructor() {
    effect(() => this.elementRef.nativeElement.checked = this.#$checked())
    effect(() => this.elementRef.nativeElement.name = this.$name())
    effect(() => this.elementRef.nativeElement.disabled = this.$disabled())
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

  $name = signal('')
  @Input() set name(value: string) {
    this.$name.set(value)
  }

  get name(): string {
    return this.$name()
  }

  $disabled = signal(false)
  @Input({ transform: booleanAttribute }) set disabled(value: any) {
    this.$disabled.set(value)
  }

  get disabled(): boolean {
    return this.$disabled()
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
