import { AfterViewInit, Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: '[dialog-focus-guard]',
  standalone: true
})
export class DialogFocusGardDirective implements AfterViewInit {

  @Input({required: true}) dialogElementRef!: ElementRef<HTMLElement>
  @Input({required: true}) position!: 'first' | 'last'

  focusableElements: NodeListOf<any> | undefined = undefined

  @HostListener('focus') onFocus(): void {
    if (this.focusableElements !== undefined && this.focusableElements.length > 0) {
      this.position === 'first' ? this.focusLast() : this.focusFirst()
    }
  }

  ngAfterViewInit() {
    const component = this.dialogElementRef.nativeElement.children[1]
    this.focusableElements = component?.querySelectorAll(
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
    )
    if (this.focusableElements !== undefined && this.focusableElements.length > 0) {
      this.focusableElements[0].focus()
    } else {
      this.dialogElementRef.nativeElement.focus()
    }
  }

  focusFirst(): void {
    if (this.focusableElements !== undefined && this.focusableElements.length > 0) {
      this.focusableElements[0].focus()
    }
  }


  focusLast(): void {
    if (this.focusableElements !== undefined && this.focusableElements.length > 0) {
      this.focusableElements[this.focusableElements.length - 1].focus()
    }
  }


}
