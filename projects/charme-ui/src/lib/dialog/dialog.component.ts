import { ChangeDetectionStrategy, Component, ElementRef, inject, Injector, TemplateRef, Type } from '@angular/core'
import { NgClass, NgComponentOutlet, NgIf, NgTemplateOutlet } from '@angular/common'
import { DialogConfig, DialogRef } from './dialog.model'
import { DialogCloseBehavior } from './behaviors/dialog-close.behavior'
import { DialogFocusGardDirective } from './dialog-focus-guard.directive'
import { DialogBackdropBehavior } from './behaviors/dialog-backdrop.behavior'
import { OverlayBehavior } from '../overlay/behaviors/overlay.behavior'

@Component({
  selector: 'c-dialog',
  imports: [
    NgClass,
    NgIf,
    NgComponentOutlet,
    DialogFocusGardDirective,
    NgTemplateOutlet
  ],
  hostDirectives: [OverlayBehavior, DialogCloseBehavior, DialogBackdropBehavior],
  templateUrl: 'dialog.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    tabindex: '-1',
    'aria-modal': 'true',
    role: 'dialog'
  }
})
export class DialogComponent {
  component: Type<any> | undefined
  template: TemplateRef<any> | undefined

  dialogRef = inject(DialogRef)
  elementRef = inject(ElementRef<HTMLDialogElement>)
  injector = Injector.create({ providers: [{ provide: DialogRef, useValue: this.dialogRef }] })

  get config(): DialogConfig {
    return this.dialogRef.config
  }
}
