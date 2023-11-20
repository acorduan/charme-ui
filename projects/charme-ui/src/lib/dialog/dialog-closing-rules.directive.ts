import {
  AfterViewInit,
  ApplicationRef,
  DestroyRef,
  Directive, ElementRef,
  HostListener,
  inject,
  OnDestroy
} from '@angular/core'
import { DialogRef } from './dialog.model'
import { NavigationStart, Router } from '@angular/router'
import { filter, tap } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Directive({
  selector: '[dialog-closing-rules]',
  standalone: true
})
export class DialogClosingRulesDirective implements OnDestroy, AfterViewInit {
  readonly #appRef = inject(ApplicationRef)
  router = inject(Router)
  dialogRef = inject(DialogRef)
  elementRef = inject(ElementRef)
  readonly #destroyRef = inject(DestroyRef)

  @HostListener('keydown.escape') onEscapeClick(): void {
    this.dialogRef.close()
  }

  ngAfterViewInit(): void {
    this.initCloseOnNavigationRule()
    this.initCloseOnOverlayClick()
    this.initFadeout()
  }

  private close(): void {
    this.dialogRef.close()
  }

  private initCloseOnOverlayClick(): void {
    const { hasBackDrop, closeOnBackdropClick } = this.dialogRef.config
    const backdropEl = this.dialogRef.backdropEl?.nativeElement
    if (hasBackDrop && closeOnBackdropClick && (backdropEl != null)) {
      backdropEl.addEventListener('click', this.close.bind(this))
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
        .subscribe(() => this.close())
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
    if (this.dialogRef.backdropEl != null) {
      this.dialogRef.backdropEl.nativeElement.removeEventListener('click', this.close)
    }

    if (this.dialogRef.originElement instanceof HTMLElement) {
      this.dialogRef.originElement.focus()
    }
  }
}
