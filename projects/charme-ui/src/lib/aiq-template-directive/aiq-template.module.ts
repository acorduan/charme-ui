import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyDirective } from './body.directive';
import { FooterDirective } from './footer.directive';
import { HeaderDirective } from './header.directive';
import { LoaderDirective } from './loader.directive';
import { NestedValuePipe } from "./nested-value.pipe";
import { DynamicPipe } from "./dynamic.pipe";
import { DynamicDirective } from "./dynamic.directive";

@NgModule({
  declarations: [
    BodyDirective,
    FooterDirective,
    HeaderDirective,
    LoaderDirective,
    NestedValuePipe,
    DynamicPipe,
    DynamicDirective
  ],
  imports: [CommonModule],
  exports: [
    BodyDirective,
    FooterDirective,
    HeaderDirective,
    LoaderDirective,
    NestedValuePipe,
    DynamicPipe,
    DynamicDirective
  ],
})
export class AiqTemplateModule {}
