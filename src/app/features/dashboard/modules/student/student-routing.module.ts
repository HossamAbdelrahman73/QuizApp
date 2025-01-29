import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { QuizComponent } from './components/quiz/quiz.component';

const routes: Routes = [{ path: '', redirectTo: 'quizzes', pathMatch: 'full' },
{ path: 'quizzes', component: StudentComponent, children: [
  {path: '', loadChildren: () => import('./modules/quizes/quizes.module').then(m => m.QuizesModule)},
  {path: 'quiz/:id', component: QuizComponent},
  { path: 'results', loadChildren: () => import('./modules/student-results/student-results.module').then(m => m.StudentResultsModule) },
] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
