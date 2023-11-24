import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core'

@Directive({
  selector: '[positionObserver]',
  standalone: true
})
export class PositionObserverDirective implements OnDestroy {
  #positionObserver: number | undefined

  @Output() positionObserver = new EventEmitter<{ x: number, y: number }>()

  constructor(private readonly el: ElementRef) {
    this.createObserver()
  }

  private createObserver(): void {
    const rect = this.el.nativeElement.getBoundingClientRect()
    this.#positionObserver = window.requestAnimationFrame(() => this.#observePosition(rect))
  }

  #observePosition(rect: { x: number, y: number }): void {
    if (this.positionObserver !== undefined) {
      const newRect = this.el.nativeElement.getBoundingClientRect()
      if (newRect.x !== rect.x || newRect.y !== rect.y) {
        this.positionObserver.next(newRect)
      }
      this.#positionObserver = window.requestAnimationFrame(() => this.#observePosition(newRect))
    }
  }

  private destroyObserver(): void {
    if (this.#positionObserver !== undefined) {
      window.cancelAnimationFrame(this.#positionObserver)
      this.#positionObserver = undefined
    }
  }

  ngOnDestroy(): void {
    this.destroyObserver()
  }
}
