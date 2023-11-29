import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  TemplateRef,
  inject,
  ElementRef
} from '@angular/core'
import { OVERLAY_DATA, OverlayConfig, OverlayRef } from '../overlay/overlay.model'
import { OverlayBehavior } from '../overlay/behaviors/overlay.behavior'
import { NgTemplateOutlet } from '@angular/common'
import { OverlayGuardFocusGardDirective } from '../overlay/behaviors/overlay-guard-focus.behavior'

@Component({
  selector: 'c-menu',
  standalone: true,
  template: `
    <span overlay-guard-focus position="first" [el]="el"></span>
    <div class="rounded bg-primary ring-secondary text-primary shadow-lg">
      <ng-container *ngTemplateOutlet="data.tpl; context: config.data; injector: injector"/>
    </div>
    <span overlay-guard-focus position="last" [el]="el"></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [OverlayBehavior],
  host: {
    tabindex: '-1',
    role: 'menu',
    '[id]': 'data.id',
    'aria-orientation': 'vertical'
  },
  imports: [NgTemplateOutlet, OverlayGuardFocusGardDirective]
})
export class MenuComponent {
  el = inject(ElementRef)
  overlayRef = inject(OverlayRef)
  data: { id: string, tpl: TemplateRef<any> } = inject(OVERLAY_DATA)
  injector = Injector.create({ providers: [{ provide: OverlayRef, useValue: this.overlayRef }] })

  get config(): OverlayConfig {
    return this.overlayRef.config
  }
}
