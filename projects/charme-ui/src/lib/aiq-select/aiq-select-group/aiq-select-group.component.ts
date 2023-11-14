import { Component, ContentChildren, Input, QueryList, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiqSelectOptionComponent } from '../aiq-select-option/aiq-select-option.component';
import { AIQ_SELECT_GROUP_ACCESSOR } from './aiq-select-group-accessor';


@Component({
  selector: 'aiq-select-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aiq-select-group.component.html',
  styleUrls: ['./aiq-select-group.component.scss'],
  providers: [{ provide: AIQ_SELECT_GROUP_ACCESSOR, useExisting: forwardRef(() => AiqSelectGroupComponent) }],
})
export class AiqSelectGroupComponent {
  @Input({ required: true}) label!: string
  @Input() disabled: boolean = false
  
  @ContentChildren(AiqSelectOptionComponent, { descendants: true }) options?: QueryList<AiqSelectOptionComponent>
}
