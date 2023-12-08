import { Component } from '@angular/core'
import { ButtonComponent } from '@charme/ui/button'
import {
  ItemCheckboxCheckedComponent,
  ItemRadioCheckedComponent,
  MenuBarDirective,
  MenuDirective, MenuItemCheckboxDirective, MenuItemDirective, MenuItemRadioDirective, MenuTriggerDirective
} from '@charme/ui/menu'
import { SeparatorComponent } from '@charme/ui/separator'

@Component({
  standalone: true,
  imports: [
    ButtonComponent,
    ItemCheckboxCheckedComponent,
    ItemRadioCheckedComponent,
    MenuBarDirective,
    MenuDirective,
    MenuItemCheckboxDirective,
    MenuItemDirective,
    MenuItemRadioDirective,
    SeparatorComponent,
    MenuTriggerDirective
  ],
  templateUrl: 'menu-bar-doc.component.html'
})
export class MenuBarDocComponent {
  onItemClick(): void {
    console.log('onItemClick')
  }
}
