import { Component, inject, Input, TemplateRef } from '@angular/core'
import { ButtonComponent } from '@charme/ui/button'
import { InputDirective } from '@charme/ui/input'
import { DialogRef, DialogService, DialogTitleDirective } from '@charme/ui/dialog'

@Component({
  standalone: true,
  imports: [
    ButtonComponent,
    InputDirective
  ],
  templateUrl: 'dialog-doc.component.html'
})
export class DialogDocComponent {
  dialog = inject(DialogService)

  onOpenDialogClick(): void {
    this.dialog.open(TestComponent, {
      inputs: {
        message: 'Test alan'
      },
      position: {
        top: '20%',
        right: '0'
      },
      panelClass: 'rounded'
    }).afterClosed()
      .subscribe(result => console.log(result))
  }

  onOpenDialogClickFromTpl(tpl: TemplateRef<any>): void {
    this.dialog.open(tpl, {
      inputs: {
        message: 'Test alan',
        isItGood: true
      },
      hasBackDrop: false,
      panelClass: 'rounded',
      position: {
        top: '20%',
        right: '0'
      }
    })
  }
}

@Component({
  selector: 'test',
  standalone: true,
  imports: [
    ButtonComponent,
    InputDirective,
    DialogTitleDirective
  ],
  template: `
    <div class="grid gap-2 p-4">
      <h1 c-dialog-title>Title</h1>
      <label for="name">Name</label>
      <input id="name" c-input placeholder="test alan" #inputText>
      <p>{{message}}</p>
      <button c-button (click)="ref.close(inputText.value)" type="submit">Submit</button>
    </div>
    `
})
export class TestComponent {
  ref = inject(DialogRef)

  @Input() message: string = ''

  constructor() {
    console.log(this.ref)
  }
}
