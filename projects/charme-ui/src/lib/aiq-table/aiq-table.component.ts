import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColumnSetting } from './aiq-table.model';

@Component({
  selector: 'aiq-table',
  templateUrl: './aiq-table.component.html',
  styleUrls: ['./aiq-table.component.scss']
})
export class AiqTableComponent {

  @Input() columns!: ColumnSetting[];
  @Input() data!: any[];
  @Input() caption: string = '';
  @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();

  onRowClick(row: any, column: ColumnSetting) {
    if (column.clickEvent) {
      this.rowClick.emit(row);
    }
  }
}
