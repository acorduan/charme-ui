import { DestroyRef, Directive, ElementRef, HostListener, Input, TemplateRef, inject, signal, computed } from '@angular/core'
import { OverlayConfig, OverlayConfigModel, OverlayRef } from '../overlay/overlay.model'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Subscription, tap } from 'rxjs'
import { OverlayService } from '../overlay/overlay.service'
import { MenuComponent } from './menu.component'
import { MenuService } from './menu.service'

@Directive({
  selector: '[c-menu-trigger]',
  standalone: true,
  host: {
    'aria-haspopup': 'menu',
    '[attr.aria-expanded]': '$open()'
  }
})
export class MenuTriggerDirective {
  readonly el = inject(ElementRef)
  readonly #overlay = inject(OverlayService)
  readonly #el = inject(ElementRef<HTMLElement>)
  readonly #destroyRef = inject(DestroyRef)
  readonly host = inject(OverlayRef, { optional: true })
  readonly $overlayRef = signal<OverlayRef | undefined>(undefined)
  readonly $open = computed(() => this.$overlayRef() !== undefined)
  readonly id = `c-menu-${crypto.randomUUID()}`
  readonly #menu = inject(MenuService)

  constructor() {
    this.#menu.onCloseOthers$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.close())
  }

  triggerEvent: 'hover' | 'click' = this.host !== null ? 'hover' : 'click'

  @Input('c-menu-trigger') tpl!: TemplateRef<any>

  @HostListener('click') toggle(): void {
    !this.$open() ? this.open() : this.close()
  }

  @HostListener('mouseenter') onHover(): void {
    if (this.triggerEvent === 'hover') {
      this.open()
    }
  }

  close(): void {
    this.$overlayRef()?.close()
    this.$overlayRef.set(undefined)
  }

  open(): void {
    // settimeout to wait for others menu to be closed
    setTimeout(() => {
      const configModel: Partial<OverlayConfigModel> = {
        attachedTo: {
          host: this.#el,
          hostPos: 'bottomleft',
          dialogPos: 'topleft',
          gap: 5
        },
        closeOnClickOutside: true,
        data: {
          id: this.id,
          tpl: this.tpl
        },
        focusOriginOnClose: false,
        closeOnEscape: true,
        host: this.host?.elementRef
      }
      const config = new OverlayConfig(configModel)
      const overlayRef = new OverlayRef(config)
      this.$overlayRef.set(overlayRef)

      this.#overlay.createOverlay(MenuComponent, overlayRef)

      const sub: Subscription = overlayRef.afterClosed()
        .pipe(
          takeUntilDestroyed(this.#destroyRef),
          tap(() => this.$overlayRef.set(undefined))
        )
        .subscribe(() => sub.unsubscribe())
    })
  }
}
