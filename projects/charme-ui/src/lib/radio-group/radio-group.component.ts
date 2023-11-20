import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, Input, signal } from '@angular/core'
import { C_RADIO_GROUP_ACCESSOR } from './radio-group.model'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  standalone: true,
  selector: 'c-radio-group',
  templateUrl: 'radio-group.component.html',
  providers: [
    {
      provide: C_RADIO_GROUP_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent)
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RadioGroupComponent implements ControlValueAccessor {
  @HostBinding('role') role = 'radiogroup'
  @HostBinding('class') class = 'grid gap-2'

  @Input({ required: true }) name!: string

  $value = signal<any>(undefined)
  @Input() set value(value: any) {
    this.$value.set(value)
  }

  get value(): any {
    return this.$value()
  }

  propagateChange = (_: any): void => { }
  onTouchedCallback!: (() => any)

  registerOnChange(fn: any): void {
    this.propagateChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn
  }

  writeValue(value: any): void {
    this.value = value
  }
}
