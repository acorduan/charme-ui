import { ChangeDetectionStrategy, Component, ContentChild, forwardRef } from '@angular/core'
import { DisclosureContentDirective } from './disclosure-content.directive'
import { C_DISCLOSURE_ACCESSOR, CDisclosureAccessor } from './disclosure.model'

@Component({
  selector: 'c-disclosure',
  standalone: true,
  template: '<ng-content/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: C_DISCLOSURE_ACCESSOR, useExisting: forwardRef(() => DisclosureComponent) }
  ]
})
export class DisclosureComponent implements CDisclosureAccessor {
  @ContentChild(DisclosureContentDirective, { static: true }) content!: DisclosureContentDirective
  id = `c-disclosure-${crypto.randomUUID()}`

  get open(): boolean {
    return !this.content.$hidden()
  }

  toggle(): void {
    this.content.$hidden.set(!this.content.$hidden())
  }
}
