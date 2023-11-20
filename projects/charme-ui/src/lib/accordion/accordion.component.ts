import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, signal } from '@angular/core'
import { C_ACCORDION_ACCESSOR } from './accordion.model'

@Component({
  standalone: true,
  selector: 'c-accordion',
  templateUrl: 'accordion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: C_ACCORDION_ACCESSOR,
      useExisting: forwardRef(() => AccordionComponent)
    }
  ]
})
export class AccordionComponent {
  @HostBinding('class') class = 'grid gap-2'

  $selectedId = signal<string | undefined>(undefined)
}
