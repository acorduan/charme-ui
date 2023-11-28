import { Directive, ElementRef, HostListener, inject } from '@angular/core'
import { MenuTriggerDirective } from '../menu-trigger.directive'
import { C_MENU } from '../menu.model'
import { OverlayRef } from '../../overlay/overlay.model'

@Directive({
  selector: '[c-menu-item]',
  standalone: true,
  host: {
    role: 'menuitem',
    class: 'justify-between',
    '[tabindex]': 'isFocus ? 0 : \'-1\'',
    type: 'button'
  }
})
export class MenuItemDirective {
  readonly menu = inject(C_MENU, { optional: true })
  readonly trigger = inject(MenuTriggerDirective, { optional: true })
  readonly overlayRef = inject(OverlayRef, { optional: true })

  readonly el = inject(ElementRef)
  isFocus = false

  @HostListener('focus') onFocus(): void {
    this.isFocus = true
  }

  @HostListener('focusout') onFocusOut(): void {
    this.isFocus = false
  }

  @HostListener('mouseenter') onHover(): void {
    this.menu?.closeOthers(this)
  }

  @HostListener('click', ['$event']) onClick(event: MouseEvent): void {
    this.el.nativeElement.focus()
    this.trigger === null && this.overlayRef?.close()
  }

  constructor() {
    this.menu?.registerItem(this)
  }
}
