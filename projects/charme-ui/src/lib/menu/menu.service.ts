import {inject, signal, Directive, ElementRef} from '@angular/core'
import { MenuItemDirective } from './menu-item.directive'
import { MenuTriggerDirective } from './menu-trigger.directive'
import { OverlayRef } from '../overlay/overlay.model'
import {CMenuAccessor} from "./menu.model";


@Directive()
export class MenuContainer implements CMenuAccessor {
  readonly el = inject(ElementRef);
  readonly $items = signal<MenuItemDirective[]>([])
  readonly overlayRef = inject(OverlayRef, { optional: true })

  registerItem(item: MenuItemDirective): void {
    this.$items.update(items => {
      items.push(item)
      return [...items]
    })
  }

  get hostOverlayRef(): OverlayRef | undefined {
    return this.overlayRef?.config.data.hostOverlayRef ?? undefined
  }

  closeOthers(hoverItem: MenuItemDirective): void {
    this.$items()
      .map(item => item.trigger)
      .filter((trigger): trigger is MenuTriggerDirective => trigger !== null)
      .filter(trigger => trigger.id !== hoverItem.trigger?.id)
      .forEach(trigger => trigger.close())
  }
}
