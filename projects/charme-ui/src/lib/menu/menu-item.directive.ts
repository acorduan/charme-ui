import { Directive, HostListener, inject } from '@angular/core'
import { MenuService } from './menu.service'

@Directive({
  selector: '[c-menu-item]',
  standalone: true,
  host: {
    role: 'menuitem',
    class: 'justify-between'
  }
})
export class MenuItemDirective {
  readonly #menu = inject(MenuService)

  @HostListener('mouseenter') onHover(): void {
    this.#menu.closeOthers$.next()
  }
}
