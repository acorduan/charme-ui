import { Directive, effect, inject, signal } from '@angular/core'
import { MenuService } from './menu.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MenuNavigationEvent } from './menu.model'

@Directive({
  selector: '[c-menu]',
  standalone: true,
  providers: [MenuService]
})
export class MenuDirective {
  readonly menu = inject(MenuService)
  readonly $focusIndex = signal(0)

  constructor() {
    this.#initFocus()
    this.#manageNavigation()
  }

  #initFocus(): void {
    effect(() => {
      const items = this.menu.$items()
      const focusIndex = this.$focusIndex()
      items[focusIndex]?.el.nativeElement.focus()
    })
  }

  #manageNavigation(): void {
    this.menu.onNavigate$
      .pipe(takeUntilDestroyed())
      .subscribe((event: MenuNavigationEvent) => {
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
          if (currentItem?.trigger?.$isOpen() === false) {
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
