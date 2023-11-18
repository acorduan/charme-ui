import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { NgClass, NgIf } from "@angular/common";
import { AlertSeverity } from "./alert.model";
import { ButtonComponent } from "projects/charme-ui/src/lib/button";

@Component({
  selector: 'c-alert',
  templateUrl: 'alert.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    ButtonComponent
  ]
})
export class AlertComponent {

  @HostBinding('attr.role') role = 'alert'

  @Input({required: true}) title!: string
  @Input({required: true}) message!: string
  @Input() severity: AlertSeverity = 'info'
  @Input() titleId: string | undefined = undefined
  @Input() messageId: string | undefined = undefined
  @Input() action: string | undefined = undefined
  @Output() actionClick = new EventEmitter<void>()

  classBySeverity: Record<AlertSeverity, string> = {
    success: 'border-c-green-50 bg-c-green-50/10',
    warning: 'border-c-yellow-40 bg-c-yellow-40/10',
    error: 'border-c-red-50 bg-c-red-50/10',
    info: 'border-c-blue-50 bg-c-blue-50/10'
  }

  onActionClick(): void {
    this.actionClick.next()
  }

}
