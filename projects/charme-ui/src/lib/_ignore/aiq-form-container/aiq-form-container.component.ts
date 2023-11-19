import { NgClass, NgIf } from '@angular/common';
import { Component, Input, TemplateRef, WritableSignal, signal } from '@angular/core';
import { AiqTooltipModule } from '../aiq-tooltip';

@Component({
  selector: 'aiq-form-container',
  templateUrl: './aiq-form-container.component.html',
  styleUrls: ['./aiq-form-container.component.scss'],
  standalone: true,
  imports: [NgIf, NgClass, AiqTooltipModule]
})
export class AiqFormContainerComponent {
  @Input() label?: string
  infoStr: WritableSignal<string | undefined> = signal(undefined);
  infoTpl: WritableSignal< TemplateRef<any> | undefined> = signal(undefined);
  @Input() set info(value: string | TemplateRef<any>) {
    if(value instanceof TemplateRef){
      this.infoTpl.set(value);
    } else {
      this.infoStr.set(value);
    }
  }
  @Input() error?: boolean
  @Input() disabled?: boolean
  @Input() tooltipContainerClass?: string
}
