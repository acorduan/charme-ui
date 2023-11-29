import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input, OnDestroy,
  signal,
  TemplateRef
} from '@angular/core'
import { OverlayService } from '../overlay/overlay.service'
import { OverlayConfig, OverlayConfigModel, OverlayRef } from '../overlay/overlay.model'
import { TooltipComponent } from './tooltip.component'

@Directive({
  selector: '[c-tooltip]',
  standalone: true,
  host: {
    '[attr.aria-describedby]': 'tooltipId'
  }
})
export class TooltipDirective implements OnDestroy {
  tooltipId: string | undefined = undefined

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

  @Input('c-tooltip-position') position: 'top' | 'bottom' | 'right' | 'left' = 'top'

  readonly #opposite = { top: 'bottom', bottom: 'top', right: 'left', left: 'right' }

  @HostListener('mouseover') onMouseOver(): void {
    if (this.showTooltip) {
      const originPos = `${this.position}-center` as any
      const overlayPos = `${this.#opposite[this.position]}-center` as any

      this.tooltipId = `c-tooltip-${crypto.randomUUID()}`
      this.#tooltipRef?.close()
      const configModel: Partial<OverlayConfigModel> = {
        attachedTo: {
          origin: this.#elementRef,
          originPos,
          overlayPos,
          gap: 5
        },
        data: {
          element: this.$element(),
          id: this.tooltipId
        }
      }

      const config = new OverlayConfig(configModel)
      this.#tooltipRef = new OverlayRef(config)
      this.#overlay.createOverlay(TooltipComponent, this.#tooltipRef)
    }
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.tooltipId = undefined
    this.#tooltipRef?.close()
    this.#tooltipRef = undefined
  }

  ngOnDestroy(): void {
    this.#tooltipRef?.close()
  }
}
