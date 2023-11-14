import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewEncapsulation
} from "@angular/core";
import { AiqDropdownModule } from "../../aiq-dropdown";

interface TimeOption {
  label: string;
  value: number | undefined
}

import { Pipe, PipeTransform } from '@angular/core';

const getDeepValue = (value: any, key: string): any => {
  const keys = key?.split('.');
  keys?.forEach((_key: string) => {
    value = value?.[_key];
  });
  return value;
}



@Pipe({
  name: 'find',
  standalone: true
})
export class FindPipe implements PipeTransform {

  transform(value: Array<unknown>, nestedAttr: string, equalTo: unknown): unknown | undefined {
    return value.find(item => getDeepValue(item, nestedAttr) === equalTo);
  }

}


@Component({
  selector: 'aiq-time-picker',
  standalone: true,
  imports: [
    AiqDropdownModule,
    FindPipe
  ],
  styleUrls: ['./aiq-time-picker.component.scss'],
  templateUrl: './aiq-time-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AiqTimePickerComponent {

  readonly HOURS: TimeOption[] = formatArray(ArrayFrom(24))
  readonly MINUTES: TimeOption[] = formatArray(ArrayFrom(60))

  $selectedHour = signal<number | undefined>(undefined)
  @Input() set selectedHour(value: number | undefined) {
    this.$selectedHour.set(value)
  }

  @Output() selectHourChange = new EventEmitter<number | undefined>()

  $selectedMinute = signal<number | undefined>(undefined)
  @Input() set selectedMinute(value: number | undefined) {
    this.$selectedMinute.set(value)
  }

  @Output() selectMinuteChange = new EventEmitter<number | undefined>()

  onSelectHour(event: TimeOption): void {
    this.$selectedHour.set(event.value)
    this.selectHourChange.emit(event.value)
  }

  onSelectMinute(event: TimeOption): void {
    this.$selectedMinute.set(event.value)
    this.selectMinuteChange.emit(event.value)
  }
}


function ArrayFrom(number: number): number[] {
  return Array.from(Array(number).keys())
}

function formatArray(array: number[]): TimeOption[] {
  const toReturn: TimeOption[] = array.map((item: number) => {
    return {
      value: item,
      label: item < 10 ? '0' + item : item.toString()
    }
  })

  toReturn.unshift({label: '--', value: undefined})

  return toReturn
}
