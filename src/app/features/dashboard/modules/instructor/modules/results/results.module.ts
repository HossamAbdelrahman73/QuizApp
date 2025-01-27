import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { ResultsComponent } from './results.component';
import { ViewResultInstructorComponent } from './components/view-result-instructor/view-result-instructor.component';


@NgModule({
  declarations: [
    ResultsComponent,
    ViewResultInstructorComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule
  ]
})
export class ResultsModule { }
