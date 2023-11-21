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

@Component({
  standalone: true,
  selector: 'c-radio-button',
  imports: [
    RadioButtonDirective,
    FormsModule
  ],
  templateUrl: 'radio-button.component.html',
  styleUrl: 'radio-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'flex items-center gap-2'
  }
})
export class RadioButtonComponent {
  @Input({ required: true }) value: any

  accessor = inject(C_RADIO_GROUP_ACCESSOR)

  $checked = computed(() => {
    const value = this.accessor.$value()
    return value !== null && value !== undefined ? value === this.value : false
  })

  @Input({ transform: booleanAttribute }) disabled: any = false
  @Input() id: string = `radio-button-${crypto.randomUUID()}`
  @Output() change = new EventEmitter<boolean>()

  onCheckChange(checked: boolean): void {
    this.accessor.writeValue(this.value)
    this.accessor.propagateChange(this.value)
    this.change.emit(checked)
  }
}
