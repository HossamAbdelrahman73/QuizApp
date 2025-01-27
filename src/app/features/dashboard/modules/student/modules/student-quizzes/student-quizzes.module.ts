import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentQuizzesRoutingModule } from './student-quizzes-routing.module';
import { StudentQuizzesComponent } from './student-quizzes.component';


@NgModule({
  declarations: [
    StudentQuizzesComponent
  ],
  imports: [
    CommonModule,
    StudentQuizzesRoutingModule
  ]
})
export class StudentQuizzesModule { }
