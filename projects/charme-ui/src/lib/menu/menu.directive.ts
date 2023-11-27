import { Directive, effect, inject, signal } from '@angular/core'
import { MenuService } from './menu.service'

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
  }
}
