import { Directive } from '@angular/core'
import { OverlayPositionBehavior } from './overlay-position.behavior'
import { OverlaySizeBehavior } from './overlay-size.behavior'
import { OverlayCloseTimeoutBehavior } from './overlay-close-timeout.behavior'
import { OverlayClickOutsiteBehavior } from './overlay-click-outsite.behavior'

@Directive({
  standalone: true,
  hostDirectives: [OverlayPositionBehavior, OverlaySizeBehavior, OverlayCloseTimeoutBehavior, OverlayClickOutsiteBehavior],
  host: {
    class: 'z-[1000] bg-transparent fixed outline-0'
  }
})
export class OverlayBehavior {
}
