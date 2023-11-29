import {
  computed,
  DestroyRef,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  signal,
  TemplateRef
} from '@angular/core'
import { AttachedToPosition, OverlayConfig, OverlayConfigModel, OverlayRef } from '../overlay/overlay.model'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Subscription, tap } from 'rxjs'
import { OverlayService } from '../overlay/overlay.service'
import { MenuComponent } from './menu.component'
import { C_MENU, MenuTriggerData } from './menu.model'

@Directive({
  selector: '[c-menu-trigger]',
  standalone: true,
  host: {
    'aria-haspopup': 'menu',
    '[attr.aria-expanded]': '$isOpen()',
    '[attr.aria-control]': 'id',
    type: 'button'
  }
})
export class MenuTriggerDirective {
  readonly menu = inject(C_MENU, { optional: true })
  readonly #overlay = inject(OverlayService)
  readonly #el = inject(ElementRef<HTMLElement>)
  readonly #destroyRef = inject(DestroyRef)
  readonly hostOverlayRef: OverlayRef | null = inject(OverlayRef, { optional: true })
  readonly $overlayRef = signal<OverlayRef | undefined>(undefined)
  readonly $isOpen = computed(() => this.$overlayRef() !== undefined)
  readonly id = `c-menu-${crypto.randomUUID()}`

  @Input() triggerEvent: 'hover' | 'click' = this.hostOverlayRef !== null ? 'hover' : 'click'

  @Input() overlayPos: AttachedToPosition | undefined
  @Input() originPos: AttachedToPosition | undefined

  @Input('c-menu-trigger') tpl!: TemplateRef<any>

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
    this.#overlay.createOverlay(MenuComponent, overlayRef)
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

  #getConfig(): OverlayConfig<MenuTriggerData> {
    const configModel: Partial<OverlayConfigModel<MenuTriggerData>> = {
      attachedTo: {
        origin: this.#el,
        originPos: (_, overlayEl) => this.calcPos(overlayEl),
        overlayPos: (_, overlayEl) => this.calcPos(overlayEl, true),
        gap: this.hostOverlayRef !== null ? 0 : 5
      },
      closeOnClickOutside: true,
      data: {
        id: this.id,
        tpl: this.tpl,
        hostOverlayRef: this.hostOverlayRef
      },
      focusOriginOnClose: true,
      closeOnEscape: true,
      host: this.menu?.el
    }
    return new OverlayConfig(configModel)
  }

  calcPos(overlayEl: ElementRef<HTMLElement>, inverse = false): AttachedToPosition {
    if (this.originPos !== undefined) {
      return this.originPos
    }

    let x: 'left' | 'right' = 'right'
    let y: 'top' | 'bottom' = 'top'

    const originRect: DOMRect = this.#el.nativeElement.getBoundingClientRect()
    const overlayRect: DOMRect = overlayEl.nativeElement.getBoundingClientRect()

    const originX = this.hostOverlayRef !== null ? originRect.x + originRect.width : originRect.x
    const originY = this.hostOverlayRef !== null ? originRect.y : originRect.y + originRect.height

    if ((originX + overlayRect.width) > window.innerWidth) {
      x = 'left'
    }

    if ((originY + overlayRect.height) > window.innerHeight) {
      y = 'bottom'
    }

    x = inverse ? (this.hostOverlayRef !== null ? this.xOpposite(x) : x) : x
    y = inverse ? (this.hostOverlayRef !== null ? y : this.yOpposite(y)) : y

    return this.hostOverlayRef !== null ? `${x}-${y}` : `${this.yOpposite(y)}-${this.xOpposite(x)}`
  }

  xOpposite(x: 'left' | 'right'): 'left' | 'right' {
    return x === 'left' ? 'right' : 'left'
  }

  yOpposite(y: 'top' | 'bottom'): 'top' | 'bottom' {
    return y === 'top' ? 'bottom' : 'top'
  }
}
