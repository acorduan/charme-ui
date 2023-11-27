import { Injectable, inject, signal } from '@angular/core'
import { MenuItemDirective } from './menu-item.directive'
import { MenuTriggerDirective } from './menu-trigger.directive'
import { OverlayRef } from '../overlay/overlay.model'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  readonly $items = signal<MenuItemDirective[]>([])
  readonly overlayRef = inject(OverlayRef, { optional: true })
  readonly navigate$ = new Subject<{ item: MenuItemDirective, direction: 'up' | 'down' | 'right' | 'left', event: KeyboardEvent }>()
  readonly onNavigate$ = this.navigate$.asObservable()

  get hostOverlayRef(): OverlayRef | undefined {
    return this.overlayRef?.config.data.hostOverlayRef ?? undefined
  }

  registerItem(item: MenuItemDirective): void {
    this.$items.update(items => {
      items.push(item)
      return [...items]
    })
  }

  closeOthers(hoverItem: MenuItemDirective): void {
    console.log('close')
    this.$items()
      .map(item => item.trigger)
      .filter((trigger): trigger is MenuTriggerDirective => trigger !== null)
      .filter(trigger => trigger.id !== hoverItem.trigger?.id)
      .forEach(trigger => trigger.close())
  }
}
