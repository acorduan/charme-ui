import { AfterViewInit, Directive, ElementRef, HostBinding, inject, OnDestroy, OnInit } from '@angular/core';
import { AiqTooltipDirective } from "../aiq-tooltip";

@Directive({
  selector: '[aiq-ellipsis]'
})
export class AiqEllipsisDirective extends AiqTooltipDirective implements OnInit, OnDestroy, AfterViewInit {

  @HostBinding('class') elementClass = 'aiq-ellipsis';

  #el = inject(ElementRef);
  observer!: ResizeObserver;
  override showToolTip = false;

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.observer = new ResizeObserver(() => {
        this.initTooltipBehavior();
      });
      this.observer.observe(this.#el.nativeElement);
    });

    setTimeout(() => {
      this.#el.nativeElement.addEventListener('DOMCharacterDataModified', this.initTooltipBehavior.bind(this))
    })
  }

  initTooltipBehavior(): void {
    if ((this.#el.nativeElement.offsetWidth) < this.#el.nativeElement.scrollWidth) {
      this.showToolTip = true;
      this.text = this.#el.nativeElement.innerText;
    } else {
      this.showToolTip = false;
    }
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.#el.nativeElement.removeEventListener('DOMCharacterDataModified', this.initTooltipBehavior);
    this.observer?.unobserve(this.#el.nativeElement);
  }
}
