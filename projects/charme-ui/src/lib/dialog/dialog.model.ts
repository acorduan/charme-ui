import { ElementRef } from '@angular/core';
import { OverlayAttachedTo, OverlayConfig, OverlayPosition, OverlayRef } from "../overlay/overlay.model";

export type DialogPosition = OverlayPosition
export type  DialogAttachedTo = OverlayAttachedTo

export interface DialogConfig extends  Omit< OverlayConfig, 'attachedTo' | 'position' | 'data'> {
  time?: number; //ms
  position?: DialogPosition;
  attachedTo?: DialogAttachedTo;
  panelClass?: string;
  closeOnBackdropClick: boolean;
  closeOnNavigation: boolean;
  overlay: boolean;
  inputs?: any;
}

class DialogConfigInstance implements DialogConfig {
  closeOnBackdropClick: boolean;
  closeOnNavigation: boolean;
  overlay: boolean;

  time?: number; //ms
  position?: DialogPosition;
  attachedTo?: DialogAttachedTo;
  width?: string;
  height?: string;
  panelClass?: string;
  inputs?: any;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  minWidth?: string;
  animationCloseDuration: number;

  constructor(config?: Partial< DialogConfig>) {
    this.closeOnBackdropClick = config?.closeOnBackdropClick ?? true;
    this.closeOnNavigation = config?.closeOnNavigation ?? true;
    this.overlay = config?.overlay ?? true;
    this.time = config?.time;
    this.position = config?.position;
    this.attachedTo = config?.attachedTo
    this.width = config?.width;
    this.height = config?.height;
    this.panelClass = config?.panelClass;
    this.inputs = config?.inputs;
    this.maxHeight = config?.maxHeight;
    this.maxWidth = config?.maxWidth;
    this.minHeight = config?.minHeight;
    this.minWidth = config?.minWidth;
    this.animationCloseDuration = config?.animationCloseDuration ?? 150 //ms
  }
}

export class DialogRef extends OverlayRef<DialogConfig>  {

  backdropEl?: ElementRef<HTMLElement>
  readonly id: number
  readonly originElement: Element | null

  constructor(id: number, config?: Partial<DialogConfig>) {
    super()
    this.id = id;
    this.config = new DialogConfigInstance(config)
    this.originElement = document.activeElement
  }
}
