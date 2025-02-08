import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizesComponent } from './quizes.component';
import { QuizComponent } from '../../components/quiz/quiz.component';

const routes: Routes = [
  { path: '', component: QuizesComponent },
  { path: 'quiz/:id', component: QuizComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizesRoutingModule { }
