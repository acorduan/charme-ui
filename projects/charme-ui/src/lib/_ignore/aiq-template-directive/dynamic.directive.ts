import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[aiqDynamicDirective]',
})
export class DynamicDirective implements OnInit, AfterViewInit {
  @Input() aiqDynamicDirective: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.aiqDynamicDirective) {
      const directive = new this.aiqDynamicDirective(this.elementRef);
      directive.ngOnInit();
    }
  }
}
