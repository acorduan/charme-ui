import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { FormsModule } from "@angular/forms";
import { DropdownButtonDirective } from "./dropdown-button.directive";
import { AiqEllipsisModule } from "../aiq-ellipsis";
import { DropdownMultipleSelectPipe } from "./dropdown-multiple-select.pipe";
import { DropdownOptionSelectPipe } from './dropdown-option-select.pipe';
import { AiqMenuDirective } from "../aiq-menu";
import { AiqButtonModule } from "../button";
import { AiqCheckboxModule } from "../checkbox";
import { AiqInputModule } from "../input";
import { AiqTemplateModule } from '../aiq-template-directive';

@NgModule({
  declarations: [
    DropdownComponent,
    DropdownButtonDirective,
    DropdownMultipleSelectPipe,
    DropdownOptionSelectPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    AiqEllipsisModule,
    AiqMenuDirective,
    AiqButtonModule,
    AiqCheckboxModule,
    AiqInputModule,
    AiqTemplateModule
  ],
  exports: [
    DropdownComponent,
    DropdownButtonDirective,
  ]
})
export class AiqDropdownModule {
}
