import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  Output,
  signal
} from "@angular/core";
import { AiqButtonModule } from "../../button";
import { FormStyle, getLocaleMonthNames, NgForOf, TranslationWidth } from "@angular/common";

@Component({
  selector: 'aiq-month-picker',
  standalone: true,
  imports: [
    AiqButtonModule,
    NgForOf
  ],
  templateUrl: './aiq-month-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AiqMonthPickerComponent {
  readonly MONTHS_LABEL: ReadonlyArray<string>;

  $selectedMonth = signal<number | undefined>(undefined)
  @Input() set selectedMonth(value: number) {
    this.$selectedMonth.set(value)
  }

  constructor(@Inject(LOCALE_ID) public locale: string) {
    this.MONTHS_LABEL = getLocaleMonthNames(this.locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
  }

  @Output() selectedMonthChange = new EventEmitter<number>()

  onSelectMonthClick(month: number): void {
    this.$selectedMonth.set(month)
    this.selectedMonthChange.emit(month)
  }

}
