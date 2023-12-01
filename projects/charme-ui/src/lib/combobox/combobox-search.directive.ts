import { Directive, ElementRef, HostListener, inject } from '@angular/core'
import { C_COMBOBOX_ACCESSOR } from './combobox.model'

@Directive({
  selector: 'input[c-combo-search]',
  standalone: true,
  host: {
    class: 'outline-none indent-2 h-8 text-sm min-w-0 bg-transparent'
  }
})
export class ComboboxSearchDirective {
  readonly #combobox = inject(C_COMBOBOX_ACCESSOR)
  readonly el = inject(ElementRef<HTMLInputElement>)

  @HostListener('input', ['$event']) search(event: InputEvent): void {
    this.#combobox.onSearch(event)
  }
}
