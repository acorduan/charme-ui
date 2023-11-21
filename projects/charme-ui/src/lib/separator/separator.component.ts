import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  standalone: true,
  selector: 'c-separator',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'separator',
    '[attr.aria-orientation]': 'orientation',
    '[style.width]': `orientation === 'horizontal' ? size : '1px'`,
    '[style.height]': `orientation === 'horizontal' ? '1px' : size`,
    '[class]': `orientation === 'horizontal' ? HORIZONTAL_CLASS : VERTICAL_CLASS`
  }
})
export class SeparatorComponent {
  HORIZONTAL_CLASS = 'border-primary border-b flex'
  VERTICAL_CLASS = 'border-primary border-r flex '

  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal'
  @Input() size: string = '100%'
}
