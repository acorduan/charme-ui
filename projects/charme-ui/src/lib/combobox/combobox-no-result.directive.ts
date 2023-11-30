import { Directive, inject } from '@angular/core'
import { ComboboxDirective } from './combobox.directive'

@Directive({
  standalone: true,
  selector: '[c-combo-no-result]',
  host: {
    '[class.hidden]': '!display'
  }
})
export class ComboboxNoResultDirective {
  readonly #combobox = inject(ComboboxDirective)
  display = false

  constructor() {
    this.#combobox.registerNoResult(this)
  }
}
