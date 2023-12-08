import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<router-outlet/>'
})
export class AppComponent {
  @HostListener('document:focus', ['$event']) onFocus(event: any): void {
    console.log(event)
  }

  constructor() {
    document.body.addEventListener('focusin', (event: any) => console.log(event))
  }
}
