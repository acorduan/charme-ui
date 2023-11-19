import { OverlayConfig, OverlayRef } from '../overlay/overlay.model'
import { Observable } from 'rxjs'
import { AlertDialogComponent } from './alert-dialog.component'
import { ComponentRef } from '@angular/core'

export class AlertDialogRef extends OverlayRef {
  #onAction$!: Observable<void>
  #compRef!: ComponentRef<AlertDialogComponent>

  constructor (config?: OverlayConfig) {
    super(config)
  }

  override set componentRef (value: ComponentRef<AlertDialogComponent>) {
    this.#compRef = value
    this.#onAction$ = this.componentRef.instance.actionClick.asObservable()
  }

  override get componentRef (): ComponentRef<AlertDialogComponent> {
    return this.#compRef
  }

  onAction$ (): Observable<void> {
    return this.#onAction$
  }
}
