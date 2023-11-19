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
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

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
    this.checked = !this.checked;
    this.propagateChange(this.checked);
  }

  @Input({transform: booleanAttribute}) set disabled(value: any) {
    this.setDisabledState(value)
  }

  #$checked = signal<boolean>( this.elementRef.nativeElement.checked)
  $disabled = signal(this.elementRef.nativeElement.disabled)

  constructor() {
    effect(() => this.elementRef.nativeElement.checked = this.#$checked())
    effect(() => this.elementRef.nativeElement.disabled = this.$disabled())

    this.elementRef.nativeElement.id ??= crypto.randomUUID()
  }

  @Input({transform: booleanAttribute}) set checked(value: any) {
    this.#$checked.set(value)
  }

  get checked(): boolean {
    return this.#$checked()
  }

  get id(): string {
    return this.elementRef.nativeElement.id
  }

  get disabled(): boolean {
    return this.$disabled()
  }

  propagateChange = (_: any) => { };
  onTouchedCallback!: (() => {})

  writeValue(value: any) {
    if (value !== undefined && value !== null) {
      this.checked = value;
    }
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  };

  setDisabledState(value: boolean): void {
    this.$disabled.set(value)
  }
}
