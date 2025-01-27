import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';

const routes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'home', component: StudentComponent},
   { path: 'student-quizzes', loadChildren: () => import('./modules/student-quizzes/student-quizzes.module').then(m => m.StudentQuizzesModule) },
   { path: 'student-results', loadChildren: () => import('./modules/student-results/student-results.module').then(m => m.StudentResultsModule) },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
