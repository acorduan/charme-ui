import { ComponentRef, ElementRef, InjectionToken, Type } from '@angular/core'
import { Observable, Subject } from 'rxjs'

export interface OverlayPosition {
  top?: string; left?: string; bottom?: string; right?: string
}

export type AttachedToPosition = 'topleft' | 'topright' | 'topcenter' | 'bottomleft' | 'bottomright' | 'bottomcenter'

export interface OverlayAttachedTo {
  host: ElementRef
  hostPos: AttachedToPosition
  dialogPos: AttachedToPosition
  gap?: number
}

export interface OverlayConfig {
  position?: OverlayPosition
  attachedTo?: OverlayAttachedTo
  width?: string
  height?: string
  minWidth?: string
  minHeight?: string
  maxWidth?: string
  maxHeight?: string
  animationCloseDuration?: number
  data?: any
  duration?: number
}

export class OverlayConfigInstance<TConf extends OverlayConfig> implements OverlayConfig {
  position?: OverlayPosition
  attachedTo?: OverlayAttachedTo
  width?: string
  height?: string
  minWidth?: string
  minHeight?: string
  maxWidth?: string
  maxHeight?: string
  animationCloseDuration?: number
  data: any
  duration?: number

  constructor (config?: Partial<TConf>) {
    this.position = config?.position
    this.attachedTo = config?.attachedTo
    this.width = config?.width
    this.height = config?.height
    this.minWidth = config?.minWidth
    this.minHeight = config?.minHeight
    this.maxWidth = config?.maxWidth
    this.maxHeight = config?.maxHeight
    this.animationCloseDuration = config?.animationCloseDuration
    this.data = config?.data
    this.duration = config?.duration
  }
}

export const OVERLAY_DATA = new InjectionToken<any>('Overlay data')

export class OverlayRef<TConf extends OverlayConfig = OverlayConfig, TComp = any> {
  private _componentRef!: ComponentRef<TComp>
  public get componentRef (): ComponentRef<TComp> {
    return this._componentRef
  }

  public set componentRef (value: ComponentRef<TComp>) {
    this._componentRef = value
  }

  config: TConf

  constructor (config?: Partial<TConf>) {
    this.config = new OverlayConfigInstance(config) as TConf
  }

  get closeDelay (): number {
    return this.config.animationCloseDuration ?? 0
  }

  get elementRef (): ElementRef {
    return (this.componentRef.instance as any).elementRef
  }

  #close$ = new Subject<any>()
  #afterClosed$: Observable<any> = this.#close$.asObservable()

  public close<T = any>(result?: T) {
    this.#close$.next(result)
  }

  public afterClosed<T = any>(): Observable<T> {
    return this.#afterClosed$
  }
}
