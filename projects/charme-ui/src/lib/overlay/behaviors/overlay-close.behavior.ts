import {
  AfterViewInit,
  ApplicationRef,
  DestroyRef,
  Directive, ElementRef,
  HostListener,
  inject,
  OnDestroy
} from '@angular/core'
import { OverlayConfig, OverlayRef } from '../overlay.model'
import { NavigationStart, Router } from '@angular/router'
import { filter, tap } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Directive({
  standalone: true
})
export class OverlayCloseBehavior implements OnDestroy, AfterViewInit {
  readonly #appRef = inject(ApplicationRef)
  readonly router = inject(Router)
  readonly overlayRef: OverlayRef<OverlayConfig> = inject(OverlayRef)
  readonly elementRef = inject(ElementRef)
  readonly #destroyRef = inject(DestroyRef)
  #timeout: number | undefined

  @HostListener('keydown.escape') onEscapeClick(): void {
    if (this.config.closeOnEscape) {
      this.overlayRef.close()
    }
  }

  get config(): OverlayConfig {
    return this.overlayRef.config
  }

  ngAfterViewInit(): void {
    this.#initCloseOnNavigationRule()
    this.#initCloseOnBackDropClick()
    this.#initCloseOnClickOutsideClick()
    this.#initFadeout()
    this.#initCloseAfter()
  }

  #initCloseAfter(): void {
    if (this.overlayRef.config.closeAfter !== undefined) {
      this.#timeout = setTimeout(() => this.overlayRef.close(), this.overlayRef.config.closeAfter)
    }
  }

  #initCloseOnClickOutsideClick(): void {
    if (this.config.closeOnClickOutside) {
      this.overlayRef.onClickOutside()
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe(() => this.overlayRef.close())
    }
  }

  #initCloseOnBackDropClick(): void {
    const { hasBackDrop, closeOnBackdropClick } = this.overlayRef.config
    if (hasBackDrop && closeOnBackdropClick) {
      this.overlayRef.onBackDropClick()
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe(() => this.overlayRef.close())
    }
  }

  #initFadeout(): void {
    const sub: Subscription = this.overlayRef.afterClosed()
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        tap(() => this.#fadeOut())
      )
      .subscribe(() => sub.unsubscribe())
  }

  #initCloseOnNavigationRule(): void {
    if (this.overlayRef.config.closeOnNavigation) {
      this.router.events
        .pipe(
          takeUntilDestroyed(this.#destroyRef),
          filter(event => event instanceof NavigationStart)
        )
        .subscribe(() => this.overlayRef.close())
    }
  }

  #fadeOut(): void {
    const dialogElement = this.elementRef.nativeElement
    const overlayElement = this.overlayRef.backdropEl?.nativeElement

    dialogElement.classList.remove('animate-dialog-open')
    overlayElement?.classList.remove('animate-dialog-overlay-open')

    dialogElement.classList.add('animate-dialog-close')
    overlayElement?.classList.add('animate-dialog-overlay-close')
  }

  ngOnDestroy(): void {
    if (this.overlayRef.originElement instanceof HTMLElement && this.config.focusOriginOnClose) {
      this.overlayRef.originElement.focus()
    }
    clearTimeout(this.#timeout)
  }
}
