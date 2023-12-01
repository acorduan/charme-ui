import { Directive } from '@angular/core'
import { OverlayPositionBehavior } from './overlay-position.behavior'
import { OverlaySizeBehavior } from './overlay-size.behavior'
import { OverlayClickOutsiteBehavior } from './overlay-click-outsite.behavior'
import { OverlayBackdropBehavior } from './overlay-backdrop.behavior'
import { OverlayCloseBehavior } from './overlay-close.behavior'

@Directive({
  standalone: true,
  hostDirectives: [OverlayPositionBehavior, OverlaySizeBehavior, OverlayClickOutsiteBehavior, OverlayBackdropBehavior, OverlayCloseBehavior],
  host: {
    class: 'z-[1000] bg-transparent fixed outline-0'
  }
})
export class OverlayBehavior {
}
