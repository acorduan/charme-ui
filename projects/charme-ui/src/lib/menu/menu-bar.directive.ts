import { ContentChildren, Directive, QueryList, computed, effect, signal } from '@angular/core'
import { MenuTriggerDirective } from './menu-trigger.directive'
import { MenuService } from './menu.service'

@Directive({
  selector: '[c-menu-bar]',
  standalone: true,
  providers: [MenuService]
})
export class MenuBarDirective {
  $menuItems = signal<undefined | QueryList<MenuTriggerDirective> >(undefined)
  @ContentChildren(MenuTriggerDirective) set menItems(value: QueryList<MenuTriggerDirective>) {
    this.$menuItems.set(value)
  }

  $openedMenu = computed<MenuTriggerDirective | undefined>(() => {
    const menuItems = this.$menuItems()
    if (menuItems === undefined) {
      return undefined
    }

    return menuItems.find(item => item.$open())
  })

  constructor() {
    effect(() => {
      const isMenuBarOpen = this.$openedMenu() !== undefined
      this.$menuItems()?.forEach(item => item.triggerEvent = isMenuBarOpen ? 'hover' : 'click')
    })
  }
}
