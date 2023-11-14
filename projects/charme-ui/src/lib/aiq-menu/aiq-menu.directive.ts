import {
  Directive, effect,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnDestroy,
  Output,
  signal,
  TemplateRef, untracked,
} from "@angular/core";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import { filter, switchMap, tap } from "rxjs/operators";
import { AiqMenuComponent } from "./aiq-menu.component";
import { DialogService, attachedToPosition, OverlayRef } from "../overlay";

@Directive({
  selector: '[aiq-menu]',
  standalone: true
})
export class AiqMenuDirective implements OnDestroy {

  #el = inject(ElementRef);
  #overlay = inject(DialogService);
  #overlayRef = signal<OverlayRef | undefined>(undefined);
  #afterClose$ = toObservable(this.#overlayRef).pipe(
    filter((ref): ref is OverlayRef => Boolean(ref)),
    switchMap((ref: OverlayRef) => ref.afterClosed())
  );

  #position = signal<{ originElPos: attachedToPosition, menuPos: attachedToPosition } | undefined>(undefined);

  @Input() set aiqMenuPosition(value: { originElPos: attachedToPosition, menuPos: attachedToPosition }) {
    this.#position.set(value);
  }

  #templateRef = signal<TemplateRef<any> | undefined>(undefined);

  @Input({required: true}) set aiqMenuTrigger(value: TemplateRef<any>) {
    this.#templateRef.set(value);
  }

  #open = signal<boolean>(false)

  @Input() set aiqMenuOpen(open: boolean) {
    setTimeout(() => this.#open.set(open))
  }

  @Input() triggerOnClick = true;
  @Input() aiqMenuData: any | undefined;
  @Output() aiqMenuOpenChange = new EventEmitter<boolean>();
  @Output() overLayRefInit = new EventEmitter<OverlayRef>()

  @HostListener('click', ['$event'])
  toggleMenu(): void {
    if (this.triggerOnClick) {
      const value = !this.#open()
      this.#open.set(value);
      this.aiqMenuOpenChange.emit(value)
    }
  }

  constructor() {
    this.#afterClose$
      .pipe(
        takeUntilDestroyed(),
        tap(() => this.#open.set(false)),
        tap(() => this.aiqMenuOpenChange.emit(false))
      )
      .subscribe();

    effect(() => this.overLayRefInit.emit(this.#overlayRef()), {allowSignalWrites: true});
    effect(() => this.#open() ? this.openMeu() : this.closeMenu(), {allowSignalWrites: true});
  }

  ngOnDestroy() {
    this.#overlayRef()?.close();
  }

  private openMeu(): void {
    const templateRef = this.#templateRef();
    const overlayRef = untracked(this.#overlayRef);
    if (templateRef !== undefined && overlayRef === undefined) {
      const menuRef = this.#overlay.open(AiqMenuComponent, {
        attachedTo: {elementRef: this.#el, ...this.getPosition()},
        closeOnDocumentClick: {close: true, exceptions: [this.#el]},
        data: {data: this.aiqMenuData, tpl: this.#templateRef()},
        overlay: 'none'
      });
      this.#overlayRef.set(menuRef);
    }
  }

  private closeMenu(): void {
    this.#overlayRef()?.close();
    this.#overlayRef.set(undefined);
  }


  private getPosition(): { dialogPos: (el: ElementRef) => attachedToPosition, elementPos: (el: ElementRef) => attachedToPosition } {
    return {
      dialogPos: this.calculateDialogPos.bind(this),
      elementPos: this.calculateElementPos.bind(this)
    }
  }

  private calculateDialogPos(el: ElementRef): attachedToPosition {
    const inputPosition = this.#position()?.menuPos
    if (inputPosition) {
      return inputPosition;
    }

    const overlayRect = el.nativeElement.getBoundingClientRect();
    const originElRect = this.#el.nativeElement.getBoundingClientRect();

    const y: 'top' | 'bottom' = Math.ceil(overlayRect.height + originElRect.height + originElRect.y) >= window.innerHeight ? 'bottom' : 'top';
    const x: 'left' | 'right' = Math.ceil(overlayRect.width + originElRect.x) >= window.innerWidth ? 'right' : 'left';


    return (y + x) as attachedToPosition;
  }

  private calculateElementPos(el: ElementRef): attachedToPosition {
    const inputPosition = this.#position()?.originElPos
    if (inputPosition) {
      return inputPosition;
    }

    const overlayRect = el.nativeElement.getBoundingClientRect();
    const originElRect = this.#el.nativeElement.getBoundingClientRect();

    const y: 'top' | 'bottom' = Math.ceil(overlayRect.height + originElRect.height + originElRect.y) >= window.innerHeight ? 'top' : 'bottom';
    const x: 'left' | 'right' = Math.ceil(overlayRect.width + originElRect.x) >= window.innerWidth ? 'right' : 'left';
    return (y + x) as attachedToPosition;
  }

}

