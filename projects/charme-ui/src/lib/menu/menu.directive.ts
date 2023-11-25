import { Directive } from '@angular/core'
import { MenuService } from './menu.service'

@Directive({
  selector: '[c-menu]',
  standalone: true,
  providers: [MenuService]
})
export class MenuDirective {

}
