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

/** @title Google Docs Menu Bar. */
@Component({
  selector: 'app-test',
  exportAs: 'cdkMenuMenubarExample',
  styleUrls: ['test.component.scss'],
  templateUrl: 'test.component.html',
  standalone: true,
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
export class CdkMenuMenubarExample {}
