import { Component, ContentChildren, EventEmitter, Input, NgZone, OnInit, Output, Pipe, PipeTransform, QueryList, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiqMenuDirective } from '../aiq-menu';
import { AiqInputModule } from '../input';
import { AiqEllipsisModule } from '../aiq-ellipsis';
import { AiqSelectOptionComponent } from './aiq-select-option/aiq-select-option.component';
import { Observable, defer, startWith, switchMap, merge, take } from 'rxjs';
import { AIQ_SELECT_ACCESSOR } from './aiq-select-accessor';

@Pipe({
  name: 'formattedValue',
  standalone: true
})
export class FormattedValuePipe implements PipeTransform {
  transform(value: any, options?: QueryList<AiqSelectOptionComponent>): string | undefined {
    return Array.isArray(value) ? options?.filter(o => value.includes(o.value)).map(o => o.label).join(', ') : options?.find(o => o.value === value)?.label
  }
}

@Component({
  selector: 'aiq-select',
  standalone: true,
  imports: [CommonModule, AiqMenuDirective, AiqInputModule, AiqEllipsisModule, FormattedValuePipe],
  templateUrl: './aiq-select.component.html',
  styleUrls: ['./aiq-select.component.scss'],
  providers: [
    { provide: AIQ_SELECT_ACCESSOR, useExisting: forwardRef(() => AiqSelectComponent)},
  ],
})
export class AiqSelectComponent implements OnInit {
  @Input() label?: string
  @Input() placeholder?: string
  @Input() disabled = false
  @Input() multiple = false
  @Input() multipleLimit?: number

  #value: any
  @Input()
  get value(){
    return this.#value
  }
  set value(value: any){
    this.#value = value
    this.#updateSelectedOptions()
  }

  @ContentChildren(AiqSelectOptionComponent, { descendants: true }) options?: QueryList<AiqSelectOptionComponent>

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>()

  open = false
  formattedValue?: string

  #optionSelectionChanges$: Observable<AiqSelectOptionComponent> = defer(() => {
    const options = this.options
    if (options) {
      return options.changes.pipe(
        startWith(options),
        switchMap(() => merge(...options.map(option => option.onChange))),
      );
    }
    return this._ngZone.onStable.pipe(
      take(1),
      switchMap(() => this.#optionSelectionChanges$),
    );
  }) as Observable<AiqSelectOptionComponent>

  constructor(
    protected _ngZone: NgZone
  ){ }

  ngOnInit(): void {
    this.#optionSelectionChanges$.pipe().subscribe(option => {
      if(!this.multiple){
        if(this.value === undefined || (this.value !== option.value)){
          this.value = option.value
          this.onChange.emit(this.value)
        }
        this.open = false
      } else {
        if(this.value === undefined){
          this.value = [option.value]
        } else {
          this.value.includes(option.value) ? this.value.splice(this.value.indexOf(option.value), 1) :  this.value.push(option.value)
        }
        this.onChange.emit(this.value)
      }
    })
  }

  ngAfterContentInit() {
    this.options?.changes.pipe(
      startWith(null)
    ).subscribe(() => {
      this.#updateSelectedOptions()
    });
  }

  onSelectClick(): void {
    this.open = !this.open;
  }

  onBackdropClick(): void {
    this.open = false;
  }

  #updateSelectedOptions(){
    Promise.resolve().then(() => {
      this.formattedValue = new FormattedValuePipe().transform(this.value, this.options)
      if(this.value !== undefined){
        if(!this.multiple){
          const toDeselectOption = this.options?.find(o => o.selected)
          toDeselectOption?.deselect()
          const toSelectOption = this.options?.find(o => o.value === this.value)
          toSelectOption?.select()
        } else {
          const toDeselectOptions = this.options?.filter(o => o.selected && !this.value.includes(o.value))
          toDeselectOptions?.forEach(o => o.deselect())
          const toSelectOptions = this.options?.filter(o => !o.selected && this.value.includes(o.value))
          toSelectOptions?.forEach(o => o.select())
          if(this.multipleLimit !== undefined){
            const othersOptions = this.options?.filter(o => !this.value.includes(o.value))
            if(this.value.length === this.multipleLimit){
              othersOptions?.forEach(o => o.disable())
            } else {
              othersOptions?.forEach(o => o.enable())
            }
          }
        }
      }
    })
  }
}
