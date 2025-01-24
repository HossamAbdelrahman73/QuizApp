import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [InstructorComponent],
  imports: [CommonModule, InstructorRoutingModule, RouterModule, SharedModule],
})
export class InstructorModule {}
