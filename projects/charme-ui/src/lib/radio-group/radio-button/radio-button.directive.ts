import {
  booleanAttribute,
  Directive,
  ElementRef, forwardRef,
  HostListener,
  inject,
  Input
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
  ],
  host: {
    class: 'c-radio-button',
    type: 'radio',
    '[checked]': 'checked',
    '[name]': 'name',
    '[disabled]': 'disabled'
  }
})
export class RadioButtonDirective implements ControlValueAccessor {
  elementRef = inject(ElementRef<HTMLInputElement>)

  @HostListener('input', ['$event']) onChange(event: any): void {
    this.checked = event.target.checked
    this.propagateChange(this.checked)
  }

  @Input({ transform: booleanAttribute }) checked: any

  @Input({ required: true }) name!: string

  @Input({ transform: booleanAttribute }) disabled: any

  propagateChange = (_: boolean): void => { }
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
