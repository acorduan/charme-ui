import { Component, EventEmitter, Inject, Input, Optional, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiqButtonModule } from '../../button';
import { AIQ_SELECT_ACCESSOR, AiqSelectAccessor } from '../aiq-select-accessor';
import { AiqCheckboxModule } from '../../aiq-checkbox';
import { AIQ_SELECT_GROUP_ACCESSOR, AiqSelectGroupAccessor } from '../aiq-select-group/aiq-select-group-accessor';

@Component({
  selector: 'aiq-select-option',
  standalone: true,
  imports: [CommonModule, AiqButtonModule, AiqCheckboxModule],
  templateUrl: './aiq-select-option.component.html',
  styleUrls: ['./aiq-select-option.component.scss']
})
export class AiqSelectOptionComponent {
  @Input({ required: true}) label!: string
  @Input() value?: any
  @Input()
  get disabled(): boolean {
    return (this.group && this.group.disabled) || this.#disabled
  }
  set disabled(value: boolean) {
    this.#disabled = value
  }

  @Output() onChange = new EventEmitter<AiqSelectOptionComponent>()

  selected = false
  #disabled = false

  get multiple() {
    return this.parent && this.parent.multiple
  }

  get hasGroup() {
    return this.group !== null && this.group !== undefined
  }

  constructor(
    @Optional() @Inject(AIQ_SELECT_ACCESSOR) private parent: AiqSelectAccessor,
    @Optional() @Inject(AIQ_SELECT_GROUP_ACCESSOR) private group: AiqSelectGroupAccessor
  ) {}

  onClick(): void {
    this.onChange.emit(this)
  }

  select(){
    this.selected = true
  }

  deselect(){
    this.selected = false
  }

  enable(){
    this.disabled = false
  }

  disable(){
    this.disabled = true
  }
}
