import { Component } from '@angular/core'
import {
  CdkMenuItemRadio,
  CdkMenuItemCheckbox,
  CdkMenuGroup,
  CdkMenu,
  CdkMenuTrigger,
  CdkMenuItem,
  CdkMenuBar
} from '@angular/cdk/menu'

@Component({
  selector: 'app-test-cdk',
  standalone: true,
  templateUrl: 'test.component.html',
  styleUrl: 'test.component.scss',
  imports: [
    CdkMenuBar,
    CdkMenuItem,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuGroup,
    CdkMenuItemCheckbox,
    CdkMenuItemRadio

  ]
})
export class TestCdkComponent {

}
