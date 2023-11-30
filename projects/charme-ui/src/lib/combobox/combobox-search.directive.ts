import { Directive, ElementRef, HostListener, inject } from '@angular/core'
import { ComboboxDirective } from './combobox.directive'

@Directive({
  selector: 'input[c-combo-search]',
  standalone: true,
  host: {
    class: 'outline-none indent-2 h-8 text-sm min-w-0'
  }
})
export class ComboboxSearchDirective {
  readonly #combobox = inject(ComboboxDirective)
  readonly el = inject(ElementRef<HTMLInputElement>)

  @HostListener('input', ['$event']) search(event: InputEvent): void {
    this.#combobox.onSearch(event)
  }

  constructor() {
    this.#combobox.registerInput(this)
  }
}
