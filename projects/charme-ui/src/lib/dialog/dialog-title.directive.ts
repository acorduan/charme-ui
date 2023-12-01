import {
  Directive,
  inject,
  OnInit
} from '@angular/core'
import { DialogRef } from './dialog.model'

@Directive({
  selector: '[c-dialog-title]',
  standalone: true,
  host: {
    '[id]': 'id'
  }
})
export class DialogTitleDirective implements OnInit {
  dialogRef = inject(DialogRef)
  id = `c-dialog-${this.dialogRef.id}`

  ngOnInit(): void {
    const element = this.dialogRef.elementRef.nativeElement
    element.setAttribute('aria-labelledby', this.id)
  }
}
