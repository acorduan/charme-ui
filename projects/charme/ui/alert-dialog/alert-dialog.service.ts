import { inject, Injectable } from '@angular/core'
import { OverlayService, OverlayConfig, OverlayPosition } from '@charme/ui/overlay'
import { AlertSeverity } from '@charme/ui/alert'
import { AlertDialogComponent } from './alert-dialog.component'
import { AlertDialogRef } from './alert-dialog.model'

@Injectable({
  providedIn: 'root'
})
export class AlertDialogService {
  readonly #overlayService = inject(OverlayService)
  #alertDialogRef: AlertDialogRef | undefined

  add(title: string, message: string, opts?: { position?: OverlayPosition, duration?: number, severity?: AlertSeverity, action?: string }): AlertDialogRef {
    this.#alertDialogRef?.close()
    const configModel: Partial< OverlayConfig> = {
      position: {
        top: '50px',
        right: '50px'
      },
      data: { title, message, severity: opts?.severity ?? 'info', action: opts?.action },
      closeAfter: opts?.duration,
      focusOriginOnClose: false
    }
    const config = new OverlayConfig(configModel)
    this.#alertDialogRef = new AlertDialogRef(config)
    this.#overlayService.createOverlay(AlertDialogComponent, this.#alertDialogRef)
    return this.#alertDialogRef
  }
}
