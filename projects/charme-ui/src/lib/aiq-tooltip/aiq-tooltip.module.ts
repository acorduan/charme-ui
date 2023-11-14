import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiqTooltipDirective } from "./aiq-tooltip.directive";
import { TooltipComponent } from "./tooltip.component";

@NgModule({
  declarations: [
    AiqTooltipDirective,
    TooltipComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AiqTooltipDirective,
    TooltipComponent
  ]
})
export class AiqTooltipModule { }
