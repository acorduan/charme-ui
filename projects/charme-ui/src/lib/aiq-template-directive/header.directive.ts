import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[aiqHeader]',
})
export class HeaderDirective {
  constructor(readonly tpl: TemplateRef<any>, public viewContainerRef: ViewContainerRef) {}
}
