import { ElementRef } from '@angular/core'
import {
  OverlayAttachedTo,
  OverlayConfig,
  OverlayConfigInstance,
  OverlayPosition,
  OverlayRef
} from '../overlay/overlay.model'

export type DialogPosition = OverlayPosition
export type DialogAttachedTo = OverlayAttachedTo

export interface DialogConfig extends Omit< OverlayConfig, 'attachedTo' | 'position' | 'data'> {
  position?: DialogPosition
  attachedTo?: DialogAttachedTo
  panelClass?: string
  closeOnBackdropClick: boolean
  closeOnNavigation: boolean
  hasBackDrop: boolean
  inputs?: any
}

class DialogConfigInstance extends OverlayConfigInstance<DialogConfig> implements DialogConfig {
  panelClass?: string
  closeOnBackdropClick: boolean
  closeOnNavigation: boolean
  hasBackDrop: boolean
  inputs?: any

  constructor (config?: Partial< DialogConfig>) {
    super(config)
    this.panelClass = config?.panelClass
    this.closeOnBackdropClick = config?.closeOnBackdropClick ?? true
    this.closeOnNavigation = config?.closeOnNavigation ?? true
    this.hasBackDrop = config?.hasBackDrop ?? true
    this.inputs = config?.inputs
    this.animationCloseDuration = config?.animationCloseDuration ?? 150 // ms
  }
}

export class DialogRef extends OverlayRef<DialogConfig> {
  backdropEl?: ElementRef<HTMLElement>
  readonly id: number
  readonly originElement: Element | null

  constructor (id: number, config?: Partial<DialogConfig>) {
    super()
    this.id = id
    this.config = new DialogConfigInstance(config)
    this.originElement = document.activeElement
  }
}
