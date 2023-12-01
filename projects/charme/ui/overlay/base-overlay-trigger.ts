import {
  computed,
  DestroyRef,
  Directive,
  ElementRef,
  HostListener,
  inject, Input, Provider,
  signal,
  TemplateRef,
  Type
} from '@angular/core'
import { OverlayService } from './overlay.service'
import { AttachedToPosition, OverlayConfig, OverlayConfigModel, OverlayRef } from './overlay.model'
import { Subscription, tap } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

export interface OverlayComp {
  data: { id: string, tpl: TemplateRef<any>, hostOverlayRef: OverlayRef | null }
}

export type Side = 'top' | 'bottom' | 'left' | 'right'
export type Align = 'start' | 'end'

@Directive()
export abstract class BaseOverlayTrigger<TComp extends OverlayComp = any> {
  readonly #overlay = inject(OverlayService)
  readonly hostOverlayRef = inject(OverlayRef, { optional: true })
  readonly #el = inject(ElementRef<HTMLElement>)
  readonly #destroyRef = inject(DestroyRef)
  readonly $overlayRef = signal<OverlayRef | undefined>(undefined)
  readonly $isOpen = computed(() => this.$overlayRef() !== undefined)

  abstract id: string
  abstract component: Type<TComp>
  abstract tpl: TemplateRef<any>
  @Input() triggerEvent: 'hover' | 'click' = 'click'
  @Input() overlayPos: AttachedToPosition | undefined
  @Input() originPos: AttachedToPosition | undefined
  @Input() side: Side = 'bottom'
  @Input() align: Align = 'start'
  @Input() gap = 5 // px
  providers: Provider[] = []

  abstract overlayHostEl?: ElementRef | undefined

  @HostListener('click') toggle(): void {
    this.$isOpen() ? this.close() : this.open()
  }

  @HostListener('mouseenter') onHover(): void {
    this.triggerEvent === 'hover' && this.open()
  }

  open(): void {
    if (this.$isOpen()) {
      return
    }

    const overlayRef = new OverlayRef(this.#getConfig())
    this.$overlayRef.set(overlayRef)
    this.#overlay.createOverlay(this.component, overlayRef, this.providers)
    this.#manageCloseEvent(overlayRef)
  }

  close(): void {
    this.$overlayRef()?.close()
    this.$overlayRef.set(undefined)
  }

  #manageCloseEvent(ref: OverlayRef): void {
    const sub: Subscription = ref.afterClosed()
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        tap(() => this.$overlayRef.set(undefined))
      )
      .subscribe(() => sub.unsubscribe())
  }

  #getConfig(): OverlayConfig {
    const configModel: Partial<OverlayConfigModel> = {

      attachedTo: {
        origin: this.#el,
        originPos: (_, overlayEl) => this.calcPos(overlayEl).originPos,
        overlayPos: (_, overlayEl) => this.calcPos(overlayEl).overlayPos,
        gap: this.gap
      },
      closeOnClickOutside: true,
      data: {
        id: this.id,
        tpl: this.tpl,
        hostOverlayRef: this.hostOverlayRef
      },
      focusOriginOnClose: true,
      closeOnEscape: true,
      host: this.overlayHostEl
    }
    return new OverlayConfig(configModel)
  }

  calcPos(overlayEl: ElementRef<HTMLElement>, inverse = false): { originPos: AttachedToPosition, overlayPos: AttachedToPosition } {
    const originRect: DOMRect = this.#el.nativeElement.getBoundingClientRect()
    const overlayRect: DOMRect = overlayEl.nativeElement.getBoundingClientRect()
    const side = this.getCalcSide(originRect, overlayRect)
    const align = this.getCalcAlign(originRect, overlayRect)

    const originPos = this.getOriginPos(side, align)
    const overlayPos = this.getOverlayPos(side, align)
    return { originPos, overlayPos }
  }

  getOriginPos(side: Side, align: Align): AttachedToPosition {
    if ((side === 'top' && align === 'start') || (side === 'left' && align === 'start')) {
      return 'top-left'
    }

    if ((side === 'top' && align === 'end') || (side === 'right' && align === 'start')) {
      return 'top-right'
    }

    if ((side === 'left' && align === 'end') || (side === 'bottom' && align === 'start')) {
      return 'bottom-left'
    }

    if ((side === 'right' && align === 'end') || (side === 'bottom' && align === 'end')) {
      return 'bottom-right'
    }

    return 'bottom-left'
  }

  getOverlayPos(side: Side, align: Align): AttachedToPosition {
    if ((side === 'right' && align === 'start') || (side === 'bottom' && align === 'start')) {
      return 'top-left'
    }

    if ((side === 'bottom' && align === 'end') || (side === 'left' && align === 'start')) {
      return 'top-right'
    }

    if ((side === 'top' && align === 'start') || (side === 'right' && align === 'end')) {
      return 'bottom-left'
    }

    if ((side === 'left' && align === 'end') || (side === 'top' && align === 'end')) {
      return 'bottom-right'
    }

    return 'top-left'
  }

  getCalcSide(originRect: DOMRect, overlayRect: DOMRect): Side {
    if (this.side === 'right' && (originRect.x + originRect.width + overlayRect.width) > window.innerWidth) {
      return 'left'
    }

    if (this.side === 'left' && (originRect.x - overlayRect.width) < 0) {
      return 'right'
    }

    if (this.side === 'top' && (originRect.y - overlayRect.height) < 0) {
      return 'bottom'
    }

    if (this.side === 'bottom' && (originRect.y + originRect.height + overlayRect.height) > window.innerHeight) {
      return 'top'
    }

    return this.side
  }

  getCalcAlign(originRect: DOMRect, overlayRect: DOMRect): Align {
    if (this.align === 'start' && (this.side === 'top' || this.side === 'bottom') && (originRect.x + overlayRect.width) > window.innerWidth) {
      return 'end'
    }

    if (this.align === 'end' && (this.side === 'top' || this.side === 'bottom') && ((originRect.x + originRect.width) - overlayRect.width) < 0) {
      return 'start'
    }

    if (this.align === 'start' && (this.side === 'left' || this.side === 'right') && (originRect.y + overlayRect.height) > window.innerHeight) {
      return 'end'
    }

    if (this.align === 'end' && (this.side === 'left' || this.side === 'right') && ((originRect.y + originRect.height) - overlayRect.height) < 0) {
      return 'start'
    }

    return this.align
  }
}
