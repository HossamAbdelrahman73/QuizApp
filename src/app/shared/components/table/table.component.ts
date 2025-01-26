import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ITableColumnConfig, ITablePipe } from '../../interfaces/table/table-column-config.interface';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  page: number = 1;
  itemsPerPage: number = 5;
  pageNumbers: number[] = [];
  @Input() tableColumnsConfig: ITableColumnConfig[] = [];
  @Input() set tableBody(data: any) {
    this.displayedColumns = this.tableColumnsConfig.map((column) => column.key);
    this.dataSource.data = data;
    this.updatePagination();
  }
  paginatedData: any[] = [];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource(this.tableBody);

  constructor(private _liveAnnouncer: LiveAnnouncer, private datePipe: DatePipe, private truncatePipe: TruncatePipe) {
    for(let i = 1; i <= 10; i++) {
      this.pageNumbers.push(i);
    }
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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
        return this.truncatePipe.transform(value, pipe.format as number || 50);
      case 'date':
        return this.datePipe.transform(value, pipe.format as string || 'short');
      default:
        return value;
    }
  }
  onPageChange(page: number) {
    this.page = page;
    this.updatePagination();
  }
  updatePagination() {
    const start = (this.page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.dataSource.data.slice(start, end);
  }

}
