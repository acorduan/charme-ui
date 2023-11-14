import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[aiqDropdownButton]',
})
export class DropdownButtonDirective {
  constructor(readonly tpl: TemplateRef<any>, public viewContainerRef: ViewContainerRef) {}
}
