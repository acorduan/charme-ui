import { Component } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { componentDocsPaths } from './components.route'
import { ButtonComponent } from '@charme/ui/button'
import { SeparatorComponent } from '@charme/ui/separator'
import { TitleCasePipe } from '@angular/common'

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonComponent,
    SeparatorComponent,
    RouterLink,
    TitleCasePipe
  ],
  templateUrl: 'components.layout.html',
  host: {
    class: 'flex h-full w-full gap-4'
  }
})
export class ComponentsLayout {
  componentDocsPaths = componentDocsPaths
}
