import {
  AfterViewInit,
  booleanAttribute,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnDestroy
} from '@angular/core'

@Directive({
  selector: '[c-ripple]',
  standalone: true
})
export class RippleDirective implements AfterViewInit, OnDestroy {
  readonly #el = inject(ElementRef)
  #rippleContainerEl!: ElementRef
  readonly #timeout: number | undefined

  @Input({ transform: booleanAttribute }) rippleContained = true
  @Input() rippleDuration = 400
  @Input({ transform: booleanAttribute }) rippleDisabled = false

  ngAfterViewInit(): void {
    this.#rippleContainerEl = new ElementRef<any>(document.createElement('span'))
    this.#rippleContainerEl.nativeElement.classList.add('c-ripple_container')
    if (this.rippleContained) {
      this.#rippleContainerEl.nativeElement.style.overflow = 'hidden'
    }
    this.#el.nativeElement.appendChild(this.#rippleContainerEl.nativeElement)
  }

  @HostListener('pointerdown', ['$event'])
  onHostElClick(event: MouseEvent) {
    if (!this.rippleDisabled) {
      event.stopPropagation()
      clearTimeout(this.#timeout)
      this.removeRippleIfExist()
      const rippleEl = this.createRippleEl(event)
      this.#rippleContainerEl.nativeElement.appendChild(rippleEl.nativeElement)
      setTimeout(() => this.removeRippleIfExist(), this.rippleDuration)
    }
  }

  private removeRippleIfExist(): void {
    const ripple = this.#el.nativeElement.getElementsByClassName('c-ripple')[0]
    if (ripple) {
      ripple.remove()
    }
  }

  private createRippleEl(event: MouseEvent): ElementRef {
    const rect = this.#el.nativeElement.getBoundingClientRect()

    const circle = document.createElement('span')
    const diameter = Math.max(rect.width, rect.height)
    const radius = diameter / 2

    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${event.clientX - rect.x - radius}px`
    circle.style.top = `${event.clientY - rect.y - radius}px`
    circle.classList.add('c-ripple');
    (circle.style as any)['animation-duration'] = `${this.rippleDuration}ms`

    return new ElementRef(circle)
  }

  ngOnDestroy() {
    clearTimeout(this.#timeout)
  }
}
