import { Directive, HostBinding } from '@angular/core';
import { AiqElementDirective } from "projects/charme-ui/src/lib/charme-component/aiq-element.directive";

@Directive({
  selector: '[aiq-radio-button]'
})
export class AiqRadioButtonDirective extends AiqElementDirective {

  @HostBinding('type') inputType = 'radio';

  constructor() {
    super(['aiq-radio-button']);
  }

}
