import {
  Directive, forwardRef, inject, InjectionToken, Input, TemplateRef
} from '@angular/core'
import { PopoverTriggerDirective } from '../popover'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

export interface CComboboxAccessor {
  value: any
  propagateChange: (_: any) => void
}

export const C_COMBOBOX_ACCESSOR = new InjectionToken<CComboboxAccessor>('C_COMBOBOX_ACCESSOR')

@Directive({
  selector: '[c-combobox-trigger]',
  standalone: true,
  hostDirectives: [{ directive: PopoverTriggerDirective, inputs: ['c-popover-trigger:c-combobox-trigger'] }],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboboxTriggerDirective),
      multi: true
    },
    {
      provide: C_COMBOBOX_ACCESSOR,
      useExisting: forwardRef(() => ComboboxTriggerDirective)
    }
  ],
  host: {
    role: 'combobox'
  }
})
export class ComboboxTriggerDirective implements ControlValueAccessor, CComboboxAccessor {
  readonly #popover = inject(PopoverTriggerDirective)
  @Input('c-combobox-trigger') tpl!: TemplateRef<any>
  @Input() value: any

  constructor() {
    this.#popover.providers.push([{ provide: C_COMBOBOX_ACCESSOR, useValue: this }])
  }

  propagateChange = (_: any): void => {}
  onTouchedCallback!: () => any

  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.value = value
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn
  }
}
