import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { CharmeComponent } from "../charme-component/charme-component.directive";

@Directive({
  selector: '[c-checkbox]',
  standalone: true
})
export class CheckboxDirective extends CharmeComponent {

  @HostBinding('type') inputType = 'checkbox';

  constructor(private el: ElementRef<HTMLInputElement>) {
    super(['c-checkbox']);
  }

  @Input() set indeterminate(value: boolean | undefined | null) {
    this.el.nativeElement.indeterminate = value as boolean
  }

}
