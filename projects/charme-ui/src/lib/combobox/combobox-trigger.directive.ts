import {
  Directive, ElementRef, Input, TemplateRef, Type
} from '@angular/core'
import { BaseOverlayTrigger } from '../overlay/base-overlay-trigger'
import { ComboboxComponent } from './combobox.component'

@Directive({
  selector: '[c-combobox-trigger]',
  standalone: true
})
export class ComboboxTriggerDirective extends BaseOverlayTrigger {
  component: Type<any> = ComboboxComponent
  id: string = ''
  overlayHostEl = new ElementRef(document.body)
  @Input('c-combobox-trigger') tpl!: TemplateRef<any>
}
