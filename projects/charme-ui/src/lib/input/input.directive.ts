import {
  computed,
  Directive, Input, signal
} from '@angular/core'
import { tlMerge } from '../core/tailwind-merge'

@Directive({
  selector: 'input[c-input], textarea[c-input]',
  standalone: true,
  host: {
    '[class]': '$class()'
  }
})
export class InputDirective {
  baseClass = 'h-9 bg-transparent text-sm px-2 not-focus:ring-primary rounded disabled:disabled-el focus:focus-el c-hover:ring-ultramarine-500 dark:c-hover:ring-ultramarine-400'

  $customClass = signal<string>('')
  @Input('class') set customClass(value: string) {
    this.$customClass.set(value)
  }

  $class = computed(() => tlMerge(this.baseClass, this.$customClass()))
}
