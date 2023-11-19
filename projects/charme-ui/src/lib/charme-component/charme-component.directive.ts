import { Directive, HostBinding } from '@angular/core'

@Directive()
export class CharmeComponent {
  private readonly classes: string[] = []
  @HostBinding('class') protected elementClass = this.classes.join(' ')

  constructor (classes?: string[]) {
    this.classes = classes ?? []
    this.updateElementClass()
  }

  protected addClass (className: string): void {
    if (!this.classes.includes(className)) {
      this.classes.push(className)
    }
    this.updateElementClass()
  }

  protected removeClass (className: string): void {
    const index = this.classes.indexOf(className)
    if (index !== -1) {
      this.classes.splice(index, 1)
    }
    this.updateElementClass()
  }

  protected updateElementClass (): void {
    this.elementClass = this.classes.join(' ')
  }
}
