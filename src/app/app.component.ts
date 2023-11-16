import { Component, ElementRef, HostBinding, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSwitch, NgSwitchDefault, NgSwitchCase, NgComponentOutlet } from '@angular/common';
import {
  ButtonComponent,
  CharmeThemeService,
  InputDirective,
  DialogRef,
  TooltipDirective,
  DialogTitleDirective, DialogService
} from "@charme-ui";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgSwitch, NgSwitchDefault, NgSwitchCase, RouterOutlet, ButtonComponent, InputDirective, NgComponentOutlet, TooltipDirective]
})
export class AppComponent {

  @ViewChild('buttonEl', {read: ElementRef}) buttonEl!: ElementRef

  title = 'tutor';
  theme = inject(CharmeThemeService)
  dialog = inject(DialogService)
  top = 10

  onOpenDialogClick(): void {
    this.dialog.open(TestComponent, {
      inputs: {
        message: 'Test alan'
      },
      attachedTo: {
        host: this.buttonEl,
        hostPos: 'bottomright',
        dialogPos: 'topright'
      },
      panelClass: 'rounded'
    })
    this.top += 10
  }

  onOpenDialogClickFromTpl(tpl: TemplateRef<any>): void {
    this.dialog.open(tpl, {
      inputs: {
        message: 'Test alan',
        isItGood: true
      },
      attachedTo: {
        host: this.buttonEl,
        hostPos: 'bottomright',
        dialogPos: 'topright'
      },
      panelClass: 'rounded'
    })
    this.top += 10
  }
}


@Component({
  selector: 'test',
  standalone: true,
  imports: [
    ButtonComponent,
    InputDirective,
    DialogTitleDirective,
  ],
  template: `
    <div class="grid gap-2">
      <h1 c-dialog-title>Title</h1>
      <input c-input placeholder="test alan">
      <p>{{message}}</p>
      <button c-button (click)="ref.close()">Close me</button>
    </div>
    `
})
export class TestComponent {
  ref = inject(DialogRef)

  @Input() message: string = ''


  constructor() {
    console.log(this.ref)
  }

}
