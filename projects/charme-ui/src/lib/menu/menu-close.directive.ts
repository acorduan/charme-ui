import { Directive, HostListener, Input, inject } from '@angular/core'
import { OverlayRef } from '../overlay/overlay.model'

@Directive({
  selector: '[c-menu-close]',
  standalone: true
})
export class MenuCloseDirective {
  overlayRef = inject(OverlayRef)

  @Input('c-menu-close') data?: any

  @HostListener('click') onClick(): void {
    this.overlayRef.close(this.data)
  }
}
