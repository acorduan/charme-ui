import { Directive, ElementRef, HostListener, inject, signal } from '@angular/core'
import { MenuService } from './menu.service'
import { MenuTriggerDirective } from './menu-trigger.directive'

@Directive({
  selector: '[c-menu-item]',
  standalone: true,
  host: {
    role: 'menuitem',
    class: 'justify-between',
    '[tabindex]': 'tabindex'
  }
})
export class MenuItemDirective {
  readonly #menu = inject(MenuService)
  readonly trigger = inject(MenuTriggerDirective, { optional: true })
  readonly el = inject(ElementRef)
  readonly $isFocus = signal(false)
  tabindex: '-1' | '0' = '-1'

  @HostListener('focus') onFocus(): void {
    this.$isFocus.set(true)
  }

  @HostListener('focusout') onFocusOut(): void {
    this.$isFocus.set(false)
  }

  @HostListener('mouseenter') onHover(): void {
    this.#menu.onItemHover(this)
  }

  @HostListener('click') onClick(): void {
    this.#menu.onItemClick(this)
  }

  constructor() {
    this.#menu.registerItem(this)
  }
}
