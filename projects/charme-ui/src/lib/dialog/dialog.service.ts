import {
  inject,
  Injectable,
  TemplateRef,
  Type
} from '@angular/core'
import { DialogComponent } from './dialog.component'
import { DialogConfig, DialogRef } from './dialog.model'
import { tap } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { OverlayService } from '../overlay/overlay.service'

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  readonly #overlayService = inject(OverlayService)
  readonly #dialogRefs: DialogRef[] = []

  open(value: Type<any> | TemplateRef<any>, configModel?: Partial< DialogConfig>): DialogRef {
    const comp = { comp: value instanceof TemplateRef ? undefined : value, tpl: value instanceof TemplateRef ? value : undefined }
    const config = new DialogConfig(comp, configModel)
    const dialogRef = new DialogRef(this.#dialogRefs.length, config)
    const dialogRefProvider = { provide: DialogRef, useValue: dialogRef }
    this.#overlayService.createOverlay<DialogComponent, DialogRef>(DialogComponent, dialogRef, [dialogRefProvider])
    this.#removeFromArrayOnDestroy(dialogRef)

    this.#dialogRefs.push(dialogRef)
    return dialogRef
  }

  #removeFromArrayOnDestroy(dialogRef: DialogRef): void {
    const sub: Subscription = dialogRef.afterClosed()
      .pipe(tap(() => this.#removeFromArray(dialogRef)))
      .subscribe(() => sub.unsubscribe())
  }

  #removeFromArray(dialogRef: DialogRef): void {
    const index = this.#dialogRefs.findIndex(ref => ref.id === dialogRef.id)
    if (index !== -1) {
      this.#dialogRefs.splice(index, 1)
    }
  }
}
