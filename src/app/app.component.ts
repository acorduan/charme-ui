import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  TemplateRef,
  ViewChild
} from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { NgClass, NgComponentOutlet, NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormsModule } from '@angular/forms'
import { CdkMenuMenubarExample } from './test/test.component'
import { OVERLAY_DATA } from '@charme/ui/overlay'
import {
  ItemCheckboxCheckedComponent,
  ItemRadioCheckedComponent,
  MenuBarDirective,
  MenuDirective,
  MenuItemCheckboxDirective,
  MenuItemDirective, MenuItemRadioDirective,
  MenuTriggerDirective
} from '@charme/ui/menu'
import { DialogCloseDirective, DialogRef, DialogService, DialogTitleDirective } from '@charme/ui/dialog'
import { ButtonComponent } from '@charme/ui/button'
import { InputDirective } from '@charme/ui/input'
import { TooltipDirective } from '@charme/ui/tooltip'
import { AlertComponent, alertSeverities, AlertSeverity } from '@charme/ui/alert'
import { SwitchComponent, SwitchContainerComponent } from '@charme/ui/switch'
import { EllipsisDirective } from '@charme/ui/ellipsis'
import { RadioButtonComponent, RadioGroupComponent } from '@charme/ui/radio-group'
import {
  AccordionComponent,
  AccordionContentDirective,
  AccordionItemComponent,
  AccordionTriggerDirective
} from '@charme/ui/accordion'
import { CheckboxContainerComponent, CheckboxDirective } from '@charme/ui/checkbox'
import { SeparatorComponent } from '@charme/ui/separator'
import { BadgeDirective } from '@charme/ui/badge'
import {
  ComboboxDirective, ComboboxGroupDirective, ComboboxNoResultDirective,
  ComboboxOptionDirective,
  ComboboxSearchDirective,
  ComboboxTriggerDirective
} from '@charme/ui/combobox'
import { DisclosureComponent, DisclosureContentDirective, DisclosureTriggerDirective } from '@charme/ui/disclosure'
import { CharmeThemeService } from '@charme/ui/charme-config'
import { AlertDialogService } from '@charme/ui/alert-dialog'

@Component({
  selector: 'app-test2',
  standalone: true,
  template: `
    <div class="grid gap-2 p-4">
        whatever
    </div>
    `
})
export class TestComponent2 {
  data = inject(OVERLAY_DATA)

  constructor() {
    console.log(this.data)
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TestComponent2, NgClass, MenuDirective, MenuItemCheckboxDirective, DialogCloseDirective, MenuTriggerDirective, MenuItemDirective, MenuBarDirective, NgSwitch, NgSwitchDefault, NgSwitchCase, RouterOutlet, ButtonComponent, InputDirective, NgComponentOutlet, TooltipDirective, AlertComponent, NgForOf, CheckboxDirective, SwitchComponent, FormsModule, SwitchContainerComponent, EllipsisDirective, RadioGroupComponent, RadioButtonComponent, AccordionTriggerDirective, AccordionComponent, AccordionItemComponent, AccordionContentDirective, SeparatorComponent, CheckboxContainerComponent, CdkMenuMenubarExample, ItemCheckboxCheckedComponent, MenuItemRadioDirective, ItemRadioCheckedComponent, BadgeDirective, ComboboxTriggerDirective, ComboboxOptionDirective, ComboboxDirective, ComboboxSearchDirective, ComboboxNoResultDirective, ComboboxGroupDirective, DisclosureComponent, DisclosureTriggerDirective, DisclosureContentDirective]
})
export class AppComponent {
  @ViewChild('buttonEl', { read: ElementRef }) buttonEl!: ElementRef

  title = 'charme-ui'
  theme = inject(CharmeThemeService)
  dialog = inject(DialogService)
  alert = inject(AlertDialogService)
  alertSeverities = alertSeverities
  readonly #destroyRef = inject(DestroyRef)

  frameworks = ['Angular', 'React', 'Svelte', 'VueJs']
  frameworks2 = ['Angular2', 'React2', 'Svelte2', 'VueJs2']

  disclosureOpen = false

  selectedFramework = this.frameworks[0]

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
        origin: this.buttonEl,
        originPos: 'bottom-right',
        overlayPos: 'top-right'
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
