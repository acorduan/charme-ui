import { computed, Directive, inject } from '@angular/core'
import { C_COMBOBOX_ACCESSOR } from './combobox.model'

@Directive({
  standalone: true,
  selector: '[c-combo-no-result]',
  host: {
    '[class.hidden]': '!$display()'
  }
})
export class ComboboxNoResultDirective {
  readonly #combobox = inject(C_COMBOBOX_ACCESSOR)
  $display = computed(() => this.#combobox.$displayedOptions().length === 0)
}
