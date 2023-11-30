import { computed, Directive, HostListener, inject, Input, signal } from '@angular/core'
import { C_COMBOBOX_ACCESSOR } from './combobox-trigger.directive'
import { OverlayRef } from '../overlay/overlay.model'
import { ComboboxDirective } from './combobox.directive'

@Directive({
  standalone: true,
  selector: '[c-combo-option]',
  host: {
    role: 'option',
    tabindex: '-1',
    class: 'justify-between outline-none',
    '[attr.data-selected]': '$selected()',
    '[attr.aria-selected]': '$selected()',
    type: 'button'
  }
})
export class ComboboxOptionDirective {
  readonly #combobox = inject(ComboboxDirective)
  readonly #overlayRef = inject(OverlayRef)
  readonly #accessor = inject(C_COMBOBOX_ACCESSOR)
  @Input({ required: true }) value: any
  $index = signal(0)
  $selected = computed(() => this.#combobox.$selectedIndex() === this.$index())

  @HostListener('click') onClick(): void {
    this.#accessor.value = this.value
    this.#accessor.propagateChange(this.value)
    this.#overlayRef.close()
  }

  @HostListener('mouseenter') onHover(): void {
    this.#combobox.$selectedIndex.set(this.$index())
  }
}
