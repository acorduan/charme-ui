import { InjectionToken } from '@angular/core'

export interface CDisclosureAccessor {
  open: boolean
  toggle: () => void
  id: string
}

export const C_DISCLOSURE_ACCESSOR = new InjectionToken<CDisclosureAccessor>('C_DISCLOSURE_ACCESSOR')
