import { Directive, ElementRef, inject, OnInit } from '@angular/core'
import { OverlayConfig, OverlayRef } from './overlay.model'

@Directive({
  selector: '[overlay-size]',
  standalone: true
})
export class OverlaySizeDirective implements OnInit {
  elementRef = inject(ElementRef)
  overlayRef = inject(OverlayRef)

  get config(): OverlayConfig {
    return this.overlayRef.config
  }

  ngOnInit() {
    this.initSize()
  }

  initSize(): void {
    this.elementRef.nativeElement.style.width = this.config.width
    this.elementRef.nativeElement.style.height = this.config.height
    this.elementRef.nativeElement.style.minWidth = this.config.minWidth
    this.elementRef.nativeElement.style.minHeight = this.config.minHeight
  }
}
