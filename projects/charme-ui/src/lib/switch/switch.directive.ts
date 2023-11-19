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
  selector: 'input [c-switch]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchDirective),
      multi: true
    }
  ]

})
export class SwitchDirective implements ControlValueAccessor {
  readonly elementRef = inject(ElementRef<HTMLInputElement>)

  @HostBinding('attr.tabindex') tabindex = -1
  @HostBinding('attr.role') role = 'switch'
  @HostBinding('class') class = 'fixed opacity-0 pointer-events-none outline-0'
  @HostBinding('type') type = 'checkbox'

  @HostListener('input') onChange(): void {
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

  readonly $disabled = signal<boolean>(this.elementRef.nativeElement.disabled)

  @Input({ transform: booleanAttribute }) set disabled(value: any) {
    this.setDisabledState(value)
  }

  get disabled(): boolean {
    return this.$disabled()
  }

  constructor() {
    effect(() => this.elementRef.nativeElement.checked = this.#$checked())
    effect(() => this.elementRef.nativeElement.disabled = this.$disabled())

    this.elementRef.nativeElement.id ??= crypto.randomUUID()
  }

  get id(): string {
    return this.elementRef.nativeElement.id
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
