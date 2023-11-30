import { computed, Directive, effect, HostListener, inject, signal } from '@angular/core'
import { ComboboxOptionDirective } from './combobox-option.directive'
import { OverlayRef } from '../overlay/overlay.model'
import { C_COMBOBOX_ACCESSOR } from './combobox-trigger.directive'
import { ComboboxSearchDirective } from './combobox-search.directive'

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
  #searchInput: ComboboxSearchDirective | undefined

  $displayedOptions = computed(() => {
    const options = this.$options()
    return options.filter((item) => item.$display())
  })

  @HostListener('focus') onFocus(): void {
    this.#searchInput?.el.nativeElement.focus()
  }

  $selectedIndex = signal(0)
  $options = signal<ComboboxOptionDirective[]>([])
  @HostListener('keydown.ArrowDown', ['$event']) onArrowDown(event: KeyboardEvent): void {
    event.preventDefault()
    const length = this.$displayedOptions()?.length
    const selectedIndex = (this.$selectedIndex() + 1) % length
    this.$selectedIndex.set(selectedIndex)
  }

  @HostListener('keydown.ArrowUp', ['$event']) onArrowUp(event: KeyboardEvent): void {
    event.preventDefault()
    const length = this.$displayedOptions().length
    const selectedIndex = ((this.$selectedIndex() - 1) + length) % length
    this.$selectedIndex.set(selectedIndex)
  }

  @HostListener('keydown.enter', ['$event']) onSelect(event: KeyboardEvent): void {
    event.preventDefault()
    event.stopPropagation()
    const option = this.$options()?.find(item => item.$index() === this.$selectedIndex())
    this.#accessor.value = option?.value
    this.#accessor.propagateChange(option?.value)
    this.#overlayRef.close()
  }

  constructor() {
    effect(() => {
      const options = this.$displayedOptions()
      options.forEach((item, index) => item.$index.set(index))
    }, { allowSignalWrites: true })
  }

  onSearch(event: InputEvent): void {
    const text: string = (event.target as any).value.toLowerCase()
    this.$options().forEach(item => {
      const display = item.value.toString().toLowerCase().includes(text)
      item.$display.set(display)
    })
    this.$selectedIndex.set(0)
  }

  registerOptions(item: ComboboxOptionDirective): void {
    this.$options.update(items => {
      items.push(item)
      return [...items]
    })
  }

  registerInput(input: ComboboxSearchDirective): void {
    this.#searchInput = input
  }
}
