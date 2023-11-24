import { DestroyRef, Directive, ElementRef, HostListener, Input, TemplateRef, inject } from '@angular/core'
import { DialogRef, DialogService } from '../dialog'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Subscription, tap } from 'rxjs'

@Directive({
  selector: '[c-menu]',
  standalone: true,
  host: {
    'aria-haspopup': 'menu',
    '[attr.aria-expanded]': 'dialogRef !== undefined'
  }
})
export class MenuDirective {
  readonly #dialog = inject(DialogService)
  readonly #el = inject(ElementRef<HTMLElement>)
  readonly #destroyRef = inject(DestroyRef)
  dialogRef: DialogRef | undefined

  @Input('c-menu') tpl!: TemplateRef<any>

  @HostListener('click') openPopover(): void {
    this.dialogRef = this.#dialog.open(this.tpl, {
      attachedTo: {
        host: this.#el,
        hostPos: 'bottomleft',
        dialogPos: 'topleft',
        gap: 5
      },
      hasBackDrop: false
    })

    const sub: Subscription = this.dialogRef.afterClosed()
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        tap(() => this.dialogRef = undefined)
      )
      .subscribe(() => sub.unsubscribe())
  }
}
