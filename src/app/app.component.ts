import { Component, DestroyRef, ElementRef, inject, Input, TemplateRef, ViewChild } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { NgSwitch, NgSwitchDefault, NgSwitchCase, NgComponentOutlet, NgForOf, NgClass } from '@angular/common'
import {
  ButtonComponent,
  CharmeThemeService,
  InputDirective,
  DialogRef,
  TooltipDirective,
  DialogTitleDirective,
  DialogService,
  AlertComponent,
  AlertDialogService,
  AlertSeverity,
  alertSeverities,
  CheckboxDirective,
  SwitchContainerComponent,
  EllipsisDirective,
  RadioGroupComponent,
  RadioButtonComponent,
  AccordionTriggerDirective,
  AccordionComponent,
  AccordionItemComponent,
  AccordionContentDirective,
  CheckboxContainerComponent,
  SwitchComponent,
  DialogCloseDirective,
  MenuTriggerDirective,
  MenuBarDirective,
  MenuItemDirective,
  MenuItemCheckboxDirective,
  MenuDirective, ItemCheckboxCheckedComponent, MenuItemRadioDirective, ItemRadioCheckedComponent
} from '@charme-ui'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormsModule } from '@angular/forms'
import { SeparatorComponent } from 'projects/charme-ui/src/lib/separator/separator.component'
import { CdkMenuMenubarExample } from './test/test.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgClass, MenuDirective, MenuItemCheckboxDirective, DialogCloseDirective, MenuTriggerDirective, MenuItemDirective, MenuBarDirective, NgSwitch, NgSwitchDefault, NgSwitchCase, RouterOutlet, ButtonComponent, InputDirective, NgComponentOutlet, TooltipDirective, AlertComponent, NgForOf, CheckboxDirective, SwitchComponent, FormsModule, SwitchContainerComponent, EllipsisDirective, RadioGroupComponent, RadioButtonComponent, AccordionComponent, AccordionItemComponent, AccordionTriggerDirective, AccordionComponent, AccordionItemComponent, AccordionContentDirective, SeparatorComponent, CheckboxContainerComponent, CdkMenuMenubarExample, ItemCheckboxCheckedComponent, MenuItemRadioDirective, ItemRadioCheckedComponent]
})
export class AppComponent {
  @ViewChild('buttonEl', { read: ElementRef }) buttonEl!: ElementRef

  title = 'charme-ui'
  theme = inject(CharmeThemeService)
  dialog = inject(DialogService)
  alert = inject(AlertDialogService)
  alertSeverities = alertSeverities
  readonly #destroyRef = inject(DestroyRef)

  onItemClick(): void {
    console.log('onItemClick')
  }

  open = false
  secondOpen = false
  multipleSelect = false
  bestFramework = 'angular'
  isOpen = false
  checked = true
  disabled = true

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
  }

  onOpenDialogClickFromTpl(tpl: TemplateRef<any>): void {
    this.dialog.open(tpl, {
      inputs: {
        message: 'Test alan',
        isItGood: true
      },
      attachedTo: {
        host: this.buttonEl,
        hostPos: 'bottom-right',
        dialogPos: 'top-right'
      },
      hasBackDrop: false,
      panelClass: 'rounded'
    })
  }

  onOpenAlertClick(severity: string, duration?: number, action?: string): void {
    const alertRef = this.alert.add(
      'Alert title',
      'Lorem Ipsum is simply dummy text of the printing and...',
      { severity: severity as AlertSeverity, action, duration }
    )

    alertRef.onAction$()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => alertRef.close())
  }

  bestFrameWorkChange(value: string): void {
    console.log(value)
  }
}

@Component({
  selector: 'test',
  standalone: true,
  imports: [
    ButtonComponent,
    InputDirective,
    DialogTitleDirective
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
