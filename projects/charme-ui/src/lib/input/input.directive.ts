import {
  Directive
} from '@angular/core'

@Directive({
  selector: 'input[c-input], textarea[c-input]',
  standalone: true,
  host: { class: 'c-input' }
})
export class InputDirective {
  constructor () {
  }
}
