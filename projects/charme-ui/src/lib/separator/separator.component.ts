import { ChangeDetectionStrategy, Component, effect, HostBinding, Input, signal } from '@angular/core'

const HORIZONTAL_CLASS = 'border-primary border-b flex'
const VERTICAL_CLASS = 'border-primary border-r flex'

@Component({
  standalone: true,
  selector: 'c-separator',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeparatorComponent {
  @HostBinding('role') role = 'separator'
  @HostBinding('class') class = 'border-primary flex'
  @HostBinding('style.min-width') minWidth = '100%'
  @HostBinding('style.min-height') minHeight = '100%'

  $direction = signal<'horizontal' | 'vertical'>('horizontal')
  @Input() set direction(value: 'horizontal' | 'vertical') {
    this.$direction.set(value)
  }

  $size = signal('100%')
  @Input() set size(value: string) {
    this.$size.set(value)
  }

  constructor() {
    effect(() => this.class = this.$direction() === 'horizontal' ? HORIZONTAL_CLASS : VERTICAL_CLASS)
    effect(() => this.minWidth = this.$direction() === 'horizontal' ? this.$size() : '1px')
    effect(() => this.minHeight = this.$direction() === 'vertical' ? this.$size() : '1px')
  }
}
