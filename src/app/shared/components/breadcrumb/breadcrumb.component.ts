import { Component } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb-service/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  breadcrumbs: Array<{ label: string; url: string }> = [];

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.getBreadcrumbs().subscribe((breadcrumbs) => {
      this.breadcrumbs = breadcrumbs;
    });
  }
}
