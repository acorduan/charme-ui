import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component, ContentChildren, forwardRef,
  Input, QueryList
} from '@angular/core'
import { AccordionItemComponent } from './accordion-item/accordion-item.component'
import { C_ACCORDION_ACCESSOR, CAccordionAccessor } from './accordion.model'

@Component({
  standalone: true,
  selector: 'c-accordion',
  template: '<ng-content/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: C_ACCORDION_ACCESSOR,
      useExisting: forwardRef(() => AccordionComponent)
    }
  ],
  host: {
    class: 'grid gap-2'
  }
})
export class AccordionComponent implements CAccordionAccessor {
  @ContentChildren(AccordionItemComponent) items: QueryList<AccordionItemComponent> | undefined

  #lastSelectedId: string | undefined

  #multipleSelect = false
  @Input({ transform: booleanAttribute }) set multipleSelect(value: boolean) {
    this.#multipleSelect = value
    if (!this.#multipleSelect && this.#lastSelectedId !== undefined) {
      this.onIemOpen(this.#lastSelectedId)
    }
  }

  get multipleSelect(): boolean {
    return this.#multipleSelect
  }

  // call from effect
  onIemOpen(id: string): void {
    this.#lastSelectedId = id
    if (!this.multipleSelect) {
      this.items?.filter(item => item.id !== id)
        .forEach(item => item.$open.set(false))
    }
  }

  openAll(): void {
    if (this.multipleSelect) {
      this.items
        ?.filter(item => !(item.disabled as boolean))
        .forEach(item => item.$open.set(true))
    }
  }

  closeAll(): void {
    this.items?.forEach(item => item.$open.set(false))
  }
}
