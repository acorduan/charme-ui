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

    const [hostPosSide, hostPosVertice] = hostPos.split('-')
    const [dialogPosSide, dialogPosVertice] = dialogPos.split('-')

    const hostTopY = hostPosSide.includes('top') || hostPosVertice.includes('top') ? hostRect.y : undefined
    const hostBottomY = hostPosSide.includes('bottom') || hostPosVertice.includes('bottom') ? hostRect.y + hostRect.height : undefined
    const hostCenterY = hostPosSide.includes('center') || hostPosVertice.includes('center') ? hostRect.y + (hostRect.height / 2) : undefined

    const hostY = hostTopY ?? hostBottomY ?? hostCenterY

    const hostLeftX = hostPosVertice.includes('left') || hostPosSide.includes('left') ? hostRect.x : undefined
    const hostRightX = hostPosVertice.includes('right') || hostPosSide.includes('right') ? hostRect.x + hostRect.width : undefined
    const hostCenter = hostPosVertice.includes('center') || hostPosSide.includes('center') ? hostRect.x + (hostRect.width / 2) : undefined

    const hostX = hostLeftX ?? hostRightX ?? hostCenter

    const topY = dialogPosSide.includes('top') || dialogPosVertice.includes('top') ? hostY : undefined
    const bottomY = dialogPosSide.includes('bottom') || dialogPosVertice.includes('bottom') ? hostY - dialogRect.height : undefined
    const centerY = dialogPosSide.includes('center') || dialogPosVertice.includes('center') ? hostY - (dialogRect.height / 2) : undefined

    const Y = topY ?? bottomY ?? centerY

    const leftX = dialogPosVertice.includes('left') || dialogPosSide.includes('left') ? hostX : undefined
    const rightX = dialogPosVertice.includes('right') || dialogPosSide.includes('right') ? hostX - dialogRect.width : undefined
    const centerX = dialogPosVertice.includes('center') || dialogPosSide.includes('center') ? hostX - (dialogRect.width / 2) : undefined
    const X = leftX ?? rightX ?? centerX

    const gapTopY = hostPosSide.includes('top') ? (gap ?? 0) * -1 : 0
    const gapBottomY = hostPosSide.includes('bottom') ? (gap ?? 0) : 0
    const gapY = gapTopY + gapBottomY

    const gapRightX = hostPosSide.includes('left') ? (gap ?? 0) * -1 : 0
    const gapLeftX = hostPosSide.includes('right') ? (gap ?? 0) : 0
    const gapX = gapRightX + gapLeftX
    return {
      top: Y + gapY + 'px',
      left: X > 0 ? ((X + gapX) + 'px') : '10px'
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
