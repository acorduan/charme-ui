import {
  ChangeDetectionStrategy,
  Component,
  ContentChild, effect, ElementRef,
  HostBinding, inject,
  ViewEncapsulation
} from '@angular/core'
import { NgClass } from '@angular/common'
import { SwitchDirective } from './switch.directive'

@Component({
  selector: 'c-switch-container',
  templateUrl: 'switch-container.component.html',
  styleUrls: ['switch-container.component.scss'],
  imports: [
    NgClass
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchContainerComponent {
  #elementRef = inject(ElementRef<HTMLElement>)
  @ContentChild(SwitchDirective, { static: true }) switch!: SwitchDirective
  @HostBinding('class') class = 'w-auto flex items-center gap-2'

  toggle (): void {
    this.switch.writeValue(!this.switch.checked)
    this.switch.propagateChange(this.switch.checked)
  }

  constructor () {
    effect(() => {
      this.switch.$disabled()
        ? this.#elementRef.nativeElement.classList.add('c-switch-disabled')
        : this.#elementRef.nativeElement.classList.remove('c-switch-disabled')
    })
  }
}
