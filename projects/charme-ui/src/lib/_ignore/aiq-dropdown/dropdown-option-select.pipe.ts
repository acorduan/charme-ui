import { Pipe, PipeTransform } from "@angular/core";
import { NestedValuePipe } from "../aiq-template-directive";

@Pipe({
  name: 'optionSelected'
})
export class DropdownOptionSelectPipe implements PipeTransform {
  transform(value: any, option: any, optionLabel: string, valueAsProp: boolean): boolean {
    if (valueAsProp) {
      return false;
    }
    if (!optionLabel) {
      return value === option;
    }

    if (option.value !== undefined) {
      return option.value === value?.value;
    }

    const nestedValuePipe = new NestedValuePipe()
    return value !== undefined && nestedValuePipe.transform(option, optionLabel) === nestedValuePipe.transform(value, optionLabel);
  }
}
