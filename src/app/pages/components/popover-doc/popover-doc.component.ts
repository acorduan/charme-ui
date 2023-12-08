import { Component } from '@angular/core'
import { ButtonComponent } from '@charme/ui/button'
import { PopoverTriggerDirective } from '@charme/ui/popover'

@Component({
  standalone: true,
  imports: [
    ButtonComponent,
    PopoverTriggerDirective
  ],
  templateUrl: 'popover-doc.component.html'
})
export class PopoverDocComponent {

}
