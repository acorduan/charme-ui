import { DestroyRef, Injectable, inject, signal } from '@angular/core'
import { MenuItemDirective } from './menu-item.directive'
import { MenuTriggerDirective } from './menu-trigger.directive'
import { OverlayConfig, OverlayRef } from '../overlay/overlay.model'
import { filter } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MenuTriggerData } from './menu.model'

interface CloseOpts { recursive: boolean }

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  readonly $items = signal<MenuItemDirective[]>([])
  readonly #overlayRef = inject(OverlayRef, { optional: true })
  readonly #destroyRef = inject(DestroyRef)

  constructor() {
    this.#manageRecursiveClose()
  }

  registerItem(item: MenuItemDirective): void {
    this.$items.update(items => {
      items.push(item)
      return [...items]
    })
  }

  onItemHover(hoverItem: MenuItemDirective): void {
    this.$items()
      .map(item => item.trigger)
      .filter((trigger): trigger is MenuTriggerDirective => trigger !== null)
      .filter(trigger => trigger.id !== hoverItem.trigger?.id)
      .forEach(trigger => trigger.close())
  }

  onItemClick(clickItem: MenuItemDirective): void {
    if (clickItem.trigger === null && this.#overlayRef !== null) {
      this.#overlayRef.close({ recursive: true })
    }
  }

  #manageRecursiveClose(): void {
    if (this.#overlayRef === null) {
      return
    }

    const config: OverlayConfig<MenuTriggerData> = this.#overlayRef.config
    const hostRef = config.data.hostOverlayRef

    if (hostRef === null || hostRef === undefined) {
      return
    }

    this.#overlayRef.afterClosed()
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        filter((opts?: CloseOpts) => opts?.recursive === true))
      .subscribe(() => setTimeout(() => hostRef.close({ recursive: true })))
  }
}
