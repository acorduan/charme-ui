import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  createComponent,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Injector,
  OnDestroy
} from '@angular/core'
import { OverlayConfig, OverlayRef } from '../overlay.model'

@Directive({
  standalone: true
})
export class OverlayBackdropBehavior implements OnDestroy {
  appRef = inject(ApplicationRef)
  overlayRef = inject(OverlayRef)
  backDropCompRef?: ComponentRef<OverlayBackdropComponent>

  constructor() {
    this.initOverlay()
  }

  get config(): OverlayConfig {
    return this.overlayRef.config
  }

  initOverlay(): void {
    if (this.config.hasBackDrop) {
      const elementInjector = Injector.create({ providers: [{ provide: OverlayRef, useValue: this.overlayRef }] })
      this.backDropCompRef = createComponent(OverlayBackdropComponent, {
        environmentInjector: this.appRef.injector,
        elementInjector
      })
      this.appRef.attachView(this.backDropCompRef.hostView)
      document.body.appendChild(this.backDropCompRef.location.nativeElement)
    }
  }

  ngOnDestroy(): void {
    if (this.backDropCompRef != null) {
      this.backDropCompRef.destroy()
      this.appRef.detachView(this.backDropCompRef.hostView)
    }
  }
}

@Component({
  selector: 'div [aria-hidden="true"]',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full h-full fixed top-0 left-0 bg-black/50 animate-dialog-overlay-open z-[1000]'
  }
})
export class OverlayBackdropComponent {
  overlayRef = inject(OverlayRef)
  elementRef = inject(ElementRef)

  @HostListener('click') onBackDropClick(): void {
    this.overlayRef.backDropClick()
  }

  constructor() {
    this.overlayRef.backdropEl = this.elementRef
  }
}
