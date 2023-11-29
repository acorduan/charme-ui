import { booleanAttribute, Directive, Input, signal } from '@angular/core'
import { MenuItemDirective } from './menu-item.directive'

@Directive({
  selector: '[c-menu-item-checkbox]',
  standalone: true,
  hostDirectives: [MenuItemDirective],
  host: {
    class: 'group',
    role: 'menuitemcheckbox',
    '[attr.aria-checked]': '$checked()',
    '[checked]': '$checked()',
    '[class.checked]': '$checked()'
  }
})
export class MenuItemCheckboxDirective {
  $checked = signal(false)
  @Input({ transform: booleanAttribute }) set checked(value: boolean) {
    this.$checked.set(value)
  }
}
