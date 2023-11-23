import {
  computed,
  Directive, Input, signal
} from '@angular/core'
import { twMerge } from 'tailwind-merge'

@Directive({
  selector: 'input[c-input], textarea[c-input]',
  standalone: true,
  host: {
    '[class]': '$class()'
  }
})
export class InputDirective {
  baseClass = 'h-9 bg-transparent text-sm px-2 ring-primary rounded disabled:disabled-el focus:focus-el hover:ring-ultramarine-500 dark:hover:ring-ultramarine-400'

  $customClass = signal<string>('')
  @Input('class') set customClass(value: string) {
    this.$customClass.set(value)
  }

  $class = computed(() => twMerge(this.baseClass, this.$customClass()))
}
