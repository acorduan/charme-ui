import { Directive, computed, effect, inject } from '@angular/core'
import { MenuService } from './menu.service'
import { MenuTriggerDirective } from './menu-trigger.directive'

@Directive({
  selector: '[c-menu-bar]',
  standalone: true,
  providers: [MenuService]
})
export class MenuBarDirective {
  readonly #menu = inject(MenuService)

  $isMenuBarOpen = computed<boolean>(() => {
    const menuItems = this.#menu.$items()
    if (menuItems === undefined || menuItems.length === 0) {
      return false
    }

    return menuItems.some(item => item.trigger?.$isOpen())
  })

  constructor() {
    effect(() => {
      const isMenuBarOpen = this.$isMenuBarOpen()
      const triggers = this.#menu.$items()
        .map(item => item.trigger)
        .filter((item): item is MenuTriggerDirective => item !== null)
      triggers.forEach(item => item.triggerEvent = isMenuBarOpen ? 'hover' : 'click')
    })
  }
}
