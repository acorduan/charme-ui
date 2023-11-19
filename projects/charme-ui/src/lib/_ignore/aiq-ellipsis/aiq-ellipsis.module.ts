import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiqEllipsisDirective } from './aiq-ellipsis.directive';

@NgModule({
  declarations: [
    AiqEllipsisDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AiqEllipsisDirective
  ]
})
export class AiqEllipsisModule { }
