import { InjectionToken, Signal } from '@angular/core'
import { ComboboxOptionDirective } from './combobox-option.directive'

export interface CComboboxTriggerAccessor {
  value: any
  propagateChange: (_: any) => void
}

export const C_COMBOBOX_TRIGGER_ACCESSOR = new InjectionToken<CComboboxTriggerAccessor>('C_COMBOBOX_TRIGGER_ACCESSOR')

export interface CComboboxAccessor {
  onSearch: (value: string) => void
  onOptionHover: (id: string) => void
  $selectedId: Signal<string | undefined>
  $displayedOptions: Signal<ComboboxOptionDirective[]>
  id: string
}

export const C_COMBOBOX_ACCESSOR = new InjectionToken<CComboboxAccessor>('C_COMBOBOX_ACCESSOR')
