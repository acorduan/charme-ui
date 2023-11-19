import { Pipe, PipeTransform } from "@angular/core";
import { NestedValuePipe } from "../aiq-template-directive";

@Pipe({
  name: 'valueInOptions'
})
export class DropdownMultipleSelectPipe implements PipeTransform {

  transform(value: object | string, options: object[] | string[], optionLabel?: string): boolean {
    const nestedValuePipe = new NestedValuePipe()
    return optionLabel
      ? options.some((item) => nestedValuePipe.transform(item, optionLabel) === nestedValuePipe.transform(value, optionLabel))
      : options.some(item => item === value);
  }
}
