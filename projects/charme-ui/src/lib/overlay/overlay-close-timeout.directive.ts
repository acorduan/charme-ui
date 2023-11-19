import { Directive, inject, OnDestroy, OnInit } from '@angular/core'
import { OverlayRef } from '../overlay/overlay.model'

@Directive({
  selector: '[overlay-close-timeout]',
  standalone: true
})
export class OverlayCloseTimeoutDirective implements OnInit, OnDestroy {
  overlayRef = inject(OverlayRef)
  #timeout: number | undefined

  ngOnInit(): void {
    this.initTimeoutClose()
  }

  private initTimeoutClose(): void {
    if (this.overlayRef.config.duration !== undefined) {
      this.#timeout = setTimeout(() => this.overlayRef.close(), this.overlayRef.config.duration)
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.#timeout)
  }
}
