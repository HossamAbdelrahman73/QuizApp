import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { JoinQuizComponent } from './components/join-quiz/join-quiz.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ViewResultDialogComponent } from './components/view-result/view-result-dialog.component';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    StudentComponent,
    JoinQuizComponent,
    QuizComponent,
    ViewResultDialogComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class StudentModule { }
