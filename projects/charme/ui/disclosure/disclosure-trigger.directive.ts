import { Directive, HostListener, inject } from '@angular/core'
import { C_DISCLOSURE_ACCESSOR } from './disclosure.model'

@Directive({
  standalone: true,
  selector: '[c-disclosure-trigger]',
  host: {
    '[attr.aria-expanded]': 'expanded',
    '[attr.aria-controls]': 'id'
  }
})
export class DisclosureTriggerDirective {
  readonly #accessor = inject(C_DISCLOSURE_ACCESSOR)

  @HostListener('click') onClick(): void {
    this.#accessor.toggle()
  }

  get expanded(): boolean {
    return this.#accessor.$open()
  }

  get id(): string {
    return this.#accessor.id
  }
}
