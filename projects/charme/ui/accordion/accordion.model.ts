import { InjectionToken } from '@angular/core'

export interface CAccordionAccessor {
  onIemOpen: (id: string) => void
  openAll: () => void
  closeAll: () => void
}

export const C_ACCORDION_ACCESSOR = new InjectionToken<CAccordionAccessor>('C_ACCORDION_ACCESSOR')
