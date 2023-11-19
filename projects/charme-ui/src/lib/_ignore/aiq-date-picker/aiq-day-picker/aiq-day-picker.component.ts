import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  Output,
  Pipe,
  PipeTransform,
  signal
} from "@angular/core";
import {
  FormStyle,
  getLocaleDayNames,
  getLocaleMonthNames,
  NgClass,
  NgForOf,
  NgIf,
  SlicePipe,
  TranslationWidth
} from "@angular/common";
import {
  AiqMonthPickerComponent
} from "../aiq-month-picker/aiq-month-picker.component";
import {
  AiqYearPickerComponent
} from "../aiq-year-picker/aiq-year-picker.component";
import { AiqButtonModule } from "../../button";
import { AiqMenuDirective } from "../../aiq-menu";


const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getDate() === date2.getDate() &&
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
}

@Pipe({
  name: 'isSelectedDay',
  standalone: true
})
export class IsSelectedDatePipe implements PipeTransform {
  transform(date: Date, selectedDate: undefined | Date): boolean {
    return selectedDate !== undefined ? isSameDay(date, selectedDate) : false
  }
}


@Pipe({
  name: 'isToday',
  standalone: true
})
class TodayPipe implements PipeTransform {
  transform(date: Date): boolean {
    const today = new Date()
    return isSameDay(date, today)
  }
}


@Component({
  selector: 'aiq-day-picker',
  standalone: true,
  imports: [
    AiqButtonModule,
    SlicePipe,
    IsSelectedDatePipe,
    NgClass,
    NgForOf,
    TodayPipe,
    AiqMenuDirective,
    AiqMonthPickerComponent,
    AiqYearPickerComponent,
    NgIf
  ],
  templateUrl: './aiq-day-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AiqDayPickerComponent {
  readonly MONTHS_LABEL: ReadonlyArray<string>;
  readonly DAYS_OF_WEEK_LABEL: ReadonlyArray<string>;
  readonly TODAY = new Date()

  $selectedDate = signal<Date | undefined>(undefined)

  @Input() set selectedDate(value: Date | string | number | undefined) {
    value = value ? new Date(value) : undefined
    if (this.$selectedDate() === undefined || value === undefined || !isSameDay(value, this.$selectedDate() as Date)) {
      this.$selectedDate.set(value)
      this.$displayedYear.set(value?.getFullYear() ?? new Date().getFullYear())
      this.$displayedMonth.set(value?.getMonth() ?? new Date().getMonth())
    }
  }

  @Output() selectedDateChange = new EventEmitter<Date>()

  $displayedYear = signal<number>(this.TODAY.getFullYear())

  @Input() set displayedYear(value: number) {
    this.$displayedYear.set(value)
  }

  $displayedMonth = signal<number>(this.TODAY.getMonth())

  @Input() set displayedMonth(value: number) {
    this.$displayedMonth.set(value)
  }

  $min = signal<Date | undefined>(undefined)

  @Input() set min(value: Date | number | string | undefined) {
    value = value ? new Date(value) : undefined
    this.$min.set(value)
  }

  $max = signal<Date | undefined>(undefined)

  @Input() set max(value: Date | number | string | undefined) {
    value = value ? new Date(value) : undefined
    this.$max.set(value)
  }

  constructor(@Inject(LOCALE_ID) public locale: string) {
    this.DAYS_OF_WEEK_LABEL = getLocaleDayNames(this.locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
    this.MONTHS_LABEL = getLocaleMonthNames(this.locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
  }

  $datesInPreviousMonth = computed(() => {
    const lastDay = this.lastDayByMonthAndYear(this.$displayedMonth() - 1, this.$displayedYear());
    return this.getDaysFromLastDay(lastDay, this.$displayedMonth() - 1, this.$displayedYear());
  });

  $datesInCurrentMonth = computed(() => {
    const lastDay = this.lastDayByMonthAndYear(this.$displayedMonth(), this.$displayedYear());
    return this.getDaysFromLastDay(lastDay, this.$displayedMonth(), this.$displayedYear());
  });

  $datesInNextMonth = computed(() => {
    const nextYear = this.$displayedMonth() + 1 !== 12 ? this.$displayedYear() : this.$displayedYear() + 1;
    const lastDay = this.lastDayByMonthAndYear(this.$displayedMonth() + 1, this.$displayedYear());
    return this.getDaysFromLastDay(lastDay, this.$displayedMonth() + 1, nextYear);
  });

  lastDayByMonthAndYear(month: number, year: number): Date {
    return new Date(year, month + 1, 0);
  }

  getDaysFromLastDay(lastDay: Date, month: number, year: number): Date[] {
    const numberOfDays = lastDay.getDate();
    const dates: Date[] = []
    for (let i = numberOfDays; i > 0; i--) {
      const date = new Date(year, month, i)
      dates.push(date);
    }
    return dates.reverse();
  }

  disabled(date: Date): boolean {
    const max = this.$max()
    const min = this.$min()

    const minDisabled = min !== undefined ? date.getTime() < min.getTime() : false
    const maxDisabled = max !== undefined ? date.getTime() > max.getTime() : false

    return minDisabled || maxDisabled
  }

  onSelectDate(date: Date): void {
    this.$selectedDate.set(date)
    this.selectedDateChange.emit(date)
  }

  onNextMonthClick(): void {
    if (this.$displayedMonth() === 11) {
      this.$displayedYear.set(this.$displayedYear() + 1)
    }
    this.$displayedMonth.set((this.$displayedMonth() + 1) % 12)
  }

  onPreviousMonthClick(): void {
    if (this.$displayedMonth() === 0) {
      this.$displayedYear.set(this.$displayedYear() - 1)
    }
    this.$displayedMonth.set(((this.$displayedMonth() - 1) + 12) % 12)
  }
}
