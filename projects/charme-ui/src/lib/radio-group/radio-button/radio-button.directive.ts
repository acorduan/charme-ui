import {
  booleanAttribute,
  computed,
  Directive,
  ElementRef, forwardRef,
  HostListener,
  inject,
  Input,
  signal
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { tlMerge } from '../../core/tailwind-merge'
import { radioButtomThemes, RadioButtonColor } from './radio-button.theme'

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
    '[class]': '$class()',
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

  @Input({ transform: booleanAttribute }) checked: boolean = false
  @Input({ required: true }) name!: string
  @Input({ transform: booleanAttribute }) disabled: boolean = false

  $color = signal<RadioButtonColor>('primary')
  @Input() set color(value: RadioButtonColor) {
    this.$color.set(value)
  }

  propagateChange = (_: boolean): void => { }
  onTouchedCallback!: (() => any)

  $class = computed(() => tlMerge(radioButtomThemes({ type: this.$color() })))

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
