import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSwitch, NgSwitchDefault, NgSwitchCase, NgComponentOutlet } from '@angular/common';
import { ButtonComponent, CharmeThemeService, InputDirective, DialogRef } from "@charme-ui";
import { DialogService } from "@charme-ui";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
  imports: [NgSwitch, NgSwitchDefault, NgSwitchCase, RouterOutlet, ButtonComponent, InputDirective, NgComponentOutlet]
})
export class AppComponent {
  title = 'tutor';
  theme = inject(CharmeThemeService)
  dialog = inject(DialogService)

  onOpenDialogClick(): void {
    this.dialog.open(TestComponent)
  }
}


@Component({
  selector: 'test',
  standalone: true,
  template: `Hello there`
})
export class TestComponent {


  ref = inject(DialogRef)

  constructor() {
    console.log(this.ref)
  }

}
