import {
  Directive, Input, TemplateRef
} from '@angular/core'
import { PopoverTriggerDirective } from '../popover'

@Directive({
  selector: '[c-combobox-trigger]',
  standalone: true,
  hostDirectives: [{ directive: PopoverTriggerDirective, inputs: ['c-popover-trigger:c-combobox-trigger'] }]
})
export class ComboboxTriggerDirective {
  @Input('c-combobox-trigger') tpl!: TemplateRef<any>
}
