import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewQuizComponent } from './components/view-quiz/view-quiz.component';
import { QuizesComponent } from './quizes.component';

const routes: Routes = [
  { path: '', component: QuizesComponent },
  { path: 'view-quiz', component: ViewQuizComponent },
  { path: 'question-bank', loadChildren: () => import('./modules/question-bank/question-bank.module').then(m => m.QuestionBankModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizesRoutingModule { }
