import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiqRadioButtonDirective } from './aiq-radio-button.directive';



@NgModule({
  declarations: [
    AiqRadioButtonDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    AiqRadioButtonDirective
  ]
})
export class AiqRadioButtonModule { }
