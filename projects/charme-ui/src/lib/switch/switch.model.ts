import { InjectionToken, Signal } from '@angular/core'

export interface CSwitchAccessor {
  $hover: Signal<boolean>
}

export const C_SWITCH_ACCESSOR = new InjectionToken<CSwitchAccessor>('C_SWITCH_ACCESSOR')
