import { InjectionToken, WritableSignal } from '@angular/core'

export interface CRadioGroupAccessor {
  name: string
  $value: WritableSignal<any>
  writeValue: (value: any) => void
  propagateChange: (value: any) => void
}

export const C_RADIO_GROUP_ACCESSOR = new InjectionToken<CRadioGroupAccessor>(
  'C_RADIO_GROUP_ACCESSOR'
)
