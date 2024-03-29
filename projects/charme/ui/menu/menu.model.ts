import { ElementRef, InjectionToken, TemplateRef } from '@angular/core'
import { OverlayRef } from '@charme/ui/overlay'
import { MenuItemDirective } from './items/menu-item.directive'

export interface MenuTriggerData {
  id: string
  tpl: TemplateRef<any>
  hostOverlayRef: OverlayRef | null
}

export interface CMenuAccessor {
  el: ElementRef
  registerItem: (item: MenuItemDirective) => void
  closeOthers: (item: MenuItemDirective) => void
}

export const C_MENU = new InjectionToken<CMenuAccessor>('C_MENU')
