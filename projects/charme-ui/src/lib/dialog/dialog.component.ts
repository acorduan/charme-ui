import {
  Component,
  ElementRef,
  inject, TemplateRef,
  Type,
} from '@angular/core';
import { NgClass, NgComponentOutlet, NgIf, NgTemplateOutlet } from "@angular/common";
import { DialogConfig, DialogRef } from "./dialog.model";
import { DialogClosingRulesDirective } from "./dialog-closing-rules.directive";
import { DialogFocusGardDirective } from "./dialog-focus-guard.directive";
import { DialogBackdropDirective } from "./dialog-backdrop.component";
import { OverlayDirective } from "../overlay/overlay.directive";

@Component({
  selector: 'c-dialog [open] [tabindex="-1"] [aria-modal="true"] [role="dialog"]',
  imports: [
    NgClass,
    NgIf,
    NgComponentOutlet,
    DialogFocusGardDirective,
    NgTemplateOutlet
  ],
  hostDirectives: [OverlayDirective, DialogClosingRulesDirective, DialogBackdropDirective],
  templateUrl: 'dialog.component.html',
  standalone: true
})
export class DialogComponent {

  component: Type<any> | undefined;
  template: TemplateRef<any> | undefined;

  dialogRef = inject(DialogRef)
  elementRef = inject(ElementRef<HTMLDialogElement>)

  get config(): DialogConfig {
    return this.dialogRef.config
  }
}
