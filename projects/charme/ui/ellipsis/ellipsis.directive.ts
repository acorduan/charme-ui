import { AfterViewInit, Directive, ElementRef, inject, OnDestroy } from '@angular/core'
import { TooltipDirective } from '@charme/ui/tooltip'

@Directive({
  selector: '[c-ellipsis]',
  standalone: true,
  host: {
    class: 'whitespace-nowrap overflow-hidden text-ellipsis'
  }
})
export class EllipsisDirective extends TooltipDirective implements AfterViewInit, OnDestroy {
  readonly #el = inject(ElementRef)
  observer: ResizeObserver | undefined

  ngAfterViewInit(): void {
    this.observer = new ResizeObserver(() => {
      this.initTooltipBehavior()
    })
    this.observer.observe(this.#el.nativeElement)
  }

  initTooltipBehavior(): void {
    if (this.#el.nativeElement.offsetWidth < this.#el.nativeElement.scrollWidth) {
      this.showTooltip = true
      this.element = this.#el.nativeElement.innerText
    } else {
      this.showTooltip = false
    }
  }

  override ngOnDestroy(): void {
    this.observer?.unobserve(this.#el.nativeElement)
    super.ngOnDestroy()
  }
}
