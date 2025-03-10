import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './instructor.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: InstructorComponent, data: { breadcrumb: 'Home' } },
  {
    path: 'students',
    loadChildren: () =>
      import('./modules/students/students.module').then(
        (m) => m.StudentsModule
      ),
    data: { breadcrumb: 'Students' }
  },
  {
    path: 'groups',
    loadChildren: () =>
      import('./modules/groups/groups.module').then((m) => m.GroupsModule),
    data: { breadcrumb: 'Groups' }
  },
  {
    path: 'quizzes',
    loadChildren: () =>
      import('./modules/quizes/quizes.module').then((m) => m.QuizesModule),
    data: { breadcrumb: 'Quizzes' }
  },
  {
    path: 'results', loadChildren: () => import('./modules/results/results.module').then(m => m.ResultsModule),
    data: { breadcrumb: 'Results' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorRoutingModule { }
