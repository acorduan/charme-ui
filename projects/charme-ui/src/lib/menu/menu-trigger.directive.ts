import { DestroyRef, Directive, ElementRef, HostListener, Input, TemplateRef, inject, signal, computed } from '@angular/core'
import { OverlayConfig, OverlayConfigModel, OverlayRef } from '../overlay/overlay.model'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Subscription, tap } from 'rxjs'
import { OverlayService } from '../overlay/overlay.service'
import { MenuComponent } from './menu.component'
import { MenuTriggerData } from './menu.model'
import {MenuBarDirective} from "./menu-bar.directive";

@Directive({
  selector: '[c-menu-trigger]',
  standalone: true,
  host: {
    'aria-haspopup': 'menu',
    '[attr.aria-expanded]': '$isOpen()'
  }
})
export class MenuTriggerDirective {
  readonly menuBar = inject(MenuBarDirective, {optional: true})
  readonly el = inject(ElementRef)
  readonly #overlay = inject(OverlayService)
  readonly #el = inject(ElementRef<HTMLElement>)
  readonly #destroyRef = inject(DestroyRef)
  readonly hostOverlayRef: OverlayRef | null = inject(OverlayRef, { optional: true })
  readonly $overlayRef = signal<OverlayRef | undefined>(undefined)
  readonly $isOpen = computed(() => this.$overlayRef() !== undefined)
  readonly id = `c-menu-${crypto.randomUUID()}`

  @Input() triggerEvent: 'hover' | 'click' = this.hostOverlayRef !== null ? 'hover' : 'click'

  @Input('c-menu-trigger') tpl!: TemplateRef<any>

  @HostListener('click') toggle(): void {
    this.$isOpen() ? this.close() : this.open()
  }

  @HostListener('keydown.Shift.Tab')
  @HostListener('keydown.Tab') onFocusOut(): void {
    this.close()
  }

  @HostListener('mouseenter') onHover(): void {
    this.triggerEvent === 'hover' && this.open()
  }

  open(): void {
    if (this.$overlayRef() !== undefined) {
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
        host: this.#el,
        hostPos: this.hostOverlayRef !== null ? 'right-top' : 'bottom-left',
        dialogPos: this.hostOverlayRef !== null ? 'left-top' : 'top-left',
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
      host: this.hostOverlayRef?.elementRef ?? this.menuBar?.el
    }
    return new OverlayConfig(configModel)
  }
}
