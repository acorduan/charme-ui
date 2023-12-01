import { AfterViewInit, Directive, ElementRef, HostListener, inject, Input } from '@angular/core'

@Directive({
  selector: '[overlay-guard-focus]',
  standalone: true,
  host: {
    tabindex: '0',
    'aria-hidden': 'true',
    class: 'fixed opacity-0 pointer-events-none outline-0'
  }
})
export class OverlayGuardFocusGardDirective implements AfterViewInit {
  guardEl = inject(ElementRef)

  @Input({ required: true }) el!: ElementRef<HTMLElement>
  @Input({ required: true }) position!: 'first' | 'last'

  focusableElements: NodeListOf<any> | undefined = undefined

  @HostListener('focus') onFocus(): void {
    if (this.focusableElements !== undefined && this.focusableElements.length > 0) {
      this.position === 'first' ? this.focusLast() : this.focusFirst()
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const component = this.el.nativeElement.children[1]
      this.focusableElements = component?.querySelectorAll(
        'a[href]:not([tabindex="-1"]), button:not([tabindex="-1"]), input:not([tabindex="-1"]), textarea:not([tabindex="-1"]), select:not([tabindex="-1"]), details:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'
      )

      if (this.focusableElements !== undefined && this.focusableElements.length > 0) {
        this.focusableElements[0].focus()
      } else {
        this.guardEl.nativeElement.focus()
      }
    })
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
