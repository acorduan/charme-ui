import { ContentChildren, Directive, HostListener, inject, QueryList, signal } from '@angular/core'
import { ComboboxOptionDirective } from './combobox-option.directive'
import { OverlayRef } from '../overlay/overlay.model'
import { C_COMBOBOX_ACCESSOR } from './combobox-trigger.directive'

@Directive({
  selector: '[c-combobox]',
  standalone: true,
  host: {
    tabindex: '0',
    class: 'outline-none',
    role: 'listbox'
  }
})
export class ComboboxDirective {
  readonly #accessor = inject(C_COMBOBOX_ACCESSOR)
  readonly #overlayRef = inject(OverlayRef)
  $selectedIndex = signal(0)
  $options = signal<QueryList<ComboboxOptionDirective> | undefined>(undefined)
  @ContentChildren(ComboboxOptionDirective) set options(value: QueryList<ComboboxOptionDirective>) {
    value.forEach((item, index) => item.$index.set(index))
    this.$options.set(value)
  }

  @HostListener('keydown.ArrowDown', ['$event']) onArrowDown(event: KeyboardEvent): void {
    event.preventDefault()
    const length = this.$options()?.length ?? 0
    const selectedIndex = (this.$selectedIndex() + 1) % length
    this.$selectedIndex.set(selectedIndex)
  }

  @HostListener('keydown.ArrowUp', ['$event']) onArrowUp(event: KeyboardEvent): void {
    event.preventDefault()
    const length = this.$options()?.length ?? 0
    const selectedIndex = ((this.$selectedIndex() - 1) + length) % length
    this.$selectedIndex.set(selectedIndex)
  }

  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.enter', ['$event']) onSelect(event: KeyboardEvent): void {
    event.preventDefault()
    event.stopPropagation()
    const option = this.$options()?.find(item => item.$index() === this.$selectedIndex())
    this.#accessor.value = option?.value
    this.#accessor.propagateChange(option?.value)
    this.#overlayRef.close()
  }
}
