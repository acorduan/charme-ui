import { Directive, HostBinding } from "@angular/core";
import { OverlayPositionDirective } from "./overlay-position.directive";
import { OverlaySizeDirective } from "./overlay-size.directive";
import { OverlayCloseTimeoutDirective } from "./overlay-close-timeout.directive";

@Directive({
  selector: '[c-overlay]',
  standalone: true,
  hostDirectives: [OverlayPositionDirective, OverlaySizeDirective, OverlayCloseTimeoutDirective]
})
export class OverlayDirective {

  @HostBinding('class') class = 'z-[1000] bg-transparent fixed outline-0'
}
