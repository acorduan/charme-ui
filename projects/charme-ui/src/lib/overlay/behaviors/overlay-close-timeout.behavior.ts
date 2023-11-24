import { Directive, inject, OnDestroy, OnInit } from '@angular/core'
import { OverlayRef } from '../overlay.model'

@Directive({
  standalone: true
})
export class OverlayCloseTimeoutBehavior implements OnInit, OnDestroy {
  overlayRef = inject(OverlayRef)
  #timeout: number | undefined

  ngOnInit(): void {
    this.initTimeoutClose()
  }

  private initTimeoutClose(): void {
    if (this.overlayRef.config.closeAfter !== undefined) {
      this.#timeout = setTimeout(() => this.overlayRef.close(), this.overlayRef.config.closeAfter)
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.#timeout)
  }
}
