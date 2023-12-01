import {
  computed,
  ContentChild,
  ContentChildren,
  Directive,
  forwardRef,
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
    role: 'listbox',
    '[id]': 'id'
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
  readonly id = `c-combo-${crypto.randomUUID()}`

  @ContentChild(ComboboxSearchDirective, { descendants: true }) searchInput: ComboboxSearchDirective | undefined
  @ContentChild(ComboboxNoResultDirective, { descendants: true }) noResult: ComboboxNoResultDirective | undefined
  $options = signal<QueryList<ComboboxOptionDirective> | undefined>(undefined)
  @ContentChildren(ComboboxOptionDirective, { descendants: true }) set options(value: QueryList<ComboboxOptionDirective>) {
    this.$options.set(value)
  }

  $searchText = signal<string>('')
  $selectedIndex = signal(0)
  $selectedId = computed(() => {
    const selectedIndex = this.$selectedIndex()
    const options = this.$displayedOptions()
    return options[selectedIndex]?.id
  })

  $displayedOptions: Signal<ComboboxOptionDirective[]> = computed(() => {
    const searchText = this.$searchText()
    const options = this.$options()
    return options?.filter((item) => item.value.toString().toLowerCase().includes(searchText.toLowerCase())) ?? []
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
    const option = this.$displayedOptions()[this.$selectedIndex()]
    this.#valueAccessor.value = option?.value
    this.#valueAccessor.propagateChange(option?.value)
    this.#overlayRef.close()
  }

  onSearch(value: string): void {
    this.$searchText.set(value)
    this.$selectedIndex.set(0)
  }

  onOptionHover(id: string): void {
    const index = this.$displayedOptions().findIndex(item => item.id === id)
    if (index !== -1) {
      this.$selectedIndex.set(index)
    }
  }
}
