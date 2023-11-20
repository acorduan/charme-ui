import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild, effect, ElementRef, EventEmitter,
  inject, Input, Output, signal, ViewChild
} from '@angular/core'
import { C_ACCORDION_ACCESSOR } from '../accordion.model'
import {
  AccordionTriggerDirective
} from './directives/accordion-trigger.directive'
import {
  AccordionContentDirective
} from './directives/accordion-content.directive'
import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common'
import { RippleDirective } from 'projects/charme-ui/src/lib/ripple'

@Component({
  standalone: true,
  selector: 'c-accordion-item',
  templateUrl: 'accordion-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, NgIf, NgClass, RippleDirective]
})
export class AccordionItemComponent {
  readonly #accessor = inject(C_ACCORDION_ACCESSOR)
  readonly id = `c-accordion-item-${crypto.randomUUID()}`

  @ContentChild(AccordionTriggerDirective, { static: true }) accordionTrigger!: AccordionTriggerDirective
  @ContentChild(AccordionContentDirective, { static: true }) accordionContent!: AccordionContentDirective

  $maxHeight = signal<string>('0px')
  @ViewChild('contentContainer') set maxHeight(value: ElementRef<HTMLElement> | undefined) {
    const height = value?.nativeElement.scrollHeight ?? 0
    this.$maxHeight.set(`${height}px`)
  }

  @Input({ transform: booleanAttribute }) disabled: any

  @Input({ transform: booleanAttribute }) set open(value: any) {
    if (value !== this.$open()) {
      value as boolean ? this.#accessor.$selectedId.set(this.id) : this.#accessor.$selectedId.set(undefined)
    }
  }

  @Output() openChange = new EventEmitter<boolean>()

  $open = computed(() => this.#accessor.$selectedId() === this.id)

  $height = computed(() => {
    const maxHeight = this.$maxHeight()
    const open = this.$open()
    return open ? maxHeight : '0px'
  })

  onTriggerClick(): void {
    this.#accessor.$selectedId.set(!this.$open() ? this.id : undefined)
  }

  constructor() {
    effect(() => this.openChange.emit(this.$open()))
  }
}
