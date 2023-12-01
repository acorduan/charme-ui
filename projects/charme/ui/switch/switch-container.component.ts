import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  HostListener,
  ViewEncapsulation,
  forwardRef,
  signal
} from '@angular/core'
import { NgClass } from '@angular/common'
import { SwitchComponent } from './switch.component'
import { CSwitchAccessor, C_SWITCH_ACCESSOR } from './switch.model'

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
    class: 'cursor-pointer text-sm select-none w-auto flex items-center gap-2 text-sm data-[disabled=true]:cursor-default data-[disabled=true]:opacity-40 data-[disabled=true]:pointer-events-none ',
    '[attr.data-disabled]': 'switch.$disabled()'
  },
  providers: [
    {
      provide: C_SWITCH_ACCESSOR,
      useExisting: forwardRef(() => SwitchContainerComponent)
    }
  ]
})
export class SwitchContainerComponent implements CSwitchAccessor {
  @ContentChild(SwitchComponent, { static: true }) switch!: SwitchComponent

  $hover = signal(false)

  @HostListener('mouseenter') hoverOn(): void {
    this.$hover.set(true)
  }

  @HostListener('mouseleave') hoverOff(): void {
    this.$hover.set(false)
  }
}
