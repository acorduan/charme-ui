import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  createComponent,
  Directive,
  ElementRef,
  HostBinding,
  inject,
  Injector,
  OnDestroy
} from '@angular/core'
import { DialogConfig, DialogRef } from './dialog.model'

@Directive({
  selector: '[dialog-backdrop]',
  standalone: true
})
export class DialogBackdropDirective implements OnDestroy {
  appRef = inject(ApplicationRef)
  dialogRef = inject(DialogRef)
  overlayRef?: ComponentRef<DialogBackdropComponent>

  constructor() {
    this.initOverlay()
  }

  get config(): DialogConfig {
    return this.dialogRef.config
  }

  initOverlay(): void {
    if (this.config.hasBackDrop) {
      const elementInjector = Injector.create({ providers: [{ provide: DialogRef, useValue: this.dialogRef }] })
      this.overlayRef = createComponent(DialogBackdropComponent, {
        environmentInjector: this.appRef.injector,
        elementInjector
      })
      this.appRef.attachView(this.overlayRef.hostView)
      document.body.appendChild(this.overlayRef.location.nativeElement)
    }
  }

  ngOnDestroy(): void {
    if (this.overlayRef != null) {
      this.overlayRef.destroy()
      this.appRef.detachView(this.overlayRef.hostView)
    }
  }
}

@Component({
  selector: 'div [aria-hidden="true"]',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogBackdropComponent {
  dialogRef = inject(DialogRef)
  @HostBinding('class') class = 'w-full h-full fixed top-0 left-0 bg-c-dark-100/50 animate-dialog-overlay-open z-[1000]'
  elementRef = inject(ElementRef)

  constructor() {
    this.dialogRef.backdropEl = this.elementRef
  }
}
