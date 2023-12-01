import { computed, Directive, HostListener, inject, Input, signal } from '@angular/core'
import { OverlayRef } from '../overlay/overlay.model'
import { C_COMBOBOX_ACCESSOR, C_COMBOBOX_TRIGGER_ACCESSOR } from './combobox.model'

@Directive({
  standalone: true,
  selector: '[c-combo-option]',
  host: {
    role: 'option',
    tabindex: '-1',
    class: 'justify-between outline-none',
    '[attr.data-selected]': '$selected()',
    '[attr.aria-selected]': '$selected()',
    '[class.hidden]': '!$display()',
    type: 'button'
  }
})
export class ComboboxOptionDirective {
  readonly #combobox = inject(C_COMBOBOX_ACCESSOR)
  readonly #overlayRef = inject(OverlayRef)
  readonly #valueAccessor = inject(C_COMBOBOX_TRIGGER_ACCESSOR)
  @Input({ required: true }) value!: string | number
  $index = signal(0)
  $selected = computed(() => this.#combobox.$selectedIndex() === this.$index())
  $display = signal(true)

  @HostListener('click') onClick(): void {
    this.#valueAccessor.value = this.value
    this.#valueAccessor.propagateChange(this.value)
    this.#overlayRef.close()
  }

  @HostListener('mouseenter') onHover(): void {
    this.#combobox.$selectedIndex.set(this.$index())
  }
}
