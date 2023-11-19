import {
  AfterViewInit,
  Component, ElementRef,
  Inject,
  TemplateRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { AiqMenuItemDirective } from "./aiq-menu-item.directive";
import { OVERLAY_DATA, OverlayRef } from "projects/charme-ui/src/lib/dialog/";

@Component({
  selector: 'aiq-menu',
  standalone: true,
  imports: [CommonModule, AiqMenuItemDirective],
  template: `
    <div class="aiq-overlay">
      <ng-container *ngTemplateOutlet="data.tpl; context: {data: data.data, ref: overlayRef}"></ng-container>
    </div>
  `
})
export class AiqMenuComponent implements AfterViewInit {

  constructor(@Inject(OVERLAY_DATA) public data: { data: any, tpl: TemplateRef<any> },
              public overlayRef: OverlayRef,
              private el: ElementRef) {
  }

  ngAfterViewInit() {
    const aiqMenuItems: HTMLCollection = this.el.nativeElement.getElementsByClassName('aiq-menu-item');
    Array.from(aiqMenuItems).forEach(item => {
      item.addEventListener('click', () => setTimeout(() => this.overlayRef.close()));
    });
  }

}
