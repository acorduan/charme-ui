import { ChangeDetectionStrategy, Component, ElementRef, inject, Injector, TemplateRef } from '@angular/core'
import { OVERLAY_DATA, OverlayRef } from '../overlay/overlay.model'
import { OverlayBehavior } from '../overlay/behaviors/overlay.behavior'
import { NgTemplateOutlet } from '@angular/common'
import { OverlayGuardFocusGardDirective } from '../overlay/behaviors/overlay-guard-focus.behavior'

@Component({
  selector: 'c-popover',
  standalone: true,
  template: `
    <span overlay-guard-focus position="first" [el]="el"></span>
    <div class="rounded bg-primary ring-secondary text-primary shadow-lg">
      <ng-container *ngTemplateOutlet="data.tpl; context: overlayRef.config.data; injector: injector"/>
    </div>
    <span overlay-guard-focus position="last" [el]="el"></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [OverlayBehavior],
  imports: [NgTemplateOutlet, OverlayGuardFocusGardDirective],
  host: {
    tabindex: '-1',
    role: 'dialog',
    '[id]': 'data.id',
    'aria-modal': 'true'
  }
})
export class PopoverComponent {
  el = inject(ElementRef)
  overlayRef = inject(OverlayRef)
  injector = inject(Injector)
  data: { id: string, hostOverlayRef: OverlayRef | null, tpl: TemplateRef<any> } = inject(OVERLAY_DATA)
}
