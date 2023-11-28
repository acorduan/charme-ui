import { ChangeDetectionStrategy, Component, inject, TemplateRef } from '@angular/core'
import { OverlayBehavior } from '../overlay/behaviors/overlay.behavior'
import { NgIf, NgTemplateOutlet } from '@angular/common'
import { OVERLAY_DATA } from '../overlay/overlay.model'

@Component({
  selector: 'c-tooltip',
  standalone: true,
  hostDirectives: [OverlayBehavior],
  imports: [
    NgIf,
    NgTemplateOutlet
  ],
  template: `
    @if (message !== undefined) {
<div class="animate-tooltip bg-primary max-w-lg text-primary border border-secondary p-2 rounded text-xs">
        {{message}}
    </div>
}

    @if (template !== undefined) {

      <ng-container *ngTemplateOutlet="template"></ng-container>

}
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
