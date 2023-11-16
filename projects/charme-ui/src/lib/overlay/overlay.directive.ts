import { Directive, HostBinding } from "@angular/core";
import { OverlayPositionDirective } from "./overlay-position.directive";
import { OverlaySizeDirective } from "./overlay-size.directive";

@Directive({
  selector: '[overlay-behavior]',
  standalone: true,
  hostDirectives: [OverlayPositionDirective, OverlaySizeDirective]
})
export class OverlayDirective {

  @HostBinding('class') class = 'z-[1000] bg-transparent fixed'

}
