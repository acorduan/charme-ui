import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[aiqLoader]',
})
export class LoaderDirective {
  constructor(readonly tpl: TemplateRef<any>, public viewContainerRef: ViewContainerRef) {}
}
