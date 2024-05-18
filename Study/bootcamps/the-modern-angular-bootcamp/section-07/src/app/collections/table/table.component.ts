import { Component, Input } from '@angular/core';

export interface TableDataType {
  name: string;
  age: number;
  job: string;
}
export interface TableHeader {
  key: string;
  label: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() classNames = '';
  @Input('data') data: any = [];
  @Input('headers') headers: Array<TableHeader> = [];
}
