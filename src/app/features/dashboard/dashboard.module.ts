import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
  providers: [DatePipe],
})
export class DashboardModule {}
