import { Component } from '@angular/core'
import { ButtonComponent } from '@charme/ui/button'
import { DisclosureComponent, DisclosureContentDirective, DisclosureTriggerDirective } from '@charme/ui/disclosure'
import { NgClass } from '@angular/common'

@Component({
  standalone: true,
  imports: [
    ButtonComponent,
    DisclosureComponent,
    DisclosureContentDirective,
    DisclosureTriggerDirective,
    NgClass
  ],
  templateUrl: 'disclosure-doc.component.html'
})
export class DisclosureDocComponent {
  disclosureOpen = false
}
