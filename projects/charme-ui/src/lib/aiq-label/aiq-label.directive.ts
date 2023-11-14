import { Directive, Input } from '@angular/core';
import { AiqElementDirective } from "projects/charme-ui/src/lib/charme-component/aiq-element.directive";
import { aiqLabelModel, AiqLabelType } from "./aiq-label.model";

@Directive({
  selector: '[aiq-label]'
})
export class AiqLabelDirective extends AiqElementDirective {

  constructor() {
    super(['aiq-label']);
    this.type = 'default';
  }

  @Input() set type(value: AiqLabelType) {
    aiqLabelModel.forEach((item) => this.removeClass(`aiq-label-${value}`));
    this.addClass(`aiq-label-${value}`);
  }

  @Input() set rounded(value: boolean | null | undefined | '' | 'true' | 'false') {
    value == true  || value === '' || value=== 'true'
      ? this.addClass(`aiq-label-rounded`)
      : this.removeClass(`aiq-label-rounded`);
  }

}
