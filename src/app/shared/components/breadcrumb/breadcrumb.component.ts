import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb-service/breadcrumb.service';
import { IBreadcrumb } from '../../interfaces/breadcrumb/ibreadcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  breadcrumbs: Array<{ label: string; url: string }> = [];
  @ViewChild('ol', { static: true }) orderedList!: ElementRef<HTMLElement>
  @ViewChild('button', { static: true }) button!: ElementRef<HTMLButtonElement>
  @Input() breadCrumbs: IBreadcrumb[] = [];
  @Input() btnText: string = '';
  @Input() btnIcon: string = '';
  @Output() btnEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() btnVisibility: boolean = true;
  openAddDialog() {
    this.btnEvent.emit();
  }

}
