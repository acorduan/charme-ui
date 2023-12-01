import { Directive, inject, TemplateRef } from '@angular/core'

@Directive({
  selector: '[c-accordion-content]',
  standalone: true
})
export class AccordionContentDirective {
  readonly tpl: TemplateRef<any> = inject(TemplateRef<any>)
}
