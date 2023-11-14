import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { AiqButtonModule } from "../button";
import { AiqMenuDirective } from "../aiq-menu";
import { AiqInputModule } from "../input";
import { NgSwitch, NgSwitchCase, NgTemplateOutlet } from "@angular/common";
import { AiqDatePickerType } from "./aiq-date-picker.model";
import { AiqFormContainerComponent } from "../aiq-form-container/index";
import { AiqYearPickerComponent } from "./aiq-year-picker/aiq-year-picker.component";
import { AiqMonthPickerComponent } from "./aiq-month-picker/aiq-month-picker.component";
import { AiqDayPickerComponent } from "./aiq-day-picker/aiq-day-picker.component";
import { OverlayRef } from "../overlay";
import {
  AiqDateTimePickerComponent
} from "./aiq-date-time-picker/aiq-date-time-picker.component";

@Component({
  selector: 'aiq-date-picker',
  templateUrl: './aiq-date-picker.component.html',
  styleUrls: ['./aiq-date-picker.component.scss'],
  standalone: true,
  imports: [
    AiqButtonModule,
    AiqMenuDirective,
    AiqInputModule,
    AiqFormContainerComponent,
    AiqYearPickerComponent,
    AiqMonthPickerComponent,
    AiqDayPickerComponent,
    NgTemplateOutlet,
    NgSwitch,
    NgSwitchCase,
    AiqDateTimePickerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AiqDatePickerComponent {
  $datePickerType = signal<AiqDatePickerType>('date');
  @Input() set type(value: AiqDatePickerType) {
    this.$datePickerType.set(value);
  }

  @Input() label = ''

  $selectedDate = signal<Date | undefined>(undefined)
  @Input() set value(date: Date | string | number | undefined) {
    date = date ? new Date(date) : undefined
    this.$selectedDate.set(date)
  }

  @Output() valueChange = new EventEmitter<Date>();

  $min = signal<Date | undefined>(undefined)
  @Input() set min(value: Date | undefined) {
    value = value ? new Date(value) : undefined
    this.$min.set(value)
  }

  $max = signal<Date | undefined>(undefined)
  @Input() set max(value: Date | undefined) {
    value = value ? new Date(value) : undefined
    this.$max.set(value)
  }

  $inputType = computed(() => {
    const datePickerType = this.$datePickerType()
    if (datePickerType === 'date') {
      return 'date'
    }

    if (datePickerType === 'datetime') {
      return 'datetime-local'
    }

    if (datePickerType === 'year') {
      return 'number'
    }

    return 'text'
  })
  $inputValue = computed(() => {
    const type = this.$datePickerType()
    const value = this.$selectedDate()
    if (type && value) {
      return dateToInputString(value, type)
    }

    return  ''
  })

  onDayPickerSelect(event: Date, ref: OverlayRef): void {
    this.$selectedDate.set(event)
    this.valueChange.emit(event)
    ref.close()
  }
}


function dateToInputString(date: Date, type: AiqDatePickerType): string {
  const yearString = date.getFullYear()
  const monthString = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const dayString = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const hourString = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const minuteString = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()

  if (type === 'datetime') {
    return `${yearString}-${monthString}-${dayString}T${hourString}:${minuteString}`
  }

  return `${yearString}-${monthString}-${dayString}`
}
