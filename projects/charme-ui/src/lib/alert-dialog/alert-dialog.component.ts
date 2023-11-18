import { Component, EventEmitter, HostBinding, inject, Output } from "@angular/core";
import { OverlayDirective } from "../overlay/overlay.directive";
import { AlertSeverity } from "../alert/alert.model";
import { OVERLAY_DATA } from "../overlay/overlay.model";
import { AlertComponent } from "../alert";

type AlertData = { title: string, message: string, severity: AlertSeverity, action?: string }

@Component({
  selector: 'c-dialog-alert [role="alertdialog"] [tabindex="-1"]',
  standalone: true,
  templateUrl: 'alert-dialog.component.html',
  imports: [
    AlertComponent
  ],
  hostDirectives: [OverlayDirective]
})
export class AlertDialogComponent {

  @HostBinding('attr.aria-labelledby') titleId = `c-dialog-alert-title_${crypto.randomUUID()}`
  @HostBinding('attr.aria-describedby') messageId = `c-dialog-alert-message_${crypto.randomUUID()}`

  data: AlertData = inject(OVERLAY_DATA)

  @Output() actionClick = new EventEmitter<void>()
}
