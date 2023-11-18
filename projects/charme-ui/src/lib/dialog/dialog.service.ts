import {

  inject,
  Injectable,
  Injector, TemplateRef,
  Type,
} from '@angular/core';
import { DialogComponent } from './dialog.component';
import { DialogConfig, DialogRef } from './dialog.model';
import { tap } from "rxjs/operators";
import { Subscription } from "rxjs";
import { OverlayService } from "../overlay/overlay.service";

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  #overlayService = inject(OverlayService)
  #dialogRefs: DialogRef[] = []

  open(component: Type<any> | TemplateRef<any>, config?: Partial< DialogConfig>): DialogRef {
    const dialogRef = new DialogRef(this.#dialogRefs.length, config)
    const dialogRefProvider = {provide: DialogRef, useValue: dialogRef}
    this.#overlayService.createOverlay<DialogComponent, DialogRef>(DialogComponent, dialogRef, [dialogRefProvider])
    this.#removeFromArrayOnDestroy(dialogRef)

    this.#dialogRefs.push(dialogRef)
    dialogRef.componentRef.instance.component = component instanceof TemplateRef ? undefined: component
    dialogRef.componentRef.instance.template = component instanceof TemplateRef ? component: undefined


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
