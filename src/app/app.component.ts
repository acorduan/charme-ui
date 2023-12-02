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
import { OVERLAY_DATA } from '../../projects/charme-old/ui/overlay'
import {
  ItemCheckboxCheckedComponent,
  ItemRadioCheckedComponent,
  MenuBarDirective,
  MenuDirective,
  MenuItemCheckboxDirective,
  MenuItemDirective, MenuItemRadioDirective,
  MenuTriggerDirective
} from '../../projects/charme-old/ui/menu'
import {DialogCloseDirective, DialogRef, DialogService, DialogTitleDirective} from '../../projects/charme-old/ui/dialog'
import { ButtonComponent } from '../../projects/charme-old/ui/button'
import { InputDirective } from '../../projects/charme-old/ui/input'
import { TooltipDirective } from '../../projects/charme-old/ui/tooltip'
import {AlertComponent, alertSeverities, AlertSeverity} from '../../projects/charme-old/ui/alert'
import { SwitchComponent, SwitchContainerComponent } from '../../projects/charme-old/ui/switch'
import { EllipsisDirective } from '../../projects/charme-old/ui/ellipsis'
import { RadioButtonComponent, RadioGroupComponent } from '../../projects/charme-old/ui/radio-group'
import {
  AccordionComponent,
  AccordionContentDirective,
  AccordionItemComponent,
  AccordionTriggerDirective
} from '../../projects/charme-old/ui/accordion'
import { CheckboxContainerComponent, CheckboxDirective } from '../../projects/charme-old/ui/checkbox'
import { SeparatorComponent } from '../../projects/charme-old/ui/separator'
import { BadgeDirective } from '../../projects/charme-old/ui/badge'
import {
  ComboboxDirective, ComboboxGroupDirective, ComboboxNoResultDirective,
  ComboboxOptionDirective,
  ComboboxSearchDirective,
  ComboboxTriggerDirective
} from '../../projects/charme-old/ui/combobox'
import { DisclosureComponent, DisclosureContentDirective, DisclosureTriggerDirective } from '../../projects/charme-old/ui/disclosure'
import { CharmeThemeService } from '../../projects/charme-old/core'
import { AlertDialogService } from '../../projects/charme-old/ui/alert-dialog'

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
