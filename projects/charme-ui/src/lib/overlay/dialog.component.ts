import { Component, ElementRef, inject, OnInit, Type } from '@angular/core';

import { NgClass, NgComponentOutlet, NgIf } from "@angular/common";
import { DialogConfig, DialogRef } from "./dialog.model";

@Component({
  selector: 'dialog [open]',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  imports: [
    NgClass,
    NgIf,
    NgComponentOutlet
  ],
  standalone: true
})
export class DialogComponent implements OnInit {
  childComponentType!: Type<any>;
  dialogRef = inject(DialogRef)
  elementRef = inject(ElementRef<HTMLDialogElement>)
  config: DialogConfig | undefined = undefined

  ngOnInit() {
    this.initSize()
    this.initPosition()
  }

  initSize(): void {
    this.elementRef.nativeElement.style.width = this.config?.width
    this.elementRef.nativeElement.style.height = this.config?.height
  }

  initPosition(): void {
/*
    if (this.elementRef.nativeElement)
*/

    this.elementRef.nativeElement.style.top = this.config?.position?.top
    this.elementRef.nativeElement.style.bottom = this.config?.position?.bottom
    this.elementRef.nativeElement.style.left = this.config?.position?.left
    this.elementRef.nativeElement.style.right = this.config?.position?.right
  }

}
