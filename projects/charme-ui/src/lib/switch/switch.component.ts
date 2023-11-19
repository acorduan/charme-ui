import {
  Component,
  ContentChild,
  Directive,
  ElementRef,
  HostBinding,
  HostListener, inject, Input,
  ViewEncapsulation
} from '@angular/core';
import {NgClass} from "@angular/common";
import {FormControl} from "@angular/forms";


@Directive({
  selector: 'input [c-switch]',
  standalone: true
})
export class SwitchDirective {
  #elementRef = inject(ElementRef)

  @HostBinding('attr.role') role = 'switch'
  @HostBinding('attr.type') type = 'checkbox'
  @HostBinding('class') class = 'hidden'

  @Input() set checked(value: boolean) {
    this.#elementRef.nativeElement.value
    this.#checked = value
  }

  @Input() set value(value: boolean) {
    this.#elementRef.nativeElement.checked = value
    this.#checked = value
  }

  #checked = this.#elementRef.nativeElement.checked
  @HostListener('input') onInput(): void {
    this.#checked = this.#elementRef.nativeElement.checked
  }

  get checked(): boolean {
    return this.#checked
  }

  get id(): string | undefined {
    return this.#elementRef.nativeElement.id
  }
}

@Component({
  selector: 'c-switch-container',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  imports: [
    NgClass
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class SwitchContainerComponent {

  @ContentChild(SwitchDirective, {read: ElementRef, static: true}) switch!: ElementRef<HTMLInputElement>
  @HostBinding('class') class = 'flex items-center justify-center gap-2 cursor-pointer'

  checked = new FormControl()

  ngOnInit(): void {
    this.checked.setValue(this.switch.nativeElement.checked)
  }

}
