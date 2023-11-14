import { Component, Input } from "@angular/core";
import { CommonModule, NgClass } from "@angular/common";

@Component({
  selector: 'aiq-divider',
  standalone: true,
  imports: [
    NgClass,
    CommonModule,
  ],
  styleUrls: ['./aiq-divider.style.scss'],
  template: `
      <div [style.height]="direction === 'vertical'? size : '1px'"
           [style.width]="direction === 'horizontal'? size : '1px'"
           [ngClass]="{
         'aiq-vertical-divider': direction === 'vertical',
         'aiq-horizontal-divider': direction === 'horizontal'
         }"
           class="border-primary">
      </div>`
})
export class AiqDividerComponent {

  @Input() size = '24px';
  @Input() direction: 'horizontal' | 'vertical' = 'vertical';


}
