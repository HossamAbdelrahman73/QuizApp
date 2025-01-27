import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { ResultsComponent } from './results.component';
import { ViewResultInstructorComponent } from './components/view-result-instructor/view-result-instructor.component';
import { SharedModule } from "../../../../../../shared/shared.module";


@NgModule({
  declarations: [
    ResultsComponent,
    ViewResultInstructorComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    SharedModule
]
})
export class ResultsModule { }
