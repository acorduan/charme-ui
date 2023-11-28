import {Directive, HostListener, computed, effect, forwardRef, ElementRef, signal} from '@angular/core'
import {MenuContainer} from './menu.service'
import {MenuTriggerDirective} from './menu-trigger.directive'
import {C_MENU, CMenuAccessor} from './menu.model'

@Directive({
  selector: '[c-menu-bar]',
  standalone: true,
  providers: [{
    provide: C_MENU,
    useExisting: forwardRef(() => MenuBarDirective)
  }],
  host: {
    '[tabindex]': '$isMenuBarOpen() || someItemHasFocus() ? -1 : 0',
    role: 'menubar'
  }
})
export class MenuBarDirective extends MenuContainer implements CMenuAccessor {
  focusIndex = 0

  $isMenuBarOpen = computed<boolean>(() => {
    const menuItems = this.$items()
    return menuItems.some(item => item.trigger?.$isOpen())
  })

  @HostListener('focus') onFocus(): void {
    this.$items()[this.focusIndex]?.el.nativeElement.focus()
  }

  @HostListener('keydown.ArrowLeft', ['$event']) onArrowLeft(event: KeyboardEvent): void {
    event.preventDefault()
    const isMenuBarOpen = this.$isMenuBarOpen()
    this.focusIndex = ((this.focusIndex - 1) + this.$items().length) % this.$items().length
    this.closeOthers(this.$items()[this.focusIndex])
    this.$items()[this.focusIndex]?.el.nativeElement.focus()
    isMenuBarOpen && this.$items()[this.focusIndex]?.trigger?.open()
  }

  @HostListener('keydown.ArrowRight', ['$event']) onArrowRight(event: KeyboardEvent): void {
    event.preventDefault()
    const isMenuBarOpen = this.$isMenuBarOpen()
    this.focusIndex = (this.focusIndex + 1) % this.$items().length
    this.closeOthers(this.$items()[this.focusIndex])
    this.$items()[this.focusIndex]?.el.nativeElement.focus()
    isMenuBarOpen && this.$items()[this.focusIndex]?.trigger?.open()
  }

  someItemHasFocus(): boolean {
    return this.$items().some(item => item.isFocus)
  }

  constructor() {
    super();
    this.#initTriggerTypeEvent()
    this.#initFocus()
  }

  #initTriggerTypeEvent(): void {
    effect(() => {
      const isMenuBarOpen = this.$isMenuBarOpen()
      const triggers = this.$items()
        .map(item => item.trigger)
        .filter((item): item is MenuTriggerDirective => item !== null)
      triggers.forEach(item => item.triggerEvent = isMenuBarOpen ? 'hover' : 'click')
    })
  }

  #initFocus(): void {
    effect(() => {
      const isMenuBarOpen = this.$isMenuBarOpen()
      if (!isMenuBarOpen) {
        this.$items()[this.focusIndex]?.el.nativeElement.focus()
      }
    })
  }

}
