import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[aiqBody]',
})
export class BodyDirective {
  constructor(readonly tpl: TemplateRef<any>, public viewContainerRef: ViewContainerRef) {}
}
