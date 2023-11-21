import { ChangeDetectionStrategy, Component, inject, TemplateRef } from '@angular/core'
import { OverlayDirective } from '../overlay/overlay.directive'
import { NgIf, NgTemplateOutlet } from '@angular/common'
import { OVERLAY_DATA } from '../overlay/overlay.model'

@Component({
  selector: 'c-tooltip',
  standalone: true,
  hostDirectives: [OverlayDirective],
  imports: [
    NgIf,
    NgTemplateOutlet
  ],
  template: `
    <div *ngIf="message !== undefined" class="animate-tooltip bg-secondary max-w-lg text-primary c-overlay-shadow p-2 rounded text-xs">
        {{message}}
    </div>

    <ng-container *ngIf="template !== undefined">
      <ng-container *ngTemplateOutlet="template"></ng-container>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'tooltip',
    '[id]': 'data.id'
  }
})
export class TooltipComponent {
  data: { element: TemplateRef<any> | string, id: string } = inject(OVERLAY_DATA)
  template: TemplateRef<any> | undefined = typeof this.data.element === 'string' ? undefined : this.data.element
  message: string | undefined = typeof this.data.element === 'string' ? this.data.element : undefined
}
