import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  ITableColumnConfig,
  ITablePipe,
} from '../../interfaces/table/table-column-config.interface';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  page: number = 1;
  pageSize: number = 10;
  length: number = 0;
  private _tableBody: any[] = [];
  paginatedData: any[] = [];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);
  @Input() tableColumnsConfig: ITableColumnConfig[] = [];
  @Input() set tableBody(data: any[]) {
    this._tableBody = data || [];
    this.length = this._tableBody.length;
    this.displayedColumns = this.tableColumnsConfig.map((column) => column.key);
    this.updatePagination();
  }

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private datePipe: DatePipe,
    private truncatePipe: TruncatePipe
  ) {}
  get tableBody() {
    return this._tableBody;
  }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyPipe(value: any, pipe: ITablePipe) {
    switch (pipe.type) {
      case 'truncate':
        return this.truncatePipe.transform(
          value,
          (pipe.format as number) || 50
        );
      case 'date':
        return this.datePipe.transform(
          value,
          (pipe.format as string) || 'short'
        );
      default:
        return value;
    }
  }
  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.updatePagination();
  }

  updatePagination() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this._tableBody.slice(start, end);
    this.dataSource.data = this.paginatedData;
  }
}
