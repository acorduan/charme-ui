import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild, effect, ElementRef, EventEmitter, inject,
  Input, Output, signal, ViewChild
} from '@angular/core'
import {
  AccordionTriggerDirective
} from './directives/accordion-trigger.directive'
import {
  AccordionContentDirective
} from './directives/accordion-content.directive'
import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common'
import { C_ACCORDION_ACCESSOR } from '../accordion.model'
import { RippleDirective } from '@charme-ui/ripple'

@Component({
  standalone: true,
  selector: 'c-accordion-item',
  templateUrl: 'accordion-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, NgIf, NgClass, RippleDirective]
})
export class AccordionItemComponent {
  readonly #accessor = inject(C_ACCORDION_ACCESSOR)
  readonly id = crypto.randomUUID()

  @ContentChild(AccordionTriggerDirective, { static: true }) accordionTrigger!: AccordionTriggerDirective
  @ContentChild(AccordionContentDirective, { static: true }) accordionContent!: AccordionContentDirective

  $maxHeight = signal<string>('0px')
  @ViewChild('contentContainer') set maxHeight(value: ElementRef<HTMLElement> | undefined) {
    const height = value?.nativeElement.scrollHeight ?? 0
    this.$maxHeight.set(`${height}px`)
  }

  @Input({ transform: booleanAttribute }) disabled: boolean = false

  $open = signal(false)
  @Input({ transform: booleanAttribute }) set open(value: boolean) {
    this.$open.set(value)
  }

  @Output() openChange = new EventEmitter<boolean>()

  $height = computed(() => {
    const maxHeight = this.$maxHeight()
    const open = this.$open()
    return open ? maxHeight : '0px'
  })

  onTriggerClick(): void {
    this.$open.set(!this.$open())
  }

  constructor() {
    effect(() => this.openChange.emit(this.$open()))
    effect(() => this.$open() && this.#accessor.onIemOpen(this.id), { allowSignalWrites: true })
  }
}
