import { TemplateRef, Type } from '@angular/core'
import {
  OverlayConfig,
  OverlayRef
} from '@charme/ui/overlay'

export interface DialogConfigModel extends Omit< OverlayConfig, 'closeOnEscape' | 'data'> {
  panelClass?: string
  inputs?: any
}

export class DialogConfig extends OverlayConfig implements DialogConfigModel {
  panelClass?: string
  inputs?: any

  constructor(comp: { tpl: TemplateRef<any> | undefined, comp: Type<any> | undefined }, config?: Partial<DialogConfigModel>) {
    super(config as any)
    this.data = comp
    this.panelClass = config?.panelClass
    this.closeOnBackdropClick = config?.closeOnBackdropClick ?? true
    this.hasBackDrop = config?.hasBackDrop ?? true
    this.inputs = config?.inputs
    this.animationCloseDuration = config?.animationCloseDuration ?? 150 // ms
    this.closeOnClickOutside = config?.closeOnClickOutside ?? true
    this.closeOnNavigation = config?.closeOnNavigation ?? true
    this.closeOnEscape = true
    this.closeOnBackdropClick = config?.closeOnBackdropClick ?? true
    this.hasBackDrop = config?.hasBackDrop ?? true
  }
}

export class DialogRef extends OverlayRef<DialogConfig> {
  readonly id: number
  constructor(id: number, config: DialogConfig) {
    super(config)
    this.id = id
  }
}
