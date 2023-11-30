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

    const { origin, originPos, overlayPos, gap } = this.config.attachedTo

    const overlayRect = this.#elementRef.nativeElement.getBoundingClientRect()
    const originRect = origin.nativeElement.getBoundingClientRect()

    const [originPosSide, originPosVertex] = typeof originPos === 'function' ? originPos(origin, this.#elementRef).split('-') : originPos.split('-')
    const [overlayPosSide, overlayPosVertex] = typeof overlayPos === 'function' ? overlayPos(origin, this.#elementRef).split('-') : overlayPos.split('-')

    const hostTopY = originPosSide.includes('top') || originPosVertex.includes('top') ? originRect.y : undefined
    const hostBottomY = originPosSide.includes('bottom') || originPosVertex.includes('bottom') ? originRect.y + originRect.height : undefined
    const hostCenterY = originPosSide.includes('center') || originPosVertex.includes('center') ? originRect.y + (originRect.height / 2) : undefined

    const hostY = hostTopY ?? hostBottomY ?? hostCenterY

    const hostLeftX = originPosVertex.includes('left') || originPosSide.includes('left') ? originRect.x : undefined
    const hostRightX = originPosVertex.includes('right') || originPosSide.includes('right') ? originRect.x + originRect.width : undefined
    const hostCenter = originPosVertex.includes('center') || originPosSide.includes('center') ? originRect.x + (originRect.width / 2) : undefined

    const hostX = hostLeftX ?? hostRightX ?? hostCenter

    const topY = overlayPosSide.includes('top') || overlayPosVertex.includes('top') ? hostY : undefined
    const bottomY = overlayPosSide.includes('bottom') || overlayPosVertex.includes('bottom') ? hostY - overlayRect.height : undefined
    const centerY = overlayPosSide.includes('center') || overlayPosVertex.includes('center') ? hostY - (overlayRect.height / 2) : undefined

    const Y = topY ?? bottomY ?? centerY

    const leftX = overlayPosVertex.includes('left') || overlayPosSide.includes('left') ? hostX : undefined
    const rightX = overlayPosVertex.includes('right') || overlayPosSide.includes('right') ? hostX - overlayRect.width : undefined
    const centerX = overlayPosVertex.includes('center') || overlayPosSide.includes('center') ? hostX - (overlayRect.width / 2) : undefined

    const X = leftX ?? rightX ?? centerX

    const gapTopY = originPosSide.includes('top') ? (gap ?? 0) * -1 : 0
    const gapBottomY = originPosSide.includes('bottom') ? (gap ?? 0) : 0
    const gapY = gapTopY + gapBottomY

    const gapRightX = originPosSide.includes('left') ? (gap ?? 0) * -1 : 0
    const gapLeftX = originPosSide.includes('right') ? (gap ?? 0) : 0
    const gapX = gapRightX + gapLeftX

    let insideWindowX = X + gapX

    if (insideWindowX < 0) {
      insideWindowX = 0
    }

    if (insideWindowX + overlayRect.width > innerWidth) {
      insideWindowX = innerWidth - overlayRect.width
    }

    return {
      top: Y + gapY + 'px',
      left: `${insideWindowX}px`
    }
  }

  #initPositionObserver(): void {
    if (this.config.attachedTo?.origin !== undefined) {
      const rect = this.config.attachedTo.origin.nativeElement.getBoundingClientRect()
      this.#observePosition(rect)
    }
  }

  #observePosition(rect: { x: number, y: number }): void {
    if (this.config.attachedTo?.origin !== undefined) {
      const { x, y } = this.config.attachedTo.origin.nativeElement.getBoundingClientRect()
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
