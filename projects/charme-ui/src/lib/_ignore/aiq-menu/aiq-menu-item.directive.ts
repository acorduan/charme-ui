import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: '[aiq-menu-item]',
  standalone: true
})
export class AiqMenuItemDirective {

  constructor(readonly el: ElementRef) {
    this.el.nativeElement.classList.add('aiq-menu-item');
  }
}
