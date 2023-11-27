import { Directive, ElementRef, HostListener, inject, signal } from '@angular/core'
import { MenuService } from './menu.service'
import { MenuTriggerDirective } from './menu-trigger.directive'

@Directive({
  selector: '[c-menu-item]',
  standalone: true,
  host: {
    role: 'menuitem',
    class: 'justify-between',
    '[tabindex]': 'isFocus ? 0 : \'-1\''
  }
})
export class MenuItemDirective {
  readonly #menu = inject(MenuService)
  readonly trigger = inject(MenuTriggerDirective, { optional: true })
  readonly el = inject(ElementRef)
  isFocus = false

  @HostListener('focus') onFocus(): void {
    this.isFocus = true
  }

  @HostListener('focusout') onFocusOut(): void {
    this.isFocus = false
  }

  @HostListener('mouseenter') onHover(): void {
    this.#menu.closeOthers(this)
  }

  @HostListener('click', ['$event']) onClick(event: MouseEvent): void {
    this.trigger !== null ? event.stopPropagation() : this.#menu.closeOthers(this)
  }

  @HostListener('keydown.ArrowLeft', ['$event']) onArrowLeft(event: KeyboardEvent): void {
    this.#menu.navigate$.next({ item: this, direction: 'left', event })
    event.preventDefault()
  }

  @HostListener('keydown.ArrowRight', ['$event']) onArrowRight(event: KeyboardEvent): void {
    this.#menu.navigate$.next({ item: this, direction: 'right', event })
    event.preventDefault()
  }

  @HostListener('keydown.ArrowUp', ['$event']) onArrowUp(event: KeyboardEvent): void {
    this.#menu.navigate$.next({ item: this, direction: 'up', event })
    event.preventDefault()
  }

  @HostListener('keydown.ArrowDown', ['$event']) onArrowDown(event: KeyboardEvent): void {
    this.#menu.navigate$.next({ item: this, direction: 'down', event })
    event.preventDefault()
  }

  constructor() {
    this.#menu.registerItem(this)
  }
}
