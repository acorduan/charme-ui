import { ChangeDetectionStrategy, Component, Injector, TemplateRef, inject } from '@angular/core'
import { OVERLAY_DATA, OverlayConfig, OverlayRef } from '../overlay/overlay.model'
import { OverlayBehavior } from '../overlay/behaviors/overlay.behavior'
import { NgTemplateOutlet } from '@angular/common'

@Component({
  selector: 'c-menu',
  standalone: true,
  templateUrl: 'menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [OverlayBehavior],
  host: {
    tabindex: '-1',
    role: 'menu'
  },
  imports: [NgTemplateOutlet]
})
export class MenuComponent {
  readonly overlayRef = inject(OverlayRef)
  data: { id: string, tpl: TemplateRef<any> } = inject(OVERLAY_DATA)
  injector = Injector.create({ providers: [{ provide: OverlayRef, useValue: this.overlayRef }] })

  get config(): OverlayConfig {
    return this.overlayRef.config
  }
}
