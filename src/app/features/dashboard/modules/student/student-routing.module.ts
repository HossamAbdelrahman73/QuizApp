import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'quizzes', pathMatch: 'full' },
  {
    path: 'quizzes',
    loadChildren: () =>
      import('./modules/quizes/quizes.module').then((m) => m.QuizesModule),
  },
  {
    path: 'results',
    loadChildren: () =>
      import('./modules/student-results/student-results.module').then(
        (m) => m.StudentResultsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
