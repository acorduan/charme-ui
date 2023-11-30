import {
  Directive,
  ElementRef,
  inject,
  Input,
  TemplateRef, Type
} from '@angular/core'
import { MenuComponent } from './menu.component'
import { C_MENU } from './menu.model'
import { BaseOverlayTrigger } from '../overlay/base-overlay-trigger'

@Directive({
  selector: '[c-menu-trigger]',
  standalone: true,
  host: {
    'aria-haspopup': 'menu',
    '[attr.aria-expanded]': '$isOpen()',
    '[attr.aria-controls]': 'id',
    type: 'button'
  }
})
export class MenuTriggerDirective extends BaseOverlayTrigger<MenuComponent> {
  readonly menu = inject(C_MENU, { optional: true })
  readonly id = `c-menu-${crypto.randomUUID()}`

  @Input('c-menu-trigger') tpl!: TemplateRef<any>

  component: Type<MenuComponent> = MenuComponent
  overlayHostEl: ElementRef | undefined = this.menu?.el
  constructor() {
    super()
    this.triggerEvent = this.hostOverlayRef !== null ? 'hover' : 'click'
    this.side = this.hostOverlayRef !== null ? 'right' : 'bottom'
    this.gap = this.hostOverlayRef !== null ? 0 : 5
  }
}
