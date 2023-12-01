import { Directive, HostListener, OnInit, inject } from '@angular/core'
import { OverlayRef } from '../overlay.model'

@Directive({
  standalone: true
})
export class OverlayClickOutsiteBehavior implements OnInit {
  overlayRef = inject(OverlayRef)
  #init = false

  @HostListener('document:click', ['$event']) onClick(event: MouseEvent): void {
    if (!this.#init) {
      return
    }

    const target = event.composedPath()[0] ?? event.target
    const containsByDialogHost: boolean = this.overlayRef.elementRef.nativeElement.contains(target)

    if (!containsByDialogHost) {
      this.overlayRef.clickOutside()
    }
  }

  ngOnInit(): void {
    setTimeout(() => this.#init = true)
  }
}
