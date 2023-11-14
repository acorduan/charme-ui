import { Component, effect, EventEmitter, Input, Output, signal } from "@angular/core";
import {
  AiqDayPickerComponent
} from "../aiq-day-picker/aiq-day-picker.component";
import {
  AiqTimePickerComponent
} from "../aiq-time-picker/aiq-time-picker.component";
import { AiqButtonModule } from "../../button";
import { AiqDividerComponent } from "../../aiq-divider";

@Component({
  selector: 'aiq-date-time-picker',
  standalone: true,
  imports: [
    AiqDayPickerComponent,
    AiqTimePickerComponent,
    AiqDividerComponent,
    AiqButtonModule
  ],
  templateUrl: './aiq-date-time-picker.component.html'
})
export class AiqDateTimePickerComponent {

  $selectedDate = signal<Date | undefined>(undefined)

  @Input() set selectedDate(date: Date | number | string | undefined) {
    date = date ? new Date(date) : undefined
    this.$selectedDate.set(date)
    this.$selectedHour.set(date?.getHours())
    this.$selectedMinute.set(date?.getMinutes())
  }

  @Output() selectedDateChange = new EventEmitter<Date>();
  @Output() cancelClick = new EventEmitter<void>()

  $selectedHour = signal<number | undefined>(undefined)
  $selectedMinute = signal<number | undefined>(undefined)

  $min = signal<Date | undefined>(undefined)
  @Input() set min(value: Date | string | number | undefined) {
    value = value ? new Date(value) : undefined
    this.$min.set(value)
  }

  $max = signal<Date | undefined>(undefined)
  @Input() set max(value: Date | number  | string | undefined) {
    value = value ? new Date(value) : undefined
    this.$max.set(value)
  }

  onSaveClick(): void {
    const date = this.$selectedDate()
    const hour = this.$selectedHour()
    const minute = this.$selectedMinute()
    if (date !== undefined && hour !== undefined  && minute !== undefined) {
      date.setMinutes(minute)
      date.setHours(hour)
      this.selectedDateChange.emit(date)
    }
  }
}
