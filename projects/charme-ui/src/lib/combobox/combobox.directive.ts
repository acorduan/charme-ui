import { computed, Directive, effect, HostListener, inject, signal } from '@angular/core'
import { ComboboxOptionDirective } from './combobox-option.directive'
import { OverlayRef } from '../overlay/overlay.model'
import { C_COMBOBOX_ACCESSOR } from './combobox-trigger.directive'
import { ComboboxSearchDirective } from './combobox-search.directive'
import { ComboboxNoResultDirective } from './combobox-no-result.directive'

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
  #noresult: ComboboxNoResultDirective | undefined

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
    const option = this.$displayedOptions()?.find(item => item.$index() === this.$selectedIndex())
    this.#accessor.value = option?.value
    this.#accessor.propagateChange(option?.value)
    this.#overlayRef.close()
  }

  constructor() {
    effect(() => {
      const options = this.$displayedOptions()
      options.forEach((item, index) => item.$index.set(index))
    }, { allowSignalWrites: true })

    effect(() => {
      const options = this.$displayedOptions()
      this.#noresult !== undefined && (this.#noresult.display = options.length === 0)
    })
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

  registerNoResult(item: ComboboxNoResultDirective): void {
    this.#noresult = item
  }
}
