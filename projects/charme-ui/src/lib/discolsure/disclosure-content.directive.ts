import { AfterContentInit, computed, Directive, ElementRef, inject, signal } from '@angular/core'
import { C_DISCLOSURE_ACCESSOR } from './disclosure.model'

@Directive({
  standalone: true,
  selector: '[c-disclosure-content]',
  host: {
    class: 'h-0 overflow-hidden transition-all',
    '[id]': 'id',
    '[style.height]': '$height() + \'px\''
  }
})
export class DisclosureContentDirective implements AfterContentInit {
  readonly #accessor = inject(C_DISCLOSURE_ACCESSOR)
  readonly #el = inject(ElementRef<HTMLElement>)

  $height = computed(() => {
    const open = this.#accessor.$open()
    const scrollHeight = this.$scrollHeight()
    return open ? scrollHeight : 0
  })

  $scrollHeight = signal(0)

  ngAfterContentInit(): void {
    this.$scrollHeight.set(this.#el.nativeElement.scrollHeight)
  }

  get id(): string {
    return this.#accessor.id
  }
}
