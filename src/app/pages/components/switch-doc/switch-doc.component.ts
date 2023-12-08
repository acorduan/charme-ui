import { Component } from '@angular/core'
import { SwitchComponent, SwitchContainerComponent } from '@charme/ui/switch'
import { ButtonComponent } from '@charme/ui/button'
import { FormsModule } from '@angular/forms'

@Component({
  standalone: true,
  imports: [
    SwitchContainerComponent,
    SwitchComponent,
    ButtonComponent,
    FormsModule
  ],
  templateUrl: 'switch-doc.component.html'
})
export class SwitchDocComponent {
  checked = false
  disabled = true
}
