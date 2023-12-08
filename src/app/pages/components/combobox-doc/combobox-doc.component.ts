import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ButtonComponent } from '@charme/ui/button'
import {
  ComboboxDirective,
  ComboboxGroupDirective, ComboboxNoResultDirective,
  ComboboxOptionDirective, ComboboxSearchDirective,
  ComboboxTriggerDirective
} from '@charme/ui/combobox'
import { SeparatorComponent } from '@charme/ui/separator'

@Component({
  standalone: true,
  imports: [
    FormsModule,
    ButtonComponent,
    ComboboxTriggerDirective,
    ComboboxDirective,
    ComboboxOptionDirective,
    SeparatorComponent,
    ComboboxGroupDirective,
    ComboboxNoResultDirective,
    ComboboxSearchDirective
  ],
  templateUrl: 'combobox-doc.component.html'
})
export class ComboboxDocComponent {
  frameworks = ['Angular', 'React', 'Svelte', 'VueJs']
  frameworks2 = ['Angular2', 'React2', 'Svelte2', 'VueJs2']
  selectedFramework = this.frameworks[0]
}
