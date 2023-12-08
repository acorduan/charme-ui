import { Component } from '@angular/core'
import { ButtonComponent } from '@charme/ui/button'
import { InputDirective } from '@charme/ui/input'
import { MenuItemDirective, MenuTriggerDirective } from '@charme/ui/menu'

@Component({
  standalone: true,
  imports: [
    ButtonComponent,
    InputDirective,
    MenuItemDirective,
    MenuTriggerDirective
  ],
  templateUrl: 'menu-doc.component.html'
})
export class MenuDocComponent {

}
