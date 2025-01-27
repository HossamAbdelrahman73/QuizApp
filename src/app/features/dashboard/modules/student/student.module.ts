import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { SharedModule } from '../../../../shared/shared.module';
import { JoinQuizComponent } from './components/join-quiz/join-quiz.component';

@NgModule({
  declarations: [
    StudentComponent,
    JoinQuizComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule
  ]
})
export class StudentModule { }
