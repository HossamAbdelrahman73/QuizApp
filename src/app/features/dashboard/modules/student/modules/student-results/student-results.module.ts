import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentResultsRoutingModule } from './student-results-routing.module';
import { StudentResultsComponent } from './student-results.component';


@NgModule({
  declarations: [
    StudentResultsComponent
  ],
  imports: [
    CommonModule,
    StudentResultsRoutingModule
  ]
})
export class StudentResultsModule { }
