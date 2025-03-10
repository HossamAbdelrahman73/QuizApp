import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewQuizComponent } from './components/view-quiz/view-quiz.component';
import { QuizesComponent } from './quizes.component';
import { AllQuizesComponent } from './components/all-quizes/all-quizes.component';

const routes: Routes = [
  { path: '', component: QuizesComponent },
  { path: 'view-quiz/:id', component: ViewQuizComponent },
  {
    path: 'question-bank',
    loadChildren: () =>
      import('./modules/question-bank/question-bank.module').then(
        (m) => m.QuestionBankModule
      ),
      data: {breadcrumb: "Question bank"}
  },
  { path: 'view-all-quizes', component: AllQuizesComponent, data: {breadcrumb: "View quizzes"} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizesRoutingModule {}
