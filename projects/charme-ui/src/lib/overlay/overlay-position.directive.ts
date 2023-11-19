import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core'
import { OverlayConfig, OverlayPosition, OverlayRef } from './overlay.model'

@Directive({
  selector: '[overlay-position]',
  standalone: true
})

export class OverlayPositionDirective implements AfterViewInit {
  overlayRef = inject(OverlayRef)
  elementRef = inject(ElementRef)

  get config(): OverlayConfig {
    return this.overlayRef.config
  }

  ngAfterViewInit(): void {
    this.initPosition()
  }

  initPosition(): void {
    if (this.config.position === undefined && this.config.attachedTo === undefined) {
      this.elementRef.nativeElement.style.margin = 'auto'
      return
    }

    const position = this.getPositionFromAttachedTo() ?? this.config.position

    this.elementRef.nativeElement.style.top = position?.top
    this.elementRef.nativeElement.style.bottom = position?.bottom
    this.elementRef.nativeElement.style.left = position?.left
    this.elementRef.nativeElement.style.right = position?.right
  }

  getPositionFromAttachedTo(): OverlayPosition | undefined {
    if (this.config.attachedTo === undefined) {
      return undefined
    }

    const { host, hostPos, dialogPos, gap } = this.config.attachedTo

    const dialogRect = this.elementRef.nativeElement.getBoundingClientRect()
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
}
