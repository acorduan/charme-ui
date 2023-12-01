import {
  booleanAttribute,
  Directive, forwardRef, inject, Input, TemplateRef
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { C_COMBOBOX_TRIGGER_ACCESSOR, CComboboxTriggerAccessor } from './combobox.model'
import { PopoverTriggerDirective } from '@charme/ui/popover'

@Directive({
  selector: '[c-combobox-trigger]',
  standalone: true,
  hostDirectives: [{ directive: PopoverTriggerDirective, inputs: ['c-popover-trigger:c-combobox-trigger', 'side', 'align'] }],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboboxTriggerDirective),
      multi: true
    }
  ],
  host: {
    role: 'combobox'
  }
})
export class ComboboxTriggerDirective implements ControlValueAccessor, CComboboxTriggerAccessor {
  readonly #popover = inject(PopoverTriggerDirective)
  @Input('c-combobox-trigger') tpl!: TemplateRef<any>
  @Input() value: any
  @Input({ transform: booleanAttribute }) autocomplete = false

  constructor() {
    this.#popover.providers.push([{ provide: C_COMBOBOX_TRIGGER_ACCESSOR, useValue: this }])
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
