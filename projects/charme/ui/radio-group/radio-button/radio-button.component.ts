import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core'
import { RadioButtonDirective } from './radio-button.directive'
import { FormsModule } from '@angular/forms'
import { C_RADIO_GROUP_ACCESSOR } from '../radio-group.model'
import { RadioButtonColor } from './radio-button.theme'
import { NgClass } from '@angular/common'

@Component({
  standalone: true,
  selector: 'c-radio-button',
  imports: [
    RadioButtonDirective,
    FormsModule,
    NgClass
  ],
  templateUrl: 'radio-button.component.html',
  styleUrl: 'radio-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'flex items-center data-[disabled=true]:opacity-40 data-[disabled=true]:cursor-events-none data-[disabled=true]:cursor-default',
    '[attr.data-disabled]': 'disabled'
  }
})
export class RadioButtonComponent {
  @Input({ required: true }) value: any

  accessor = inject(C_RADIO_GROUP_ACCESSOR)

  $checked = computed(() => {
    const value = this.accessor.$value()
    return value !== null && value !== undefined ? value === this.value : false
  })

  @Input({ transform: booleanAttribute }) disabled: boolean = false
  @Input() id: string = `radio-button-${crypto.randomUUID()}`
  @Output() change = new EventEmitter<boolean>()

  @Input() color: RadioButtonColor = 'primary'

  onCheckChange(checked: boolean): void {
    this.accessor.writeValue(this.value)
    this.accessor.propagateChange(this.value)
    this.change.emit(checked)
  }
}
