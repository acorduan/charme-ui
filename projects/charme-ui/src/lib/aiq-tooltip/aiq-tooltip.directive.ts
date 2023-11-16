import { Directive, ElementRef, HostListener, inject, Input, OnDestroy, TemplateRef } from '@angular/core';
import { DialogAnimationType } from "../dialog";
import { DialogService, OverlayRef } from "../dialog";
import { TooltipComponent } from "./tooltip.component";


export type TooltipPosition = 'top-center' | 'bottom-center';

@Directive({
  selector: '[aiqTooltip]'
})
export class AiqTooltipDirective implements OnDestroy {

  @Input() contentTemplate: TemplateRef<any> | undefined;
  @Input() tooltipDelay = undefined; //ms
  @Input('aiqTooltip') text: string | undefined;
  @Input() showToolTip = true;
  @Input() position: TooltipPosition = 'bottom-center';
  @Input() tooltipContainerClass?: string

  #el = inject(ElementRef);
  #overlay = inject(DialogService);
  #overlayRef: OverlayRef | undefined;
  #timeout: number | undefined = undefined;


  @HostListener('mouseleave', ['$event'])
  omMouseLeave(): void {
    this.close();
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(): void {
    if (this.tooltipDelay) {
      this.#timeout = setTimeout(() => this.open(), this.tooltipDelay);
      return;
    }

    this.open();
  }

  private open(): void {
    this.#overlayRef?.close();
    if (this.showToolTip) {
      const elementPos = this.position === 'bottom-center' ? 'bottomcenter' : 'topcenter';
      const dialogPos = this.position === 'bottom-center' ? 'topcenter' : 'bottomcenter';
      this.#overlayRef = this.#overlay.open(TooltipComponent, {
        attachedTo: {elementRef: this.#el, elementPos, dialogPos, pxAdder: 5},
        overlay: 'none',
        data: {text: this.text, tpl: this.contentTemplate, containerClass: this.tooltipContainerClass }
      });
    }
  }

  private close(): void {
    clearTimeout(this.#timeout);
    this.#timeout = undefined;
    this.#overlayRef?.close();
  }

  ngOnDestroy() {
    this.close();
  }

}
