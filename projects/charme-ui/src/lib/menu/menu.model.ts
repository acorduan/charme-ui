import { TemplateRef } from '@angular/core'
import { OverlayRef } from '../overlay/overlay.model'

export interface MenuTriggerData {
  id: string
  tpl: TemplateRef<any>
  hostOverlayRef: OverlayRef | null
}
