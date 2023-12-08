import { Component, DestroyRef, inject } from '@angular/core'
import { alertSeverities, AlertSeverity } from '@charme/ui/alert'
import { ButtonComponent } from '@charme/ui/button'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AlertDialogService } from '@charme/ui/alert-dialog'
import { InputDirective } from '@charme/ui/input'

@Component({
  standalone: true,
  imports: [
    ButtonComponent,
    InputDirective
  ],
  templateUrl: 'alert-dialog-doc.component.html'
})
export class AlertDialogDocComponent {
  readonly #destroyRef = inject(DestroyRef)
  readonly alert = inject(AlertDialogService)

  protected readonly alertSeverities = alertSeverities

  onOpenAlertClick(severity: string, duration?: number, action?: string): void {
    const alertRef = this.alert.add(
      'Alert title',
      'Lorem Ipsum is simply dummy text of the printing and...',
      { severity: severity as AlertSeverity, action, duration }
    )

    alertRef.onAction$()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => alertRef.close())
  }
}
