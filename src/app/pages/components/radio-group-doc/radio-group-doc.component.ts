import { Component } from '@angular/core'
import { RadioButtonComponent, RadioGroupComponent } from '@charme/ui/radio-group'
import { FormsModule } from '@angular/forms'

@Component({
  standalone: true,
  imports: [
    RadioGroupComponent,
    RadioButtonComponent,
    FormsModule
  ],
  templateUrl: 'radio-group-doc.component.html'
})
export class RadioGroupDocComponent {
  bestFramework = 'angular'
}
