import { computed, ContentChildren, Directive, inject, Query, QueryList, signal } from '@angular/core'
import { ComboboxOptionDirective } from '@charme-ui'
import { C_COMBOBOX_ACCESSOR } from './combobox.model'

@Directive({
  standalone: true,
  selector: '[c-combo-group]',
  host: {
    '[class.hidden]': '!$display()',
    role: 'group'
  }
})
export class ComboboxGroupDirective {
  readonly #combobox = inject(C_COMBOBOX_ACCESSOR)

  $groupOptions = signal<QueryList<ComboboxOptionDirective> | undefined>(undefined)
  @ContentChildren(ComboboxOptionDirective, { descendants: true }) set options(value: QueryList<ComboboxOptionDirective>) {
    this.$groupOptions.set(value)
  }

  $display = computed(() => {
    const groupOptions = this.$groupOptions()
    const displayedOptions = this.#combobox.$displayedOptions()
    return groupOptions?.some(groupOption => displayedOptions.some(displayOption => displayOption.id === groupOption.id)) ?? false
  })
}
