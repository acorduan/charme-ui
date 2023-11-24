import { Directive, HostListener, inject } from '@angular/core'
import { DialogRef } from './dialog.model'

@Directive({
  selector: '[c-dialog-close]',
  standalone: true
})
export class DialogCloseDirective {
  readonly #dialogRef = inject(DialogRef)

  @HostListener('click') onClick(): void {
    this.#dialogRef.close()
  }
}
