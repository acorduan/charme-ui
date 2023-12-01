import {
  computed,
  ContentChild,
  ContentChildren,
  Directive,
  effect, forwardRef,
  HostListener,
  inject,
  QueryList, Signal,
  signal
} from '@angular/core'
import { ComboboxOptionDirective } from './combobox-option.directive'
import { OverlayRef } from '../overlay/overlay.model'
import { ComboboxSearchDirective } from './combobox-search.directive'
import { ComboboxNoResultDirective } from './combobox-no-result.directive'
import { C_COMBOBOX_ACCESSOR, C_COMBOBOX_TRIGGER_ACCESSOR, CComboboxAccessor } from './combobox.model'

@Directive({
  selector: '[c-combobox]',
  standalone: true,
  host: {
    tabindex: '0',
    class: 'outline-none',
    role: 'listbox'
  },
  providers: [
    {
      provide: C_COMBOBOX_ACCESSOR,
      useExisting: forwardRef(() => ComboboxDirective)
    }
  ]
})
export class ComboboxDirective implements CComboboxAccessor {
  readonly #valueAccessor = inject(C_COMBOBOX_TRIGGER_ACCESSOR)
  readonly #overlayRef = inject(OverlayRef)

  @ContentChild(ComboboxSearchDirective, { descendants: true }) searchInput: ComboboxSearchDirective | undefined
  @ContentChild(ComboboxNoResultDirective, { descendants: true }) noResult: ComboboxNoResultDirective | undefined
  $options = signal<QueryList<ComboboxOptionDirective> | undefined>(undefined)
  @ContentChildren(ComboboxOptionDirective, { descendants: true }) set options(value: QueryList<ComboboxOptionDirective>) {
    this.$options.set(value)
  }

  $selectedIndex = signal(0)
  $displayedOptions: Signal<ComboboxOptionDirective[]> = computed(() => {
    const options = this.$options()
    return options?.filter((item) => item.$display()) ?? []
  })

  @HostListener('focus') onFocus(): void {
    this.searchInput?.el.nativeElement.focus()
  }

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
    this.#valueAccessor.value = option?.value
    this.#valueAccessor.propagateChange(option?.value)
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
    this.$options()?.forEach(item => {
      const display = item.value.toString().toLowerCase().includes(text)
      item.$display.set(display)
    })
    this.$selectedIndex.set(0)
  }
}
