import { Directive, HostListener, Input, inject } from '@angular/core'
import { DialogRef } from './dialog.model'

@Directive({
  selector: '[c-dialog-close]',
  standalone: true
})
export class DialogCloseDirective {
  readonly #dialogRef = inject(DialogRef)

  @Input('c-dialog-close') data?: any

  @HostListener('click') onClick(): void {
    this.#dialogRef.close(this.data)
  }
}
