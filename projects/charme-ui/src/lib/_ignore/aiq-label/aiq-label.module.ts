import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiqLabelDirective } from './aiq-label.directive';


@NgModule({
  declarations: [
    AiqLabelDirective
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    AiqLabelDirective
  ]
})
export class AiqLabelModule { }
