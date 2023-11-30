import {
  Directive, ElementRef, Input, TemplateRef, Type
} from '@angular/core'
import { BaseOverlayTrigger } from '../overlay/base-overlay-trigger'
import { PopoverComponent } from './popover.component'

@Directive({
  selector: '[c-popover-trigger]',
  standalone: true
})
export class PopoverTriggerDirective extends BaseOverlayTrigger {
  component: Type<any> = PopoverComponent
  id: string = ''
  overlayHostEl = new ElementRef(document.body)
  @Input('c-popover-trigger') tpl!: TemplateRef<any>
}
