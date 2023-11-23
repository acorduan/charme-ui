import { NgClass } from '@angular/common'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  signal
} from '@angular/core'
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'
import { C_SWITCH_ACCESSOR } from './switch.model'

@Component({
  selector: 'c-switch',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true
    }
  ],
  templateUrl: 'switch.component.html',
  imports: [NgClass, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bg-[length:200%_100%] text-white rounded-2xl w-8 h-5 c-switch-animation relative focus-visible:focus-el data-[hover=true]:ring-1 data-[hover=true]:ring-ultramarine-500',
    '[class.bg-left-bottom]': '$checked()',
    '[class.bg-right-bottom]': '!$checked()',
    '[tabindex]': '$disabled() ? -1 : 0',
    '[id]': '\'c-switch-\' + id',
    '[attr.data-hover]': 'accessor.$hover()'
  }
})
export class SwitchComponent implements ControlValueAccessor {
  readonly elementRef = inject(ElementRef<HTMLInputElement>)
  readonly accessor = inject(C_SWITCH_ACCESSOR)

  readonly $checked = signal<boolean>(false)
  @Input({ transform: booleanAttribute }) set checked(value: boolean) {
    this.$checked.set(value)
  }

  readonly $disabled = signal<boolean>(false)
  @Input({ transform: booleanAttribute }) set disabled(value: boolean) {
    this.setDisabledState(value)
  }

  @Input('id') id?: string

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

  @HostListener('click')
  @HostListener('keyup.space')
  @HostBinding('keyup.enter')
  toggle(): void {
    const checked = !this.$checked()
    this.writeValue(checked)
    this.propagateChange(checked)
  }
}
