import { Component } from '@angular/core'
import { CheckboxContainerComponent, CheckboxDirective } from '@charme/ui/checkbox'
import { FormsModule } from '@angular/forms'

@Component({
  standalone: true,
  imports: [
    CheckboxContainerComponent,
    FormsModule,
    CheckboxDirective
  ],
  templateUrl: 'checkbox-doc.component.html'
})
export class CheckboxDocComponent {
  checked = false
}
