import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ViewEncapsulation
} from '@angular/core'
import { NgClass } from '@angular/common'
import { SwitchDirective } from './switch.directive'

@Component({
  selector: 'c-switch-container',
  templateUrl: 'switch-container.component.html',
  styleUrls: ['switch-container.component.scss'],
  imports: [
    NgClass
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'cursor-pointer text-sm select-none w-auto flex items-center gap-2 text-sm data-[disabled=true]:cursor-default data-[disabled=true]:opacity-40 data-[disabled=true]:active:pointer-events-none ',
    '[attr.data-disabled]': 'switch.$disabled()'
  }
})
export class SwitchContainerComponent {
  @ContentChild(SwitchDirective, { static: true }) switch!: SwitchDirective

  toggle(): void {
    const checked = !this.switch.$checked()
    this.switch.writeValue(checked)
    this.switch.propagateChange(checked)
  }
}
