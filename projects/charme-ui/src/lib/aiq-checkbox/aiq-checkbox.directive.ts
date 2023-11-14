import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { AiqElementDirective } from "projects/charme-ui/src/lib/charme-component/aiq-element.directive";

@Directive({
  selector: '[aiq-checkbox]'
})
export class AiqCheckboxDirective extends AiqElementDirective {

  @HostBinding('type') inputType = 'checkbox';

  constructor(private el: ElementRef<HTMLInputElement>) {
    super(['aiq-checkbox']);
  }

  @Input() set indeterminate(value: boolean | undefined | null) {
    this.el.nativeElement.indeterminate = value as boolean
  }

}
