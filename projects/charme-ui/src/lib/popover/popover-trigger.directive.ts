import {
  Directive, ElementRef, Input, TemplateRef, Type
} from '@angular/core'
import { BaseOverlayTrigger } from '../overlay/base-overlay-trigger'
import { PopoverComponent } from './popover.component'

@Directive({
  selector: '[c-popover-trigger]',
  standalone: true,
  host: {
    'aria-haspopup': 'dialog',
    '[attr.aria-controls]': 'id',
    '[attr.aria-expanded]': '$isOpen()'
  }
})
export class PopoverTriggerDirective extends BaseOverlayTrigger {
  component: Type<any> = PopoverComponent
  id: string = `c-popover-${crypto.randomUUID()}`
  overlayHostEl = new ElementRef(document.body)
  @Input('c-popover-trigger') tpl!: TemplateRef<any>
}
