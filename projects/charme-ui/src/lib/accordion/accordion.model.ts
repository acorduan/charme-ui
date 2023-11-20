import { InjectionToken, WritableSignal } from '@angular/core'

export interface CAccordionAccessor {
  $selectedId: WritableSignal<string | undefined>
}

export const C_ACCORDION_ACCESSOR = new InjectionToken<CAccordionAccessor>('C_ACCORDION_ACCESSOR')
