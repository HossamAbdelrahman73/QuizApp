import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentQuizzesComponent } from './student-quizzes.component';

const routes: Routes = [{ path: '', component: StudentQuizzesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentQuizzesRoutingModule { }
