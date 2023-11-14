import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogTemplateComponent } from "./dialog-template.component";



@NgModule({
  declarations: [DialogTemplateComponent],
  imports: [
    CommonModule
  ],
  exports: [DialogTemplateComponent]
})
export class DialogTemplateModule { }
