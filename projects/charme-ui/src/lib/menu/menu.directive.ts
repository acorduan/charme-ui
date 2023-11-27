import { Directive, effect, inject, signal } from '@angular/core'
import { MenuService } from './menu.service'
import { MenuItemDirective } from './menu-item.directive'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Directive({
  selector: '[c-menu]',
  standalone: true,
  providers: [MenuService]
})
export class MenuDirective {
  readonly menu = inject(MenuService)
  readonly $focusIndex = signal(0)

  constructor() {
    effect(() => {
      const items = this.menu.$items()
      const focusIndex = this.$focusIndex()
      items[focusIndex]?.el.nativeElement.focus()
    })

    this.#manageNavigation()
  }

  #manageNavigation(): void {
    this.menu.onNavigate$
      .pipe(takeUntilDestroyed())
      .subscribe((event: { item: MenuItemDirective, direction: 'up' | 'down' | 'left' | 'right', event: KeyboardEvent }) => {
        if (event.direction === 'down') {
          const newIndex = (this.$focusIndex() + 1) % this.menu.$items().length
          this.$focusIndex.set(newIndex)
        }

        if (event.direction === 'up') {
          const newIndex = ((this.$focusIndex() - 1) + this.menu.$items().length) % this.menu.$items().length
          this.$focusIndex.set(newIndex)
        }

        if (event.direction === 'right') {
          const currentItem = this.menu.$items()[this.$focusIndex()]
          if (currentItem !== undefined && currentItem.trigger !== null && !currentItem.trigger.$isOpen()) {
            currentItem.trigger.open()
            event.event.stopPropagation()
          }
        }

        if (event.direction === 'left') {
          if (this.menu.hostOverlayRef !== undefined && this.menu.overlayRef !== null) {
            this.menu.overlayRef.close()
            event.event.stopPropagation()
          }
        }
      })
  }
}
