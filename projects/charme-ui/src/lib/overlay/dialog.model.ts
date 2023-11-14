import { ComponentRef, ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DialogComponent } from "./dialog.component";

export type overlay = 'none' | 'visible' | 'invisible';
export type position = {
  top?: string; left?: string; bottom?: string; right?: string;
}

export type attachedToPosition = 'topleft' | 'topright' | 'topcenter' | 'bottomleft' | 'bottomright' | 'bottomcenter';

export class DialogConfig {
  time?: number; //ms
  position?: position;
  attachedTo?: {
    elementRef: ElementRef,
    elementPos: attachedToPosition | ((componentElementRef: ElementRef) => attachedToPosition),
    dialogPos: attachedToPosition | ((componentElementRef: ElementRef) => attachedToPosition),
    pxAdder?: number
  };
  width?: string = 'auto';
  height?: string = 'auto';
  panelClass?: string = '';
  closeOnNavigation?: boolean = true;
  closeOnDocumentClick?: { close: boolean, exceptions?: ElementRef[] } = {close: false};
  disableClose?: boolean = false;
  overlay?: overlay = 'visible';
  inputs?: any;
  maxHeight?: string = 'auto';
  maxWidth?: string = 'auto';
  minHeight?: string = '';
  minWidth?: string = '';
}

export class DialogRef {

  componentRef!: ComponentRef<DialogComponent>
  elementRef!: ElementRef<HTMLDialogElement>

  #close$ = new Subject<any>();
  #afterClosed$: Observable<any> = this.#close$.asObservable();

  public close<T = any>(result?: T) {
    this.#close$.next(result)
  }

  public afterClosed<T = any>(): Observable<T> {
    return this.#afterClosed$;
  }
}
