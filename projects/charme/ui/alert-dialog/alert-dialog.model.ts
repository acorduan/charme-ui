import { Observable } from 'rxjs'
import { AlertDialogComponent } from './alert-dialog.component'
import { ComponentRef } from '@angular/core'
import { OverlayRef } from '@charme/ui/overlay'

export class AlertDialogRef extends OverlayRef {
  #onAction$!: Observable<void>
  #compRef!: ComponentRef<AlertDialogComponent>

  override set componentRef(value: ComponentRef<AlertDialogComponent>) {
    this.#compRef = value
    this.#onAction$ = this.componentRef.instance.actionClick.asObservable()
  }

  override get componentRef(): ComponentRef<AlertDialogComponent> {
    return this.#compRef
  }

  onAction$(): Observable<void> {
    return this.#onAction$
  }
}
