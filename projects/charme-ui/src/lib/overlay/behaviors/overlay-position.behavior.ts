import { AfterViewInit, Directive, ElementRef, OnDestroy, inject } from '@angular/core'
import { OverlayConfig, OverlayPosition, OverlayRef } from '../overlay.model'

@Directive({
  standalone: true
})
export class OverlayPositionBehavior implements AfterViewInit, OnDestroy {
  readonly #overlayRef = inject(OverlayRef)
  readonly #elementRef = inject(ElementRef)
  #positionObserver: number | undefined

  get config(): OverlayConfig {
    return this.#overlayRef.config
  }

  ngAfterViewInit(): void {
    this.#initPosition()
    this.#initPositionObserver()
  }

  #initPosition(): void {
    if (this.config.position === undefined && this.config.attachedTo === undefined) {
      this.#elementRef.nativeElement.style.margin = 'auto'
      return
    }

    const position = this.#getPositionFromAttachedTo() ?? this.config.position

    this.#elementRef.nativeElement.style.top = position?.top
    this.#elementRef.nativeElement.style.bottom = position?.bottom
    this.#elementRef.nativeElement.style.left = position?.left
    this.#elementRef.nativeElement.style.right = position?.right
  }

  #getPositionFromAttachedTo(): OverlayPosition | undefined {
    if (this.config.attachedTo === undefined) {
      return undefined
    }

    const { host, hostPos, dialogPos, gap } = this.config.attachedTo

    const dialogRect = this.#elementRef.nativeElement.getBoundingClientRect()
    const hostRect = host.nativeElement.getBoundingClientRect()

    const hostY = hostPos.includes('top') ? hostRect.y : hostRect.y + hostRect.height
    const hostLeftX = hostPos.includes('left') ? hostRect.x : undefined
    const hostRightX = hostPos.includes('right') ? hostRect.x + hostRect.width : undefined
    const hostCenter = hostPos.includes('center') ? hostRect.x + (hostRect.width / 2) : undefined
    const hostX = hostLeftX ?? hostRightX ?? hostCenter

    const Y = dialogPos.includes('bottom') ? hostY - dialogRect.height : hostY
    const leftX = dialogPos.includes('left') ? hostX : undefined
    const rightX = dialogPos.includes('right') ? hostX - dialogRect.width : undefined
    const centerX = dialogPos.includes('center') ? hostX - (dialogRect.width / 2) : undefined
    const X = leftX ?? rightX ?? centerX

    return {
      top: Y + (gap ?? 0) + 'px',
      left: X > 0 ? (X + 'px') : '10px'
    }
  }

  #initPositionObserver(): void {
    if (this.config.attachedTo?.host !== undefined) {
      const rect = this.config.attachedTo.host.nativeElement.getBoundingClientRect()
      this.#observePosition(rect)
    }
  }

  #observePosition(rect: { x: number, y: number }): void {
    if (this.config.attachedTo?.host !== undefined) {
      const { x, y } = this.config.attachedTo.host.nativeElement.getBoundingClientRect()
      if (x !== rect.x || y !== rect.y) {
        this.#initPosition()
      }
      this.#positionObserver = window.requestAnimationFrame(() => this.#observePosition({ x, y }))
    }
  }

  #destroyObserver(): void {
    if (this.#positionObserver !== undefined) {
      window.cancelAnimationFrame(this.#positionObserver)
      this.#positionObserver = undefined
    }
  }

  ngOnDestroy(): void {
    this.#destroyObserver()
  }
}
