import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiqCheckboxDirective } from './aiq-checkbox.directive';



@NgModule({
  declarations: [
    AiqCheckboxDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    AiqCheckboxDirective
  ]
})
export class AiqCheckboxModule { }
