import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core'
import { OverlayBehavior } from '../overlay/behaviors/overlay.behavior'
import { AlertSeverity } from '../alert/alert.model'
import { OVERLAY_DATA } from '../overlay/overlay.model'
import { AlertComponent } from '../alert'

interface AlertData { title: string, message: string, severity: AlertSeverity, action?: string }

@Component({
  selector: 'c-dialog-alert [role="alertdialog"] [tabindex="-1"]',
  standalone: true,
  templateUrl: 'alert-dialog.component.html',
  imports: [
    AlertComponent
  ],
  hostDirectives: [OverlayBehavior],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-labelledby]': 'titleId',
    '[attr.aria-describedby]': 'messageId'
  }
})
export class AlertDialogComponent {
  id = crypto.randomUUID()

  titleId = `c-dialog-alert-title_${this.id}`
  messageId = `c-dialog-alert-message_${this.id}`

  data: AlertData = inject(OVERLAY_DATA)

  @Output() actionClick = new EventEmitter<void>()
}
