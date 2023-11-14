import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass, NgIf } from "@angular/common";

@Component({
  selector: 'aiq-toggle',
  templateUrl: './aiq-toggle.component.html',
  styleUrls: ['./aiq-toggle.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    NgIf

  ]
})
export class ToggleComponent {

  @Input() checked = false
  @Input() disabled = false
  @Input() id = crypto.randomUUID();
  @Input() label = '';
  @Output() toggle = new EventEmitter<boolean>();
  @Output() checkedChange = new EventEmitter<boolean>;


  onInput(checked: boolean) {
    this.checked = checked;
    this.checkedChange.emit(checked)
  }

}
