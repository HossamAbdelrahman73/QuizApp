import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { SharedModule } from '../../../../shared/shared.module';
import { JoinQuizComponent } from './components/join-quiz/join-quiz.component';
import { StartQuizComponent } from './components/start-quiz/start-quiz.component';
import { QuizJoinedComponent } from './components/quiz-joined/quiz-joined.component';
import { QuizSubmittedComponent } from './components/quiz-submitted/quiz-submitted.component';

@NgModule({
  declarations: [
    StudentComponent,
    JoinQuizComponent,
    StartQuizComponent,
    QuizJoinedComponent,
    QuizSubmittedComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule
  ]
})
export class StudentModule { }
