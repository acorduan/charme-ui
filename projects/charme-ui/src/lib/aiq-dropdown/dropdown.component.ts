import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { DropdownButtonDirective } from "./dropdown-button.directive";

@Component({
  selector: 'aiq-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements OnInit {

  buttonTpl!: TemplateRef<any>;

  @ContentChild(DropdownButtonDirective, {static: true}) set button(value: DropdownButtonDirective) {
    this.buttonTpl = value?.tpl;
  }

  _options: any[] = [];
  @Input() set options(value: any[]) {
    this._options = value;
    setTimeout(() => {
      if (!this.multipleSelect && this.allowClear) {
        this._options?.unshift(this.clearValue ?? "--");
      }
    });
  }
  @Input() value: any | undefined;
  @Input() label: string | undefined;
  @Input() optionLabel: string | undefined;
  @Input() placeholder: string | undefined;
  @Input() disabled = false;
  @Input() multipleSelect = false;
  @Input() open = false;
  @Input() valueAsProp = false;
  @Input() allowClear = false;
  @Input() clearValue?: string
  @Input() multipleLimit?: number
  @Input() hoverTrigger = false;

  @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onOptionClick(index: number, event: any): void {
    event.stopPropagation();
    if (!this.multipleSelect) {
      this.value = this.allowClear && index === 0 ? undefined : this._options[index];
      this.open = false;
      this.openChange.emit(this.open);
    } else {
      this.value = this.value ?? [];
      const indexInValue = this.value.indexOf(this._options[index]);
      indexInValue !== -1 ? this.value.splice(indexInValue, 1) : this.value.push(this._options[index]);
    }
    this.valueChange.emit(this.value);
  }

  onDropdownClick(): void {
    this.open = !this.open;
    this.openChange.emit(this.open);
  }

  onBackdropClick(): void {
    this.open = false;
    this.openChange.emit(this.open);
  }
}
