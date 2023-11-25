import { ChangeDetectionStrategy, Component, ElementRef, inject, Injector, TemplateRef, Type } from '@angular/core'
import { NgClass, NgComponentOutlet, NgIf, NgTemplateOutlet } from '@angular/common'
import { DialogConfig, DialogRef } from './dialog.model'
import { DialogFocusGardDirective } from './dialog-focus-guard.directive'
import { OverlayBehavior } from '../overlay/behaviors/overlay.behavior'
import { OVERLAY_DATA } from '../overlay/overlay.model'

@Component({
  selector: 'c-dialog',
  imports: [
    NgClass,
    NgIf,
    NgComponentOutlet,
    DialogFocusGardDirective,
    NgTemplateOutlet
  ],
  hostDirectives: [OverlayBehavior],
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
  data: { tpl: TemplateRef<any> | undefined, comp: Type<any> | undefined } = inject(OVERLAY_DATA)
  dialogRef = inject(DialogRef)
  elementRef = inject(ElementRef<HTMLDialogElement>)
  injector = Injector.create({ providers: [{ provide: DialogRef, useValue: this.dialogRef }] })

  get config(): DialogConfig {
    return this.dialogRef.config
  }
}
