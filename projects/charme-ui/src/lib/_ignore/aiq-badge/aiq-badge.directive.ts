import { Directive, effect, ElementRef, Input, signal } from "@angular/core";

@Directive({
  selector: '[aiq-badge]',
  standalone: true
})
export class DataBadgeAnimatedDirective {

  private data = signal<string | undefined>(undefined)

  @Input('aiq-badge') set value(value: string | undefined) {
    this.data.set(value);
  }

  constructor(private element: ElementRef) {
    effect(() => {
      if (this.data() !== undefined) {
        this.element.nativeElement.setAttribute('data-badge', this.data())
      } else {
        this.element.nativeElement.removeAttribute('data-badge');
      }
    })
  }

}
