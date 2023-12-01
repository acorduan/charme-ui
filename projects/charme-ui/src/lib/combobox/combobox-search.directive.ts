import { Directive, ElementRef, HostListener, inject, Input } from '@angular/core'
import { C_COMBOBOX_ACCESSOR } from './combobox.model'

@Directive({
  selector: 'input[c-combo-search]',
  standalone: true,
  host: {
    class: 'outline-none indent-2 h-8 text-sm min-w-0 bg-transparent',
    role: 'combobox',
    'aria-autocomplete': 'list'
  }
})
export class ComboboxSearchDirective {
  readonly #combobox = inject(C_COMBOBOX_ACCESSOR)
  readonly el = inject(ElementRef<HTMLInputElement>)

  @Input() set value(value: string) {
    this.#combobox.onSearch(value)
  }

  @HostListener('input', ['$event']) search(event: InputEvent): void {
    this.#combobox.onSearch((event.target as any).value)
  }
}
