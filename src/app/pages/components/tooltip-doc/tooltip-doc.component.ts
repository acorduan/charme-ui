import { Component } from '@angular/core'
import { ButtonComponent } from '@charme/ui/button'
import { TooltipDirective } from '@charme/ui/tooltip'

@Component({
  standalone: true,
  imports: [
    ButtonComponent,
    TooltipDirective
  ],
  templateUrl: 'tooltip-doc.component.html'
})
export class TooltipDocComponent {

}
