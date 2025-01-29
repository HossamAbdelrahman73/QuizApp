import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizesComponent } from './quizes.component';
import { ViewQuizComponent } from './components/view-quiz/view-quiz.component';

const routes: Routes = [
  { path: '', component: QuizesComponent },
  { path: 'view-quiz', component: ViewQuizComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizesRoutingModule {}
