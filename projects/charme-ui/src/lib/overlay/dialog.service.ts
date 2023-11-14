import {
  ApplicationRef,
  ComponentRef, createComponent,
  EmbeddedViewRef,
  inject,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { DialogComponent } from './dialog.component';
import { DialogConfig, DialogRef } from './dialog.model';


@Injectable({
  providedIn: 'root',
})
export class DialogService {

  private appRef = inject(ApplicationRef);

  public open(componentType: Type<any>, config?: DialogConfig): DialogRef {
    return this.appendDialogComponentToBody(componentType, config);
  }

  private appendDialogComponentToBody(componentType: Type<any>, config?: DialogConfig) {

    const ref = new DialogRef()
    const injector = Injector.create({providers: [{provide: DialogRef, useValue: ref}]});

    const componentRef = createComponent(DialogComponent, {environmentInjector: this.appRef.injector, elementInjector: injector});

    componentRef.instance.config = config;
    componentRef.instance.childComponentType = componentType;

    ref.componentRef = componentRef;
    ref.elementRef = componentRef.instance.elementRef;

    const sub = ref.afterClosed().subscribe(() => {
      this.removeDialogComponentFromBody(componentRef)
      sub.unsubscribe();
    });

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    return ref;
  }

  private removeDialogComponentFromBody(componentRef: ComponentRef<any>) {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
