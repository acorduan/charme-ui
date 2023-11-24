import {
  AfterViewInit,
  ApplicationRef,
  DestroyRef,
  Directive, ElementRef,
  HostListener,
  inject,
  OnDestroy
} from '@angular/core'
import { DialogConfig, DialogRef } from '../dialog.model'
import { NavigationStart, Router } from '@angular/router'
import { filter, tap } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Directive({
  standalone: true
})
export class DialogCloseBehavior implements OnDestroy, AfterViewInit {
  readonly #appRef = inject(ApplicationRef)
  router = inject(Router)
  dialogRef = inject(DialogRef)
  elementRef = inject(ElementRef)
  readonly #destroyRef = inject(DestroyRef)

  @HostListener('keydown.escape') onEscapeClick(): void {
    this.dialogRef.close()
  }

  get config(): DialogConfig {
    return this.dialogRef.config
  }

  ngAfterViewInit(): void {
    this.initCloseOnNavigationRule()
    this.initCloseOnBackDropClick()
    this.initCloseOnClickOutsideClick()
    this.initFadeout()
  }

  private initCloseOnClickOutsideClick(): void {
    if (this.config.closeOnClickOutside) {
      this.dialogRef.onClickOutside()
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe(() => this.dialogRef.close())
    }
  }

  private initCloseOnBackDropClick(): void {
    const { hasBackDrop, closeOnBackdropClick } = this.dialogRef.config
    if (hasBackDrop && closeOnBackdropClick) {
      this.dialogRef.onBackDropClick()
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe(() => this.dialogRef.close())
    }
  }

  private initFadeout(): void {
    const sub: Subscription = this.dialogRef.afterClosed()
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        tap(() => this.fadeOut())
      )
      .subscribe(() => sub.unsubscribe())
  }

  private initCloseOnNavigationRule(): void {
    if (this.dialogRef.config.closeOnNavigation) {
      this.router.events
        .pipe(filter(event => event instanceof NavigationStart))
        .subscribe(() => this.dialogRef.close())
    }
  }

  private fadeOut(): void {
    const dialogElement = this.elementRef.nativeElement
    const overlayElement = this.dialogRef.backdropEl?.nativeElement

    dialogElement.classList.remove('animate-dialog-open')
    overlayElement?.classList.remove('animate-dialog-overlay-open')

    dialogElement.classList.add('animate-dialog-close')
    overlayElement?.classList.add('animate-dialog-overlay-close')
  }

  ngOnDestroy(): void {
    if (this.dialogRef.originElement instanceof HTMLElement) {
      this.dialogRef.originElement.focus()
    }
  }
}
