import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { ViewItemComponent } from './components/view-item/view-item.component';

@NgModule({
  declarations: [InstructorComponent, ViewItemComponent],
  imports: [CommonModule, InstructorRoutingModule, RouterModule, SharedModule],
})
export class InstructorModule {}
