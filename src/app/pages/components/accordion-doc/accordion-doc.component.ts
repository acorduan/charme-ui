import { Component } from '@angular/core'
import { ButtonComponent } from '@charme/ui/button'
import { CheckboxContainerComponent, CheckboxDirective } from '@charme/ui/checkbox'
import { FormsModule } from '@angular/forms'
import {
  AccordionComponent,
  AccordionContentDirective,
  AccordionItemComponent,
  AccordionTriggerDirective
} from '@charme/ui/accordion'

@Component({
  standalone: true,
  imports: [
    ButtonComponent,
    CheckboxContainerComponent,
    FormsModule,
    CheckboxDirective,
    AccordionComponent,
    AccordionItemComponent,
    AccordionTriggerDirective,
    AccordionContentDirective
  ],
  templateUrl: 'accordion-doc.component.html'
})
export class AccordionDocComponent {
  open = false
  secondOpen = false
  multipleSelect = false
}
