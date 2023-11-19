import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA, DialogRef } from "../dialog";
import { AiqButtonModule } from "../button";

@Component({
  selector: 'aiq-confirm-dialog',
  templateUrl: './aiq-confirm-dialog.component.html',
  styleUrls: ['./aiq-confirm-dialog.component.scss'],
  standalone: true,
  imports: [AiqButtonModule]
})
export class AiqConfirmDialogComponent implements OnInit {

  constructor(@Inject(DIALOG_DATA) public data: {title: string, message: string},
              private dialogRef: DialogRef) { }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true)
  }

}
