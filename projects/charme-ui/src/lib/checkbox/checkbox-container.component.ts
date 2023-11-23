import { ChangeDetectionStrategy, Component, ContentChild } from '@angular/core'
import { CheckboxDirective } from './checkbox.directive'

@Component({
  selector: 'c-checkbox-container',
  standalone: true,
  templateUrl: 'checkbox-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-disabled]': 'checkbox.$disabled()',
    class: 'select-none flex gap-2 data-[disabled=true]:disabled-el items-center text-sm'
  }
})
export class CheckboxContainerComponent {
  @ContentChild(CheckboxDirective, { static: true }) checkbox!: CheckboxDirective
}
