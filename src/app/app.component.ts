import { Component, DestroyRef, ElementRef, HostBinding, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSwitch, NgSwitchDefault, NgSwitchCase, NgComponentOutlet, NgForOf } from '@angular/common';
import {
  ButtonComponent,
  CharmeThemeService,
  InputDirective,
  DialogRef,
  TooltipDirective,
  DialogTitleDirective, DialogService,
  AlertComponent,
  AlertDialogService,
  AlertSeverity, alertSeverities, CheckboxDirective
} from "@charme-ui";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgSwitch, NgSwitchDefault, NgSwitchCase, RouterOutlet, ButtonComponent, InputDirective, NgComponentOutlet, TooltipDirective, AlertComponent, NgForOf, CheckboxDirective]
})
export class AppComponent {

  @ViewChild('buttonEl', {read: ElementRef}) buttonEl!: ElementRef

  title = 'charme-ui';
  theme = inject(CharmeThemeService)
  dialog = inject(DialogService)
  alert = inject(AlertDialogService)
  top = 10
  alertSeverities = alertSeverities
  #destroyRef = inject(DestroyRef)

  onOpenDialogClick(): void {
    this.dialog.open(TestComponent, {
      inputs: {
        message: 'Test alan'
      },
      position: {
        top: '0',
        right: '0'
      },
      panelClass: 'rounded'
    }).afterClosed()
      .subscribe(result => console.log(result))
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
        dialogPos: 'topright',
      },
      hasBackDrop: false,
      panelClass: 'rounded'
    })
    this.top += 10
  }


  onOpenAlertClick(severity: string, duration?: any, action?: string): void {

    const alertRef = this.alert.add(
      'Alert title',
      'Lorem Ipsum is simply dummy text of the printing and...',
      {severity: severity as  AlertSeverity, action, duration}
    )

    alertRef.onAction$()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => alertRef.close())
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
    <div class="grid gap-2 p-4">
      <h1 c-dialog-title>Title</h1>
      <label for="name">Name</label>
      <input id="name" c-input placeholder="test alan" #inputText>
      <p>{{message}}</p>
      <button c-button (click)="ref.close(inputText.value)" type="submit">Submit</button>
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
