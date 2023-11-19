import { ChangeDetectionStrategy, Component, computed, EventEmitter, Input, Output, signal } from "@angular/core";
import { AiqButtonModule } from "../../button";
import { NgFor } from "@angular/common";

@Component({
  selector: 'aiq-year-picker',
  standalone: true,
  imports: [
    AiqButtonModule,
    NgFor
  ],
  templateUrl: './aiq-year-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AiqYearPickerComponent {

  readonly TODAY = new Date()
  readonly MAX_NUMBER_YEARS_VIEWABLE: number = 20;

  $selectedYear = signal<number | undefined>(undefined)
  @Input() set selectedYear(value: number) {
    this.$selectedYear.set(value)
    this.$displayedYear.set(value)
  }

  @Output() selectedYearChange = new EventEmitter<number>()

  $displayedYear = signal(this.TODAY.getFullYear())

  $years = computed(() => {
    const max = this.$displayedYear()
    const years = [];

    for (let i = max; i > (max - this.MAX_NUMBER_YEARS_VIEWABLE); i--) {
      years.push(i)
    }
    return years.reverse();
  })

  onPreviousYearBatchClick(): void {
    this.$displayedYear.set(this.$displayedYear() - this.MAX_NUMBER_YEARS_VIEWABLE);
  }

  onNextYearBatchClick(): void {
    this.$displayedYear.set(this.$displayedYear() + this.MAX_NUMBER_YEARS_VIEWABLE);
  }

  onSelectYearClick(year: number): void {
    this.$selectedYear.set(year)
    this.selectedYearChange.emit(year)
  }


}
