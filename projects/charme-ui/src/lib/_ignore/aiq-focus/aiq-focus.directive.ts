import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[aiq-focus]',
  standalone: true
})
export class AiqFocusDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    setTimeout(() => this.el.nativeElement.focus());
  }

}
