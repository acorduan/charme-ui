import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[aiqFooter]',
})
export class FooterDirective {
  constructor(readonly tpl: TemplateRef<any>, public viewContainerRef: ViewContainerRef) {}
}
