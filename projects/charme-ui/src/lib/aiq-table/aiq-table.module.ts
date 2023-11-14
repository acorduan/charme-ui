import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AiqDynamicDirective } from './aiq-dynamic.directive';
import { AiqDynamicPipe } from './aiq-dynamic.pipe';
import { AiqNestedValuePipe } from './aiq-nested-value.pipe';
import { AiqSafeHtmlPipe } from './aiq-safe-html.pipe';
import { AiqTableComponent } from './aiq-table.component';

@NgModule({
    imports: [CommonModule],
    exports: [AiqTableComponent, AiqDynamicPipe, AiqNestedValuePipe, AiqDynamicDirective, AiqSafeHtmlPipe ],
    declarations: [AiqTableComponent, AiqDynamicPipe, AiqNestedValuePipe, AiqDynamicDirective, AiqSafeHtmlPipe],
    providers: [],
})
export class AiqTableModule { }
