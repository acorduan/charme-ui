import {Directive, effect, forwardRef, HostListener, signal} from '@angular/core'
import {C_MENU, CMenuAccessor} from './menu.model'
import {MenuContainer} from "./menu.service";

@Directive({
  selector: '[c-menu]',
  standalone: true,
  providers: [{
    provide: C_MENU,
    useExisting: forwardRef(() => MenuDirective)
  }],
})
export class MenuDirective extends MenuContainer implements CMenuAccessor {
  readonly $focusIndex = signal(0)

  constructor() {
    super()
    this.#initFocus()
  }

  #initFocus(): void {
    effect(() => {
      const items = this.$items()
      const focusIndex = this.$focusIndex()
      items[focusIndex]?.el.nativeElement.focus()
    })
  }

  @HostListener('keydown.ArrowLeft', ['$event']) onArrowLeft(event: KeyboardEvent): void {
    event.preventDefault()
    if (this.overlayRef !== null && this.hostOverlayRef !== undefined) {
      this.overlayRef.close()
      event.stopPropagation()
    }
  }

  @HostListener('keydown.ArrowRight', ['$event']) onArrowRight(event: KeyboardEvent): void {
    event.preventDefault()
    const currentItem = this.$items()[this.$focusIndex()]
    if (currentItem?.trigger?.$isOpen() === false) {
      currentItem.trigger.open()
      event.stopPropagation()
    }
  }

  @HostListener('keydown.ArrowUp', ['$event']) onArrowUp(event: KeyboardEvent): void {
    event.stopPropagation()
    event.preventDefault()
    const newIndex = ((this.$focusIndex() - 1) + this.$items().length) % this.$items().length
    this.$focusIndex.set(newIndex)
  }

  @HostListener('keydown.ArrowDown', ['$event']) onArrowDown(event: KeyboardEvent): void {
    event.stopPropagation()
    event.preventDefault()
    const newIndex = (this.$focusIndex() + 1) % this.$items().length
    this.$focusIndex.set(newIndex)
  }
}
