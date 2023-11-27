import {ElementRef, InjectionToken, TemplateRef} from '@angular/core'
import { OverlayRef } from '../overlay/overlay.model'
import { MenuItemDirective } from './menu-item.directive'

export interface MenuTriggerData {
  id: string
  tpl: TemplateRef<any>
  hostOverlayRef: OverlayRef | null
}

export interface MenuNavigationEvent {
  item: MenuItemDirective
  direction: 'up' | 'down' | 'right' | 'left'
  event: KeyboardEvent
}


export interface CMenuBarAccessor {
  el: ElementRef
}

export const C_MENU_BAR = new InjectionToken<CMenuBarAccessor>('C_MENU_BAR')
