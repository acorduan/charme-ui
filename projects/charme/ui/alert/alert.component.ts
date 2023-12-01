import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { NgClass, NgIf } from '@angular/common'
import { AlertSeverity } from './alert.model'
import { ButtonComponent } from '@charme/ui/button'

@Component({
  selector: 'c-alert',
  templateUrl: 'alert.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    ButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'alert'
  }
})
export class AlertComponent {
  @Input({ required: true }) title!: string
  @Input({ required: true }) message!: string
  @Input() severity: AlertSeverity = 'info'
  @Input() titleId: string | undefined = undefined
  @Input() messageId: string | undefined = undefined
  @Input() action: string | undefined = undefined
  @Output() actionClick = new EventEmitter<void>()

  classBySeverity: Record<AlertSeverity, string> = {
    success: 'border-success-500 bg-success-500/10',
    warning: 'border-yellow-400 bg-yellow-400/10',
    error: 'border-error-500 bg-error-500/10',
    info: 'border-primary-500 bg-primary-500/10'
  }

  onActionClick(): void {
    this.actionClick.next()
  }
}
