import {Directive, HostListener, computed, effect, inject, forwardRef, ElementRef} from '@angular/core'
import { MenuService } from './menu.service'
import { MenuTriggerDirective } from './menu-trigger.directive'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import {CMenuBarAccessor, MenuNavigationEvent} from './menu.model'
import {C_ACCORDION_ACCESSOR} from "../accordion/accordion.model";

@Directive({
  selector: '[c-menu-bar]',
  standalone: true,
  providers: [MenuService, {
    provide: C_ACCORDION_ACCESSOR,
    useExisting: forwardRef(() => MenuBarDirective)
  }],
  host: {
    '[tabindex]': '$isMenuBarOpen() || someItemHasFocus() ? -1 : 0',
    role: 'menubar'
  }
})
export class MenuBarDirective implements  CMenuBarAccessor {
  readonly el = inject(ElementRef);
  readonly #menu = inject(MenuService)
  focusIndex = 0

  $isMenuBarOpen = computed<boolean>(() => {
    const menuItems = this.#menu.$items()
    return menuItems.some(item => item.trigger?.$isOpen())
  })

  @HostListener('focus') onFocus(): void {
    this.#menu.$items()[this.focusIndex]?.el.nativeElement.focus()
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
  }


  @HostListener('keydown.ArrowLeft', ['$event']) onArrowLeft(event: KeyboardEvent): void {
    const isMenuBarOpen = this.$isMenuBarOpen()
    this.focusIndex = ((this.focusIndex - 1) + this.#menu.$items().length) % this.#menu.$items().length
    this.#menu.closeOthers(this.#menu.$items()[this.focusIndex])
    this.#menu.$items()[this.focusIndex]?.el.nativeElement.focus()
    isMenuBarOpen && this.#menu.$items()[this.focusIndex]?.trigger?.open()
  }

  @HostListener('keydown.ArrowRight', ['$event']) onArrowRight(event: KeyboardEvent): void {
    const isMenuBarOpen = this.$isMenuBarOpen()
    this.focusIndex = (this.focusIndex + 1) % this.#menu.$items().length
    this.#menu.closeOthers(this.#menu.$items()[this.focusIndex])
    this.#menu.$items()[this.focusIndex]?.el.nativeElement.focus()
    isMenuBarOpen && this.#menu.$items()[this.focusIndex]?.trigger?.open()
  }
}
