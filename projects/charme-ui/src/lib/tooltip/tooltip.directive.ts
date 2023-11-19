import {
  Directive,
  ElementRef, HostBinding,
  HostListener,
  inject,
  Input, OnDestroy,
  signal,
  TemplateRef
} from '@angular/core'
import { OverlayService } from '../overlay/overlay.service'
import { OverlayConfig, OverlayRef } from '../overlay/overlay.model'
import { TooltipComponent } from './tooltip.component'

@Directive({
  selector: '[c-tooltip]',
  standalone: true
})
export class TooltipDirective implements OnDestroy {
  @HostBinding('attr.aria-describedby') describedby: string | undefined = undefined

  #tooltipRef: OverlayRef | undefined
  readonly #elementRef = inject(ElementRef)
  readonly #overlay = inject(OverlayService)

  $element = signal<undefined | TemplateRef<any> | string>(undefined)
  @Input('c-tooltip') set element(value: string | TemplateRef<any>) {
    this.$element.set(value)
  }

  $showTooltip = signal(true)
  @Input('c-show-tooltip') set showTooltip(value: boolean) {
    this.$showTooltip.set(value)
  }

  get showTooltip(): boolean {
    return this.$showTooltip()
  }

  @Input('c-tooltip-position') position: 'top' | 'bottom' = 'top'

  @HostListener('mouseover') onMouseOver(): void {
    if (this.showTooltip) {
      const hostPos = this.position === 'top' ? 'topcenter' : 'bottomcenter'
      const dialogPos = this.position === 'top' ? 'bottomcenter' : 'topcenter'
      const gap = this.position === 'top' ? -5 : 5 // px

      this.describedby = `c-tooltip-${crypto.randomUUID()}`
      this.#tooltipRef?.close()
      const config: OverlayConfig = {
        attachedTo: {
          host: this.#elementRef,
          hostPos,
          dialogPos,
          gap
        },
        data: {
          element: this.$element(),
          id: this.describedby
        }
      }
      this.#tooltipRef = new OverlayRef(config)
      this.#overlay.createOverlay(TooltipComponent, this.#tooltipRef)
    }
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.describedby = undefined
    this.#tooltipRef?.close()
    this.#tooltipRef = undefined
  }

  ngOnDestroy() {
    this.#tooltipRef?.close()
  }
}
