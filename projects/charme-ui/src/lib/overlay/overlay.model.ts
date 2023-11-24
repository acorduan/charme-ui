import { ComponentRef, ElementRef, InjectionToken } from '@angular/core'
import { Observable, Subject } from 'rxjs'

export interface OverlayPosition {
  top?: string
  left?: string
  bottom?: string
  right?: string
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
  closeAfter?: number
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
  closeAfter?: number

  constructor(config?: Partial<TConf>) {
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
    this.closeAfter = config?.closeAfter
  }
}

export const OVERLAY_DATA = new InjectionToken<any>('Overlay data')

export class OverlayRef<TConf extends OverlayConfig = OverlayConfig, TComp = any> {
  readonly #close$ = new Subject<any>()
  readonly #afterClosed$: Observable<any> = this.#close$.asObservable()
  readonly #clickOutside$ = new Subject<void>()
  readonly #onClickOutside$ = this.#clickOutside$.asObservable()

  #componentRef!: ComponentRef<TComp>
  public get componentRef(): ComponentRef<TComp> {
    return this.#componentRef
  }

  public set componentRef(value: ComponentRef<TComp>) {
    this.#componentRef = value
  }

  config: TConf

  constructor(config?: Partial<TConf>) {
    this.config = new OverlayConfigInstance(config) as TConf
  }

  get closeDelay(): number {
    return this.config.animationCloseDuration ?? 0
  }

  get elementRef(): ElementRef {
    return this.componentRef.location
  }

  close<T = any>(result?: T): void {
    this.#close$.next(result)
  }

  afterClosed<T = any>(): Observable<T> {
    return this.#afterClosed$
  }

  clickOutside(): void {
    this.#clickOutside$.next()
  }

  onClickOutside(): Observable<void> {
    return this.#onClickOutside$
  }
}
