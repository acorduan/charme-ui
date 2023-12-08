import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ButtonComponent } from '@charme/ui/button'
import { CharmeThemeService } from '@charme/ui/charme-config'
import { SeparatorComponent } from '@charme/ui/separator'

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonComponent,
    SeparatorComponent
  ],
  templateUrl: 'page.layout.html',
  host: {
    class: 'w-full h-[100vh] flex flex-col'
  }
})
export class PagesLayout {
  readonly theme = inject(CharmeThemeService)
}
