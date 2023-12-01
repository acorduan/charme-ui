import { ComponentRef, ElementRef, InjectionToken } from '@angular/core'
import { Observable, Subject } from 'rxjs'

export interface OverlayPosition {
  top?: string
  left?: string
  bottom?: string
  right?: string
}

type top = 'top-left' | 'top-right' | 'top-center'
type bottom = 'bottom-left' | 'bottom-right' | 'bottom-center'
type left = 'left-top' | 'left-center' | 'left-bottom'
type right = 'right-top' | 'right-center' | 'right-bottom'

export type AttachedToPosition = top | bottom | left | right
export interface OverlayAttachedTo {
  origin: ElementRef
  originPos: AttachedToPosition | ((originEl: ElementRef, overlayEl: ElementRef) => AttachedToPosition)
  overlayPos: AttachedToPosition | ((originEl: ElementRef, overlayEl: ElementRef) => AttachedToPosition)
  gap?: number
}

export interface OverlayConfigModel<TData = any> {
  position?: OverlayPosition
  attachedTo?: OverlayAttachedTo
  width?: string
  height?: string
  minWidth?: string
  minHeight?: string
  maxWidth?: string
  maxHeight?: string
  animationCloseDuration?: number
  data: TData
  closeAfter?: number
  closeOnClickOutside: boolean
  closeOnNavigation: boolean
  closeOnEscape: boolean
  closeOnBackdropClick: boolean
  hasBackDrop: boolean
  focusOriginOnClose: boolean
  host?: ElementRef
}

export class OverlayConfig<TData = any> implements OverlayConfigModel<TData> {
  position?: OverlayPosition
  attachedTo?: OverlayAttachedTo
  width?: string
  height?: string
  minWidth?: string
  minHeight?: string
  maxWidth?: string
  maxHeight?: string
  animationCloseDuration?: number
  data: TData
  closeAfter?: number
  closeOnClickOutside: boolean
  closeOnNavigation: boolean
  closeOnEscape: boolean
  closeOnBackdropClick: boolean
  hasBackDrop: boolean
  focusOriginOnClose: boolean
  host?: ElementRef<any> | undefined

  constructor(config?: Partial<OverlayConfigModel & { data: TData }>) {
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
    this.closeOnClickOutside = config?.closeOnClickOutside ?? false
    this.closeOnNavigation = config?.closeOnNavigation ?? false
    this.closeOnEscape = config?.closeOnEscape ?? false
    this.closeOnBackdropClick = config?.closeOnBackdropClick ?? false
    this.hasBackDrop = config?.hasBackDrop ?? false
    this.focusOriginOnClose = config?.focusOriginOnClose ?? true
    this.host = config?.host
  }
}

export const OVERLAY_DATA = new InjectionToken<any>('Overlay data')

export class OverlayRef<TConf extends OverlayConfig = OverlayConfig, TComp = any> {
  readonly #backDropClick$ = new Subject<void>()
  readonly #onBackDropClick$ = this.#backDropClick$.asObservable()

  readonly #close$ = new Subject<any>()
  readonly #afterClosed$: Observable<any> = this.#close$.asObservable()
  readonly #clickOutside$ = new Subject<void>()
  readonly #onClickOutside$ = this.#clickOutside$.asObservable()
  readonly originElement: Element | null
  backdropEl?: ElementRef<HTMLElement>

  #componentRef!: ComponentRef<TComp>
  public get componentRef(): ComponentRef<TComp> {
    return this.#componentRef
  }

  public set componentRef(value: ComponentRef<TComp>) {
    this.#componentRef = value
  }

  constructor(readonly config: TConf) {
    this.originElement = document.activeElement
  }

  get closeDelay(): number | undefined {
    return this.config.animationCloseDuration
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

  backDropClick(): void {
    this.#backDropClick$.next()
  }

  onBackDropClick(): Observable<void> {
    return this.#onBackDropClick$
  }
}
