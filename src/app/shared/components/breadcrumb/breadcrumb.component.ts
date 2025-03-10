import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb-service/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  styleUrls: ['./breadcrumb.component.scss'],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$ = this.breadcrumbService.getBreadcrumbs();

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {}
}
