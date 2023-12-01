import { Directive, inject, TemplateRef } from '@angular/core'

@Directive({
  selector: '[c-accordion-trigger]',
  standalone: true
})
export class AccordionTriggerDirective {
  readonly tpl = inject(TemplateRef<any>)
}
