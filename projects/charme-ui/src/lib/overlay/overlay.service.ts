import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  inject,
  Injectable,
  Injector,
  Provider, StaticProvider,
  Type
} from "@angular/core";
import { OVERLAY_DATA, OverlayRef } from "./overlay.model";
import { Subscription } from "rxjs";
import { delay, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  #appRef = inject(ApplicationRef)

  createOverlay<TComp = any, TRef extends OverlayRef = OverlayRef>(component: Type<TComp>, overlayRef: TRef, providers?: Array<Provider | StaticProvider>): ComponentRef<TComp> {

    const injector = Injector.create({
      providers: [
        {provide: OverlayRef, useValue: overlayRef},
        {provide: OVERLAY_DATA, useValue: overlayRef.config.data},
        ...(providers ?? [])
      ]
    });

    const compRef = createComponent(component, {
      environmentInjector: this.#appRef.injector,
      elementInjector: injector
    })
    overlayRef.componentRef = compRef

    this.#appendComponentToBody(compRef)
    this.#manageComponentDestruction(compRef, overlayRef)

    return compRef
  }

  #appendComponentToBody(compRef: ComponentRef<any>): void {
    this.#appRef.attachView(compRef.hostView);
    document.body.appendChild(compRef.location.nativeElement);
  }

  #manageComponentDestruction(compRef: ComponentRef<any>, overlayRef: OverlayRef): void {
    const sub: Subscription = overlayRef.afterClosed()
      .pipe(
        delay(overlayRef.closeDelay),
        tap(() => this.#destroyComponent(compRef))
      )
      .subscribe(() => sub.unsubscribe())
  }

  #destroyComponent(componentRef: ComponentRef<any>): void {
    this.#appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }


}