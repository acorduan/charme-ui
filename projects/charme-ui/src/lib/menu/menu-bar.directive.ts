import { AfterViewChecked, AfterViewInit, Directive, HostListener, computed, effect, inject } from '@angular/core'
import { MenuService } from './menu.service'
import { MenuTriggerDirective } from './menu-trigger.directive'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MenuItemDirective } from './menu-item.directive'

@Directive({
  selector: '[c-menu-bar]',
  standalone: true,
  providers: [MenuService],
  host: {
    '[tabindex]': '$isMenuBarOpen() || someItemHasFocus() ? -1 : 0'
  }
})
export class MenuBarDirective {
  readonly #menu = inject(MenuService)
  focusIndex = 0

  $isMenuBarOpen = computed<boolean>(() => {
    const menuItems = this.#menu.$items()
    if (menuItems === undefined || menuItems.length === 0) {
      return false
    }

    return menuItems.some(item => item.trigger?.$isOpen())
  })

  @HostListener('focus') onFocus(): void {
    this.#menu.$items()[this.focusIndex]?.el.nativeElement.focus()
  }

  @HostListener('focusout') onFocusOut(): void {
  }

  someItemHasFocus(): boolean {
    return this.#menu.$items().some(item => item.isFocus)
  }

  constructor() {
    effect(() => {
      const isMenuBarOpen = this.$isMenuBarOpen()
      const triggers = this.#menu.$items()
        .map(item => item.trigger)
        .filter((item): item is MenuTriggerDirective => item !== null)
      triggers.forEach(item => item.triggerEvent = isMenuBarOpen ? 'hover' : 'click')
    })

    effect(() => {
      const isMenuBarOpen = this.$isMenuBarOpen()
      if (!isMenuBarOpen) {
        this.#menu.$items()[this.focusIndex]?.el.nativeElement.focus()
      }
    })

    this.#manageNavigation()
  }

  #manageNavigation(): void {
    this.#menu.onNavigate$
      .pipe(takeUntilDestroyed())
      .subscribe((event: { item: MenuItemDirective, direction: 'up' | 'down' | 'left' | 'right' }) => {
        const isMenuBarOpen = this.$isMenuBarOpen()

        if (event.direction === 'right') {
          this.focusIndex = (this.focusIndex + 1) % this.#menu.$items().length
          this.#menu.closeOthers(this.#menu.$items()[this.focusIndex])
          this.#menu.$items()[this.focusIndex]?.el.nativeElement.focus()
          isMenuBarOpen && this.#menu.$items()[this.focusIndex]?.trigger?.open()
        }

        if (event.direction === 'left') {
          this.focusIndex = ((this.focusIndex - 1) + this.#menu.$items().length) % this.#menu.$items().length
          this.#menu.closeOthers(this.#menu.$items()[this.focusIndex])
          this.#menu.$items()[this.focusIndex]?.el.nativeElement.focus()
          isMenuBarOpen && this.#menu.$items()[this.focusIndex]?.trigger?.open()
        }
      })
  }
}
