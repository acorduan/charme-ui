import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input, Output,
  signal
} from '@angular/core'
import { C_DISCLOSURE_ACCESSOR, CDisclosureAccessor } from './disclosure.model'

@Component({
  selector: 'c-disclosure',
  standalone: true,
  template: '<ng-content/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: C_DISCLOSURE_ACCESSOR, useExisting: forwardRef(() => DisclosureComponent) }
  ]
})
export class DisclosureComponent implements CDisclosureAccessor {
  id = `c-disclosure-${crypto.randomUUID()}`

  $open = signal(false)
  @Input({ transform: booleanAttribute }) set open(value: boolean) {
    this.$open.set(value)
  }

  get open(): boolean {
    return this.$open()
  }

  @Output() openChange = new EventEmitter<boolean>()

  toggle(): void {
    this.$open.set(!this.$open())
    this.openChange.emit(this.$open())
  }
}
