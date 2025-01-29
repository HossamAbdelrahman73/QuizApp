import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentResultsRoutingModule } from './student-results-routing.module';
import { StudentResultsComponent } from './student-results.component';
import { SharedModule } from '../../../../../../shared/shared.module';


@NgModule({
  declarations: [
    StudentResultsComponent
  ],
  imports: [
    CommonModule,
    StudentResultsRoutingModule,
    SharedModule
  ]
})
export class StudentResultsModule { }
