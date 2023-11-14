import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { DIALOG_DATA, DialogRef } from "../dialog";

export interface DialogTemplateData {
  template: TemplateRef<any>;
  data?: any;
}

@Component({
  selector: 'app-dialog-template',
  templateUrl: './dialog-template.component.html',
  styleUrls: ['./dialog-template.component.scss']
})
export class DialogTemplateComponent implements OnInit {

  constructor(@Inject(DIALOG_DATA) public dialogTemplate: DialogTemplateData,
              readonly dialogRef: DialogRef) { }

  ngOnInit(): void {
  }
}
